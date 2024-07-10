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
