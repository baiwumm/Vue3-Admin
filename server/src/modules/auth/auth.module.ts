/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 10:04:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-11 10:05:40
 * @Description: AuthModule
 */
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
