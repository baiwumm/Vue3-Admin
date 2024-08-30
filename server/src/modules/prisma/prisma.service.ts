/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:46:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-30 09:23:26
 * @Description: PrismaService
 */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // 这里设置日志级别
    });
  }
  async onModuleInit() {
    await this.$connect(); // 在模块初始化时连接到数据库
  }

  async onModuleDestroy() {
    await this.$disconnect(); // 在应用程序关闭时断开与数据库的连
  }
}
