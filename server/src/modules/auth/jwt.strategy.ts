/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-01 16:32:15
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-02 09:53:55
 * @Description: JWT 鉴权模块
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { LoginParamsDto } from './dto/params-auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 提供从请求中提取 JWT 的方法。我们将使用在 API 请求的授权头中提供token的标准方法
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: (req) => {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          return authHeader.replace('Bearer ', '');
        }
        console.log(1111);
        throw new UnauthorizedException('未登录');
      },
      // 为了明确起见，我们选择默认的 false 设置，
      // 它将确保 JWT 没有过期的责任委托给 Passport 模块。
      // 这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 未经授权的响应。Passport 会自动为我们办理
      ignoreExpiration: false,
      // 使用权宜的选项来提供对称的秘密来签署令牌
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(payload: LoginParamsDto) {
    return payload;
  }
}
