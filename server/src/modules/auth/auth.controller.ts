/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 10:01:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-11 10:10:14
 * @Description: AuthController
 */
import { Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  /**
   * @description: 用户登录
   */
  @Post('/login')
  login() {
    return this.authService.login();
  }

  /**
   * @description: 获取用户信息
   */
  @Get('/getUserInfo')
  getUserInfo() {
    return this.authService.getUserInfo();
  }
}
