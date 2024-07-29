/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 09:59:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-29 11:20:32
 * @Description: AuthService
 */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { responseMessage } from '@/utils';

@Injectable()
export class AuthService {
  /**
   * @description: 用户登录
   */
  login() {
    return responseMessage({
      token: '111',
      refreshToken: '222',
    });
  }

  /**
   * @description: 获取用户信息
   */
  getUserInfo() {
    return responseMessage({
      userId: '0',
      userName: 'Admin',
      roles: ['R_SUPER'],
      buttons: ['B_CODE1', 'B_CODE2', 'B_CODE3'],
    });
  }

  /**
   * @description: 用于生成密码的哈希值
   */
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10; // 盐轮数
    return bcrypt.hash(password, saltOrRounds);
  }

  /**
   * @description: 用于验证用户提供的密码是否与数据库中存储的哈希密码匹配
   */
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
