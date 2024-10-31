/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-06 11:06:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-31 09:29:43
 * @Description: OperationLogModule
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';

import { OperationLogController } from './operation-log.controller';
import { OperationLogService } from './operation-log.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    PrismaModule,
  ],
  controllers: [OperationLogController],
  providers: [OperationLogService],
  exports: [OperationLogService],
})
export class OperationLogModule { }
