/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-06 11:06:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-08 09:16:13
 * @Description: OperationLogController
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { LogParamsDto } from './dto/params-log.dto';
import { ResponseLogDto } from './dto/response-log.dto';
import { OperationLogService } from './operation-log.service';

@ApiTags('系统管理-操作日志')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/operation-log')
@UseGuards(AuthGuard('jwt'))
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) { }

  /**
   * @description: 查询操作日志列表
   */
  @Get()
  @ApiOkResponse({ type: ResponseLogDto })
  @ApiOperation({ summary: '获取操作日志列表' })
  findAll(@Query() params: LogParamsDto) {
    return this.operationLogService.findAll(params);
  }
}
