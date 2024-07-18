import { Module } from '@nestjs/common';

import { PrismaModule } from '@/modules/prisma/prisma.module';

import { UserManageController } from './user-manage.controller';
import { UserManageService } from './user-manage.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserManageController],
  providers: [UserManageService],
  exports: [UserManageService],
})
export class UserManageModule { }
