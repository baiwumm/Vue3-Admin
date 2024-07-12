import { Module } from '@nestjs/common';

import { OrganazationModule } from '@/modules/administrative/organazation/organazation.module'; // 智能行政-组织管理
import { AuthModule } from '@/modules/auth/auth.module'; // 登录授权

@Module({
  imports: [OrganazationModule, AuthModule],
})
export class AppModule { }
