import { Module } from '@nestjs/common';

import { OrganazationModule } from '@/modules/administrative/organazation/organazation.module'; // 智能行政-组织管理
import { PostManageModule } from '@/modules/administrative/post-manage/post-manage.module'; // 智能行政-岗位管理
import { AuthModule } from '@/modules/auth/auth.module'; // 登录授权

@Module({
  imports: [OrganazationModule, PostManageModule, AuthModule],
})
export class AppModule { }
