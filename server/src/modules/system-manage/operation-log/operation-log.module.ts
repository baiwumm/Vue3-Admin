/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-06 11:06:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-06 11:10:15
 * @Description: OperationLogModule
 */
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';

import { OperationLogController } from './operation-log.controller';
import { OperationLogService } from './operation-log.service';

@Module({
  imports: [PrismaModule],
  controllers: [OperationLogController],
  providers: [OperationLogService],
  exports: [OperationLogService],
})
export class OperationLogModule { }
