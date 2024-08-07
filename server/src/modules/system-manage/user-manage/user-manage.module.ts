/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 14:26:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-07 09:59:24
 * @Description: UserManageModule
 */
import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { OperationLogModule } from '@/modules/system-manage/operation-log/operation-log.module';

import { UserManageController } from './user-manage.controller';
import { UserManageService } from './user-manage.service';

@Module({
  imports: [PrismaModule, AuthModule, OperationLogModule],
  controllers: [UserManageController],
  providers: [UserManageService],
  exports: [UserManageService],
})
export class UserManageModule { }
