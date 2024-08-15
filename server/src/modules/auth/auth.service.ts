/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 09:59:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-15 16:01:24
 * @Description: AuthService
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { convertFlatDataToTree, convertToLocalization, omit, responseMessage } from '@/utils';

import { LoginParamsDto } from './dto/params-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }
  /**
   * @description: 用户登录
   */
  async login(params: LoginParamsDto, session: Api.Common.SessionInfo, ip: string) {
    // 获取验证码
    const { captchaCode } = params;
    // 判断验证码
    if (captchaCode.toUpperCase() !== session.captchaCode.toUpperCase()) {
      return responseMessage(null, '验证码错误', -1);
    }
    // 登录参数校验结果
    const user = await this.validateUser(params);

    if (!user) {
      return responseMessage(null, '用户名或密码错误', -1);
    }

    // 生成 token
    const tokens = await this.generateTokens(user);

    // 登录成功，更新用户信息
    const userInfo = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        loginCount: { increment: 1 }, // 登录次数 + 1
        lastLoginAt: new Date(),
        lastIp: ip,
        token: tokens.token,
      },
    });

    // 存储用户信息到 session
    session.userInfo = userInfo;

    // 验证成功，返回 token
    return responseMessage(tokens);
  }

  /**
   * @description: 获取用户信息
   */
  getUserInfo(session: Api.Common.SessionInfo) {
    return responseMessage(omit(session.userInfo, ['password', 'token']));
  }

  /**
   * @description: 验证用户登录
   */
  async validateUser(params: LoginParamsDto): Promise<Api.SystemManage.User | null> {
    // 解构参数
    const { userName, password } = params;

    // 查询数据库中对应的用户
    const userInfo = await this.prisma.user.findUnique({
      where: { userName },
    });
    if (userInfo && (await this.comparePassword(password, userInfo.password))) {
      // 如果用户名密码正确，则返回用户对象
      return userInfo;
    }
    return null;
  }

  /**
   * @description: 生成 token
   */
  async generateTokens(userInfo: Api.SystemManage.User) {
    const payload: Api.Common.TokenPayload = { userName: userInfo.userName, sub: userInfo.id };

    const token = this.jwtService.sign(payload, {
      expiresIn: '3d', // 设置访问 token 的过期时间为 3 天
    });

    return { token };
  }

  /**
   * @description: 用户注销登录
   */
  async logout(session) {
    const { userInfo } = session;
    const { id } = userInfo;
    // 清空数据库中 token
    await this.prisma.user.update({
      where: { id },
      data: { token: null },
    });
    // 清除 session
    session.destroy();
    // 保存操作日志
    return responseMessage({}, '注销成功');
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

  /**
   * @description: 获取国际化数据
   */
  async getLocales() {
    // 查询全部数据
    const sqlData = await this.prisma.internalization.findMany({
      orderBy: [{ createdAt: 'desc' }],
    });
    // 将数据转成树形结构
    const localesTree = convertFlatDataToTree(sqlData);
    // 转成层级对象
    const result = convertToLocalization(localesTree);
    return responseMessage(result);
  }
}
