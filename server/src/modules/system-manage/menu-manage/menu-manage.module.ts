/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-19 17:01:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-19 17:02:13
 * @Description: MenuManageModule
 */
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';
import { OperationLogModule } from '@/modules/system-manage/operation-log/operation-log.module';

import { MenuManageController } from './menu-manage.controller';
import { MenuManageService } from './menu-manage.service';

@Module({
  imports: [PrismaModule, OperationLogModule],
  controllers: [MenuManageController],
  providers: [MenuManageService],
  exports: [MenuManageService],
})
export class MenuManageModule { }
