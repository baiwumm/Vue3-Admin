/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 09:59:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-11 10:33:35
 * @Description: AuthService
 */
import { Injectable } from '@nestjs/common';

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
      buttons: ['B_CODE1', 'B_CODE2', 'B_CODE3']
    });
  }
}
