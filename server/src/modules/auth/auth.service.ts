/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 09:59:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-09 17:23:59
 * @Description: AuthService
 */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type Menu, MenuType, Status, type User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { lastValueFrom, map } from 'rxjs';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { convertFlatDataToTree, convertToLocalization, omit, responseMessage } from '@/utils';

import { juejinParamsDto, LoginParamsDto } from './dto/params-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) { }
  /**
   * @description: 用户登录
   */
  async login(params: LoginParamsDto, session: CommonType.SessionInfo, ip: string) {
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

    // 判断用户是否禁用
    if (user.status === Status.INACTIVE) {
      return responseMessage(null, '该用户已被禁用', -1);
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
      include: {
        role: true,
        organization: true,
        post: true,
      },
    });

    // 存储用户信息到 session
    session.userInfo = userInfo;

    // 验证成功，返回 token
    return responseMessage<Pick<User, 'token'>>(tokens);
  }

  /**
   * @description: 获取用户信息
   */
  async getUserInfo(session: CommonType.SessionInfo) {
    // 获取 session 用户信息
    const userInfo = omit(session.userInfo, ['password', 'token']);
    // 获取所有与 roleId 相关的 menuId
    const menuIds = await this.prisma.permission
      .findMany({
        where: {
          roleId: userInfo.roleId,
        },
        select: {
          menuId: true,
        },
      })
      .then((results) => results.map((result) => result.menuId));
    // 使用这些 menuId 查询 Menu 模型
    const permissions = await this.prisma.menu
      .findMany({
        where: {
          type: {
            equals: MenuType.BUTTON,
          },
          id: {
            in: menuIds,
          },
        },
      })
      .then((results) => results.map((result) => result.permission));
    return responseMessage<User>({
      ...userInfo,
      buttons: permissions,
      roles: [userInfo.role.code],
    });
  }

  /**
   * @description: 验证用户登录
   */
  async validateUser(params: LoginParamsDto): Promise<User | null> {
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
  async generateTokens(userInfo: User): Promise<Pick<User, 'token'>> {
    const payload: CommonType.TokenPayload = { userName: userInfo.userName, sub: userInfo.id };

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
    return responseMessage<CommonType.LanguageResult>(result);
  }

  /**
   * @description: 掘金文章列表
   */
  async juejin(params: juejinParamsDto) {
    const url = 'https://api.juejin.cn/content_api/v1/article/query_list';
    const responseData: any = await lastValueFrom(this.httpService.post(url, params).pipe(map((res) => res.data)));
    return responseMessage({
      list: responseData.data,
      total: responseData.count,
    });
  }

  /**
   * @description: 获取动态路由表
   */
  async getConstantRoutes() {
    // 获取菜单列表
    const result = await this.prisma.menu.findMany({
      where: {
        // 过滤出 json 对象只有常量的菜单
        meta: {
          path: ['constant'],
          equals: true,
        },
      },
      select: {
        name: true,
        path: true,
        component: true,
        meta: true,
      },
      orderBy: [
        { sort: 'asc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    return responseMessage<Menu[]>(result);
  }

  /**
   * @description: 获取用户路由
   */
  async getUserRoutes(session: CommonType.SessionInfo) {
    // 获取所有与 roleId 相关的 menuId
    const menuIds = await this.prisma.permission
      .findMany({
        where: {
          roleId: session.userInfo.roleId,
        },
        select: {
          menuId: true,
        },
      })
      .then((results) => results.map((result) => result.menuId));
    // 获取菜单列表
    const result = await this.prisma.menu.findMany({
      where: {
        type: {
          not: MenuType.BUTTON,
        },
        id: {
          in: menuIds,
        },
        // 过滤出 json 对象不是常量的菜单
        meta: {
          path: ['constant'],
          not: true,
        },
      },
      select: {
        id: true,
        parentId: true,
        name: true,
        path: true,
        component: true,
        meta: true,
        props: true,
      },
      orderBy: [
        { sort: 'asc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    // 转成树形结构
    const routes = convertFlatDataToTree(result);
    return responseMessage({
      home: routes?.[0]?.name || 'home',
      routes,
    });
  }

  /**
   * @description: 判断路由名称是否存在
   */
  async isRouteExist(name: string) {
    const result = await this.prisma.menu.findUnique({
      where: {
        name,
      },
    });
    return responseMessage<boolean>(result ? true : false);
  }

  /**
   * @description: 获取角色权限路由
   */
  async getRoleRoutes() {
    // 获取菜单列表
    const result = await this.prisma.menu.findMany({
      where: {
        OR: [
          {
            type: {
              equals: MenuType.BUTTON,
            },
          },
          {
            AND: [
              {
                // 过滤出 json 对象不是常量的菜单
                meta: {
                  path: ['constant'],
                  not: true,
                },
              },
            ],
          },
        ],
      },
      orderBy: [
        { sort: 'asc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    // 转成树形结构
    const routes = convertFlatDataToTree(result);
    return responseMessage(routes);
  }
}
