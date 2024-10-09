/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-29 17:55:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-09 10:19:48
 * @Description: 全局请求拦截中间件
 */
import { NextFunction, Request, Response } from 'express';

import { responseMessage } from '@/utils';
export function requestMiddleware(req: Request, res: Response, next: NextFunction) {
  if (
    req.method === 'GET' ||
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/logout') ||
    req.url.includes('/auth/juejin') ||
    req.url.includes('/common/')
  ) {
    next();
  } else {
    res.send(responseMessage(null, '演示系统,禁止操作!', -1));
  }
}
