import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';

import { UserManageController } from './user-manage.controller';
import { UserManageService } from './user-manage.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserManageController],
  providers: [UserManageService],
  exports: [UserManageService],
})
export class UserManageModule { }
