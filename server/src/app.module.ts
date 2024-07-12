import { Module } from '@nestjs/common';

import { OrganazationModule } from '@/modules/administrative/organazation/organazation.module'; // 智能行政-组织管理
import { AuthModule } from '@/modules/auth/auth.module'; // 登录授权
import { PrismaModule } from '@/modules/prisma/prisma.module';

@Module({
  imports: [OrganazationModule, AuthModule, PrismaModule],
})
export class AppModule { }
