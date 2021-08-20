/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-20 09:26:00
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 09:29:07
 * @Description: 获取请求参数中间件，可以使用ctx.params获取get或post请求参数
 */

import { Context } from 'egg';

export default function params(): any {
    return async (ctx: Context, next: () => Promise<any>) => {
        ctx.params = {
            ...ctx.query,
            ...ctx.request.body
        }
        await next();
    };
}