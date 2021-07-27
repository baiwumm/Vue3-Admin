/*
 * @Description: 用户管理API接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 15:00:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-27 17:21:22
 */
'use strict';

const Controller = require('egg').Controller;
class UserManagementController extends Controller {

    /**
     * @description: 获取用户列表
     * @param {*} user_name:用户名称,cn_name:中文名,current:页码,pageSize:条数
     * @return {*}
     */
    async getUserList() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { user_name, cn_name, current, pageSize } = ctx.params;
            // 根据条件拼接筛选
            let conditions = 'where 1 = 1'
            if (user_name) where += ` and user_name like '%${user_name}%'`
            if (cn_name) where += ` and cn_name like '%${cn_name}%'`
            const result = await Raw.QueryPageData(`select * from xmw_user ${conditions}`, current, pageSize);
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
        } catch (error) {
            ctx.logger.info('getUserList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

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
