/*
 * @Description: 此中间件是为了给API请求加上token权限认证
 * @Version: 2.0
 * @Autor: Xie Mingwei
 * @Date: 2020-10-28 09:42:50
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-26 14:20:55
 */
'use strict';
import { Context } from 'egg';
const jwt = require('jsonwebtoken');

export default function tokenAuthentication(): any {
    return async (ctx: Context, next: () => Promise<any>) => {
        try {
            const config = ctx.app.config;
            const requestUrl = ctx.request.url;
            // 白名单:登录、国际化语言接口不用携带token
            const whiteUrl = ['/login', '/generateVerifCode', '/system/getInternationalLang']
            // 判断请求url是否在白名单,会有t参数,确保数据不会被浏览器长时间缓存
            for (let i = 0; i < whiteUrl.length; i++) {
                if (requestUrl.includes(whiteUrl[i])) {
                    await next();
                    return;
                }
            }

            // if (ctx.request.method == 'POST') {
            //     return ctx.body = { resCode: -1, resMsg: '演示系统,禁止操作!', response: {} }
            // }
            const token = ctx.request.header['authorization']; //获取头部token信息
            if (token) {
                let overdue = true;
                // 解析token生成用户信息
                jwt.verify(token, config.privateKey, (err) => {
                    if (err) {   //如果token过期或解析错误则会执行err的代码块
                        ctx.logger.error(err);
                        overdue = false;
                        return ctx.body = { resCode: 401, resMsg: 'token令牌非法!', response: {} }
                    }
                })
                if (overdue) await next()
            } else {
                return ctx.body = { resCode: -1, resMsg: '缺少token令牌!', response: {} }
            }
        } catch (error) {
            ctx.logger.info(error)
            return ctx.body = { resCode: 400, resMsg: 'token令牌认证失败!', response: error }
        }
    };
}
