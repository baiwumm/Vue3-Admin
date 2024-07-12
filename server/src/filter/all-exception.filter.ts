/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 14:17:49
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-12 14:37:05
 * @Description: 全局异常过滤器
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { responseMessage } from '@/utils';
import { RESPONSE_MSG } from '@/enums'

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取响应体
    const response = ctx.getResponse<Response>();
    // 获取状态码，判断是HTTP异常还是服务器异常
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 自定义异常返回体
    response
      .status(statusCode)
      .json(responseMessage(null, RESPONSE_MSG.ERROR, statusCode));
  }
}
