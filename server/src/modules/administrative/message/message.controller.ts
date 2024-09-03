/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-02 14:24:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-03 16:12:29
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { LoggerInterceptor } from '@/interceptor/logger.interceptor';

import { MessageParamsDto } from './dto/params-message.dto';
import { ResponseMessageDto } from './dto/response-message.dto';
import { SaveMessageDto } from './dto/save-message.dto';
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
  constructor(private readonly messageService: MessageService) { }

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
  create(@Body() body: SaveMessageDto, @Session() session: CommonType.SessionInfo) {
    return this.messageService.create(body, session);
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
}
