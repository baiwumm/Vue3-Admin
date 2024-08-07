/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-06 11:06:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-07 10:09:35
 * @Description: OperationLogService - 操作日志
 */
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import UAParser from 'ua-parser-js';

import { PrismaService } from '@/modules/prisma/prisma.service';

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
    const { userInfo } = this.request.session;
    if (userInfo) {
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
}
