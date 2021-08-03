/*
 * @Description: 用户管理API接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 15:00:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-03 18:15:46
 */
'use strict';

const jwt = require('jsonwebtoken');

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
                params.founder = ctx.session.userInfo.user_id
                await Raw.Insert('xmw_user', params);
            } else { // 编辑用户
                params.update_last_time = new Date()
                const options = {
                    wherestr: `where user_id = ${user_id}`
                };
                await Raw.Update('xmw_user', params, options);
            }
            await ctx.service.logs.saveLogs(`${user_id ? '编辑' : '新增'}用户:${params.cn_name}`)
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
            let { ids, cn_name } = ctx.params
            await Raw.Delete("xmw_user", {
                wherestr: `where user_id in (${ids})`
            });
            await ctx.service.logs.saveLogs(`删除用户:${cn_name}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('userDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
    * @description: 用户登录
    * @param {*} params:表单数据
    * @return {*}
    */
    async login() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { user_name, password } = ctx.params
            let payload = ctx.params
            let token = jwt.sign(payload, this.config.privateKey, { expiresIn: this.config.expiresIn });  //生成token
            // 判断用户名密码是否正确
            const userInfo = await Raw.Query(`select t.*,a.org_name,b.post_name from xmw_user t 
            left join xmw_organization a on t.org_id = a.org_id
            left join xmw_post b on t.post_id = b.post_id
            where user_name = '${user_name}' and password = '${password}' group by t.role_id`);
            if (userInfo) { // 用户名密码正确
                // 判断用户是否被禁用
                if (userInfo.status == 1) {
                    // 更新token和IP、登录时间、登录次数
                    const updateParams = {
                        token: token,
                        login_last_ip: ctx.request.ip,
                        login_last_time: new Date(),
                        login_num: (userInfo.login_num || 0) + 1
                    };
                    Object.assign(userInfo, updateParams)
                    const options = {
                        wherestr: `where user_id=${userInfo.user_id}`
                    };
                    // 将当前用户保存到session
                    ctx.session.userInfo = userInfo
                    // 更新用户信息
                    await Raw.Update('xmw_user', updateParams, options);
                    // 获取角色信息
                    let roleInfo = await Raw.QueryList(`select role_id,role_name,role_code from xmw_role where role_id in (${userInfo.role_id.split(',')})`)
                    userInfo.roles = roleInfo
                    // 删除密码
                    delete userInfo.password
                    await ctx.service.logs.saveLogs(`登录 次数:${updateParams.login_num}`)
                    return ctx.body = { resCode: 200, resMsg: '登录成功!', response: userInfo }
                } else {
                    return ctx.body = { resCode: -1, resMsg: '此用户已被禁用,请联系管理员!', response: {} }
                }
            } else { // 用户名密码错误
                return ctx.body = { resCode: -1, resMsg: '用户名或密码错误!', response: {} }
            }

        } catch (error) {
            ctx.logger.info('login方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    /**
    * @description: 用户注销
    * @param {*} 
    * @return {*}
    */
    async logout() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { user_id } = ctx.session.userInfo
            await Raw.Update('xmw_user', { token: '' }, {
                wherestr: `where user_id=${user_id}`
            });
            await ctx.service.logs.saveLogs(`注销登录`)
            return ctx.body = { resCode: 200, resMsg: '注销成功!', response: {} }
        } catch (error) {
            ctx.logger.info('logout方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    /**
    * @description: 获取按钮权限key
    * @param {*} 
    * @return {*}
    */
    async getPermCode() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            // 从session获取用户id
            let { user_id } = ctx.session.userInfo
            // 获取用户角色id
            let { role_id } = await Raw.Query(`select role_id from xmw_user where user_id=${user_id}`)
            // 根据角色id获取对应的按钮权限
            let permission_list = await Raw.QueryList(`select permission from xmw_menu t
            left join xmw_permission p on t.menu_id = p.menu_id
            where p.role_id in (${role_id}) and t.menu_type = 'button'`)
            // 拿到按钮权限集合
            let menu_id = permission_list.map(v => v.permission)
            return ctx.body = { resCode: 200, resMsg: '请求成功!', response: Array.from(new Set(menu_id)) } //最后一步要去重
        } catch (error) {
            ctx.logger.info('getPermCode方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    /**
     * @description: 获取用户信息
     * @param {*} 
     * @return {*}
     */
    async getUserInfo() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            // 从session获取用户id
            let { user_id } = ctx.session.userInfo
            // 获取用户信息
            let userInfo = await Raw.Query(`select t.*,a.org_name,b.post_name from xmw_user t 
            left join xmw_organization a on t.org_id = a.org_id
            left join xmw_post b on t.post_id = b.post_id
            where user_id=${user_id} group by t.role_id`)
            // 获取角色信息
            let roleInfo = await Raw.QueryList(`select role_id,role_name,role_code from xmw_role where role_id in (${userInfo.role_id.split(',')})`)
            userInfo.roles = roleInfo
            // 删除密码
            delete userInfo.password
            return ctx.body = { resCode: 200, resMsg: '请求成功!', response: userInfo }
        } catch (error) {
            ctx.logger.info('getUserInfo方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }
}
module.exports = UserManagementController;
