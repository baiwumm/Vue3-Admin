/*
 * @Description: 用户管理API接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 15:00:42
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-20 17:16:09
 */
import { Controller } from 'egg';
import { resResultModel } from '../../public/resModel'
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');

export default class UserManagementController extends Controller {

    /**
     * @description: 获取用户列表
     * @param {*} user_name:用户名称,cn_name:中文名,current:页码,pageSize:条数
     * @return {*}
     */
    public async getUserList(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_name, status, role_id, current, pageSize } = ctx.params;
            // 根据条件拼接筛选
            let conditions: string = 'where 1 = 1'
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
    public async userSave(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_id, ...params } = ctx.params
            // 判断用户名称是否已存在
            let conditions: string = `where user_name = '${params.user_name}'`
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
                // 根据参数是否有user_name,判断是编辑用户还是更新基本信息
                if (params.user_name) {
                    // 根据性别写死头像
                    params.avatar = params.sex == '0' ? ctx.app.config.avatar.male : ctx.app.config.avatar.female
                }
                const options = {
                    wherestr: `where user_id = ${user_id}`
                };
                await Raw.Update('xmw_user', params, options);
            }
            let logInfo = params.user_name ? (user_id ? '编辑' : '新增') + '用户:' + params.cn_name : '更新基本信息'
            await service.logs.saveLogs(logInfo)
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
    public async userDel(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { ids, cn_name } = ctx.params
            await Raw.Delete("xmw_user", {
                wherestr: `where user_id in (${ids})`
            });
            await service.logs.saveLogs(`删除用户:${cn_name}`)
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
    public async login(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_name, password, verifyCode } = ctx.params
            let payload = { user_name, password }
            let jwtToken = jwt.sign(payload, this.config.privateKey, { expiresIn: this.config.expiresIn });  //生成token
            // 判断验证码是否正确
            if (ctx.session.verifCode.toLowerCase() != verifyCode.toLowerCase()) {
                return ctx.body = { resCode: -1, resMsg: '验证码错误!', response: {} }
            }
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
                        token: jwtToken,
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
                    await service.logs.saveLogs(`登录 次数:${updateParams.login_num}`)
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
    public async logout(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_id } = ctx.session.userInfo
            await Raw.Update('xmw_user', { token: '' }, {
                wherestr: `where user_id=${user_id}`
            });
            await service.logs.saveLogs(`注销登录`)
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
    public async getPermCode(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
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
            let menu_id = permission_list.map((v: { permission: any; }) => v.permission)
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
    public async getUserInfo(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
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

    /**
     * @description: 生成验证码
     * @param {*}
     * @return {*}
     */
    public async generateVerifCode(): Promise<resResultModel> {
        const { ctx } = this;
        try {
            const codeConfig = {
                size: 4, // 验证码长度
                ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
                noise: 2, // 干扰线条的数量
                width: 160,
                height: 40,
                fontSize: 50,
                color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
                background: '#fff',
            };
            const captcha = svgCaptcha.create(codeConfig);
            ctx.response.type = 'image/svg+xml';
            ctx.session.verifCode = captcha.text.toLowerCase(); // 存session用于验证接口获取文字码
            return ctx.body = { resCode: 200, resMsg: '请求成功!', response: captcha.data }
        } catch (error) {
            ctx.logger.info('generateVerifCode方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }
}
