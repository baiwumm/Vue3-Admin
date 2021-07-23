/*
 * @Description: 用户管理API接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 15:00:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-23 16:50:53
 */
'use strict';

const Controller = require('egg').Controller;
class UserManagementController extends Controller {
    // 获取用户列表
    async login() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            const result = {
                userId: '1',
                username: 'vben',
                realName: 'Vben Admin',
                avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
                desc: 'manager',
                password: '123456',
                token: 'fakeToken1',
                homePath: '/workbench',
                roles: [
                    {
                        roleName: 'Super Admin',
                        value: 'super',
                    },
                ],
            }
            ctx.body = { resCode: 200, resMsg: '请求成功!', response: result }
        } catch (error) {
            ctx.logger.info('login方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    // 获取用户列表
    async logout() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            ctx.body = { resCode: 200, resMsg: '请求成功!', response: 'ok' }
        } catch (error) {
            ctx.logger.info('login方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    // 获取用户列表
    async getPermCode() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            ctx.body = { resCode: 200, resMsg: '请求成功!', response: ['1000', '3000', '5000'] }
        } catch (error) {
            ctx.logger.info('login方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    async getUserInfo() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            const result = {
                userId: '1',
                username: 'vben',
                realName: 'Vben Admin',
                avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
                desc: 'manager',
                password: '123456',
                token: 'fakeToken1',
                homePath: '/workbench',
                roles: [
                    {
                        roleName: 'Super Admin',
                        value: 'super',
                    },
                ],
            }
            ctx.body = { resCode: 200, resMsg: '请求成功!', response: result }
        } catch (error) {
            ctx.logger.info('getUserInfo方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }
}
module.exports = UserManagementController;
