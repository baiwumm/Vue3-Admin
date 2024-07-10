import { Module } from '@nestjs/common';

import { OrganazationModule } from '@/modules/administrative/organazation/organazation.module';

@Module({
  imports: [OrganazationModule],
})
export class AppModule { }
