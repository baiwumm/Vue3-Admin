/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-06 11:06:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-06 17:47:07
 * @Description: OperationLogController
 */
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

@ApiTags('系统管理-操作日志')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/operation-log')
export class OperationLogController { }
