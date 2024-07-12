/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-12 14:34:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-12 16:09:58
 * @Description: OrganazationModule
 */
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';

import { OrganazationController } from './organazation.controller';
import { OrganazationService } from './organazation.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrganazationController],
  providers: [OrganazationService],
  exports: [OrganazationService],
})
export class OrganazationModule { }
