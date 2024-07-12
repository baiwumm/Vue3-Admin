/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-12 14:34:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-12 15:24:11
 * @Description: OrganazationModule
 */
import { Module } from '@nestjs/common';

import { OrganazationController } from './organazation.controller';
import { OrganazationService } from './organazation.service';

@Module({
  controllers: [OrganazationController],
  providers: [OrganazationService],
  exports: [OrganazationService],
})
export class OrganazationModule { }
