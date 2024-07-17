/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-12 14:34:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-16 16:20:21
 * @Description: PostManageModule
 */
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';

import { PostManageController } from './post-manage.controller';
import { PostManageService } from './post-manage.service';

@Module({
  imports: [PrismaModule],
  controllers: [PostManageController],
  providers: [PostManageService],
  exports: [PostManageService],
})
export class PostManageModule { }
