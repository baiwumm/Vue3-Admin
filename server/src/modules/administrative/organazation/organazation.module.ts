/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-12 14:34:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-07 10:01:22
 * @Description: OrganazationModule
 */
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';
import { OperationLogModule } from '@/modules/system-manage/operation-log/operation-log.module';

import { OrganazationController } from './organazation.controller';
import { OrganazationService } from './organazation.service';

@Module({
  imports: [PrismaModule, OperationLogModule],
  controllers: [OrganazationController],
  providers: [OrganazationService],
  exports: [OrganazationService],
})
export class OrganazationModule { }
