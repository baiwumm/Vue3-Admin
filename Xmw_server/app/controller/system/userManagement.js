/*
 * @Description: 用户管理API接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 15:00:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-16 17:43:27
 */
'use strict';

const Controller = require('egg').Controller;
class UserManagementController extends Controller {
    // 获取用户列表
    async getUserList() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { userName, status, current, pageSize } = ctx.params;
            let conditions = 'where 1=1'
            if (userName) conditions += ` and userName like '%${userName}%'`
            if (status) conditions += ` and status = '${status}'`
            const result = await Raw.QueryPageData(`select * from xmw_user ${conditions} `, current, pageSize);
            ctx.body = { resCode: 200, resMsg: '请求成功!', response: result }

        } catch (error) {
            ctx.logger.info('getUserList方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }
}
module.exports = UserManagementController;
