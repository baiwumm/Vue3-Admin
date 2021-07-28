/*
 * @Description: 用户管理API接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 15:00:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-28 17:27:01
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
            let { user_name, status, role_id, current, pageSize } = ctx.params;
            // 根据条件拼接筛选
            let conditions = 'where 1 = 1'
            if (user_name) conditions += ` and t.user_name like '%${user_name}%'`
            if (status) conditions += ` and t.status = '${status}'`
            if (role_id) conditions += ` and t.role_id like '%${role_id}%'`
            const result = await Raw.QueryPageData(`select t.*,a.org_name,b.post_name,group_concat(c.role_name) as role_name from xmw_user t 
            left join xmw_organization a on t.org_id = a.org_id
            left join xmw_post b on t.post_id = b.post_id
            left join xmw_role c on find_in_set(c.role_id,t.role_id) ${conditions} group by t.role_id`, current, pageSize);
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
        } catch (error) {
            ctx.logger.info('getUserList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 新增和更新用户
     * @param {*} params:表单数据
     * @return {*}
     */
    async userSave() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { user_id, ...params } = ctx.params
            // 判断用户名称是否已存在
            let conditions = `where user_name = '${params.user_name}'`
            if (user_id) conditions += ` and user_id != '${user_id}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_user ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '用户名称已存在!', response: {} }
            }
            // 参数user_id判断是新增还是编辑
            if (!user_id) {
                params.user_id = ctx.helper.snowflakeId()
                params.create_time = new Date()
                await Raw.Insert('xmw_user', params);
            } else { // 编辑字典
                params.update_last_time = new Date()
                const options = {
                    wherestr: `where user_id = ${user_id}`
                };
                await Raw.Update('xmw_user', params, options);
            }
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('userSave方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 删除用户
     * @param {*} ids:id集合,用,分隔
     * @return {*}
     */
    async userDel() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { ids } = ctx.params
            await Raw.Delete("xmw_user", {
                wherestr: `where user_id in (${ids})`
            });
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('userDel方法报错：' + error)
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
