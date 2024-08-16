/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 10:04:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-16 17:01:44
 * @Description: AuthModule
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from '@/modules/prisma/prisma.module';
import { OperationLogModule } from '@/modules/system-manage/operation-log/operation-log.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' }, // 这里设置访问 token 的过期时间
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    OperationLogModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
