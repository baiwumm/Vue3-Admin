/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-02 14:24:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-09 10:08:37
 * @Description: MessageController
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Session,
  Sse,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档
import type { Message } from '@prisma/client';
import { Observable } from 'rxjs';

import { PaginatingDTO } from '@/dto/params.dto';
import { EVENTBUS_TYPE } from '@/enums';
import { LoggerInterceptor } from '@/interceptor/logger.interceptor';

import { MessageParamsDto } from './dto/params-message.dto';
import {
  ResponseMessageDto,
  ResponseSaveMessageReadDto,
  UnReadMessageCountDto,
  UnReadMessageDto,
} from './dto/response-message.dto';
import { SaveMessageDto, SaveMessageReadDto } from './dto/save-message.dto';
import { MessageService } from './message.service';

@ApiTags('智能行政-消息公告')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('administrative/message')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private eventEmitter: EventEmitter2,
  ) { }

  /**
   * @description: 查询消息公告列表
   */
  @Get()
  @ApiOkResponse({ type: ResponseMessageDto })
  @ApiOperation({ summary: '获取消息公告列表' })
  findAll(@Query() params: MessageParamsDto) {
    return this.messageService.findAll(params);
  }

  /**
   * @description: 查询消息公告详情
   */
  @Get(':id')
  @ApiOkResponse({ type: ResponseMessageDto })
  @ApiOperation({ summary: '查询消息公告详情' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.messageService.findOne(id);
  }

  /**
   * @description: 创建消息公告
   */
  @Post()
  @ApiOkResponse({ type: ResponseMessageDto })
  @ApiOperation({ summary: '创建消息公告' })
  async create(@Body() body: SaveMessageDto, @Session() session: CommonType.SessionInfo) {
    const result = await this.messageService.create(body, session);
    // 消息创建成功后，发送一个消息
    this.eventEmitter.emit(EVENTBUS_TYPE.MESSAGE_CREATE, result.data);
    return result;
  }

  /**
   * @description: 服务端推送事件
   */
  @Sse('sse/event')
  sse(): Observable<MessageEvent> {
    return new Observable<any>((observer) => {
      // 监听事件
      this.eventEmitter.on(EVENTBUS_TYPE.MESSAGE_CREATE, (data: Message) => {
        observer.next({ data });
      });
    });
  }

  /**
   * @description: 更新消息公告
   */
  @Put(':id')
  @ApiOkResponse({ type: ResponseMessageDto })
  @ApiOperation({ summary: '更新消息公告' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: SaveMessageDto) {
    return this.messageService.update(id, body);
  }

  /**
   * @description: 删除消息公告
   */
  @Delete(':id')
  @ApiOkResponse({ type: ResponseMessageDto })
  @ApiOperation({ summary: '删除消息公告' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.messageService.remove(id);
  }

  /**
   * @description: 修改置顶状态
   */
  @Patch(':id')
  @ApiOkResponse({ type: ResponseMessageDto })
  @ApiOperation({ summary: '修改置顶状态' })
  changePinned(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.messageService.changePinned(id);
  }

  /**
   * @description: 创建已读信息
   */
  @Post('/createMessageRead')
  @ApiOkResponse({ type: ResponseSaveMessageReadDto })
  @ApiOperation({ summary: '创建已读信息' })
  createMessageRead(@Body() body: SaveMessageReadDto, @Session() session: CommonType.SessionInfo) {
    return this.messageService.createMessageRead(body.id, session);
  }

  /**
   * @description: 查询未读消息条数
   */
  @Get('/unread/count')
  @ApiOkResponse({ type: UnReadMessageCountDto })
  @ApiOperation({ summary: '查询未读消息条数' })
  unreadMessageCount(@Session() session: CommonType.SessionInfo) {
    return this.messageService.unreadMessageCount(session);
  }

  /**
   * @description: 查询未读消息列表
   */
  @Get('/unread/list')
  @ApiOkResponse({ type: UnReadMessageDto })
  @ApiOperation({ summary: '查询未读消息列表' })
  getUnreadMessageList(@Query() params: PaginatingDTO, @Session() session: CommonType.SessionInfo) {
    return this.messageService.getUnreadMessageList(params, session);
  }
}
