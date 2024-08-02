/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 10:04:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-01 18:02:30
 * @Description: AuthModule
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from '@/modules/prisma/prisma.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // 这里不设置 token 过期时间，过期时间在 redis 里面设置
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' }, // 这里设置访问 token 的过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
