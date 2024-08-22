/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-06 11:06:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:28:00
 * @Description: OperationLogService - 操作日志
 */
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Log } from '@prisma/client';
import { Request } from 'express';
import UAParser from 'ua-parser-js';

import { RESPONSE_MSG } from '@/enums';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { responseMessage } from '@/utils';

import { LogParamsDto } from './dto/params-log.dto';

@Injectable({ scope: Scope.REQUEST })
export class OperationLogService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { session: Api.Common.SessionInfo },
    private prisma: PrismaService,
  ) { }

  /**
   * @description: 录入日志
   */
  async logAction() {
    const { originalUrl, method, headers, ip, body, query } = this.request;
    const userAgent = headers['user-agent'];
    const parser = new UAParser(userAgent);
    let { userInfo } = this.request.session;
    // 登录接口需要单独处理
    const isLogin = originalUrl === '/auth/login';
    if ((userInfo && method.toUpperCase() !== 'GET') || isLogin) {
      if (isLogin) {
        // 查询数据库中对应的用户
        userInfo = await this.prisma.user.findUnique({
          where: { userName: body.userName },
        });
      }
      const data: any = {
        userId: userInfo.id,
        action: originalUrl,
        method: method.toUpperCase(),
        ip,
        params: { ...body, ...query },
        os: Object.values(parser.getOS()).join(' '),
        browser: parser.getBrowser().name,
      };
      // 插入数据到表
      await this.prisma.log.create({
        data,
      });
    }
  }

  /**
   * @description: 查询日志列表
   */
  async findAll({ userId, method, startTime, endTime, current, size }: LogParamsDto) {
    // 分页处理，这里获取到的分页是字符串，需要转换成整数
    const take = Number(size);
    const skip = (Number(current) - 1) * take;
    // 条件判断
    const where = {}; // 查询参数
    // 模糊查询
    if (userId) {
      where['userId'] = { equals: userId };
    }

    if (method) {
      where['method'] = { equals: method };
    }

    if (startTime && endTime) {
      where['createdAt'] = {
        gte: new Date(Number(startTime)),
        lte: new Date(Number(endTime)),
      };
    }
    const records = await this.prisma.log.findMany({
      skip,
      take,
      where,
      include: {
        user: true,
      },
      orderBy: [
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    // 总条数
    const total = await this.prisma.log.count({ where });
    return responseMessage({
      records,
      total,
      current: Number(current),
      size: take,
    });
  }

  /**
   * @description: 删除日志
   */
  async remove(ids: string[]) {
    try {
      const result = await this.prisma.log.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return responseMessage<Log>(result);
    } catch (error) {
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }
}
