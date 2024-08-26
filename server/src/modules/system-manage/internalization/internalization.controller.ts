/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-15 09:54:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 09:01:57
 * @Description: InternalizationController
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { LoggerInterceptor } from '@/interceptor/logger.interceptor';

import { InternalizationParamsDto } from './dto/params-internalization.dto';
import { ResponseInternalizationDto, ResponseSaveInternalizationDto } from './dto/response-internalization.dto';
import { SaveInternalizationDto } from './dto/save-internalization.dto';
import { InternalizationService } from './internalization.service';

@ApiTags('系统管理-国际化')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/internalization')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class InternalizationController {
  constructor(private readonly internalizationService: InternalizationService) { }

  /**
   * @description: 查询国际化列表
   */
  @Get()
  @ApiOkResponse({ type: ResponseInternalizationDto })
  @ApiOperation({ summary: '获取国际化列表' })
  findAll(@Query() params: InternalizationParamsDto) {
    return this.internalizationService.findAll(params);
  }

  /**
   * @description: 创建国际化
   */
  @Post()
  @ApiOkResponse({ type: ResponseSaveInternalizationDto })
  @ApiOperation({ summary: '创建国际化' })
  create(@Body() body: SaveInternalizationDto) {
    return this.internalizationService.create(body);
  }

  /**
   * @description: 更新国际化
   */
  @Put(':id')
  @ApiOkResponse({ type: ResponseSaveInternalizationDto })
  @ApiOperation({ summary: '更新国际化' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: SaveInternalizationDto) {
    return this.internalizationService.update(id, body);
  }

  /**
   * @description: 删除国际化
   */
  @Delete(':id')
  @ApiOkResponse({ type: ResponseSaveInternalizationDto })
  @ApiOperation({ summary: '删除国际化' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.internalizationService.remove(id);
  }
}
