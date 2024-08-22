/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-22 11:01:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 11:02:09
 * @Description: RoleManageModule
 */
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';
import { OperationLogModule } from '@/modules/system-manage/operation-log/operation-log.module';

import { RoleManageService } from './role.manage.service';
import { RoleManageController } from './role-manage.controller';

@Module({
  imports: [PrismaModule, OperationLogModule],
  controllers: [RoleManageController],
  providers: [RoleManageService],
  exports: [RoleManageService],
})
export class RoleManageModule { }
