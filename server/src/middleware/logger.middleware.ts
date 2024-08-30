/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-29 17:45:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-30 13:45:56
 * @Description: 全局日志中间件
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    // 记录开始时间
    const start = Date.now();
    // 获取请求信息
    const { method, originalUrl, ip, httpVersion, headers } = req;

    // 获取响应信息
    const { statusCode } = res;

    res.on('finish', () => {
      // 记录结束时间
      const end = Date.now();
      // 计算时间差
      const duration = end - start;

      // 组装日志信息：[timestamp] [method] [url] HTTP/[httpVersion] [client IP] [status code] [response time]ms [user-agent]
      const logFormat = `${dayjs().valueOf()} ${method} ${originalUrl} HTTP/${httpVersion} ${ip} ${statusCode} ${duration}ms ${headers['user-agent']}`;

      // 根据状态码，进行日志类型区分
      if (statusCode >= 500) {
        this.logger.error(logFormat, originalUrl);
      } else if (statusCode >= 400) {
        this.logger.warn(logFormat, originalUrl);
      } else {
        this.logger.log(logFormat, originalUrl);
      }
    });

    next();
  }
}
