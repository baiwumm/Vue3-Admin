/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-03 16:50:34
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-03 16:54:13
 * @Description:操作日志模块API接口
 */
'use strict';

const Controller = require('egg').Controller;

class OperationLogs extends Controller {
    // 获取日志列表
    async getLogList() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { current, pageSize } = ctx.params;
            const result = await Raw.QueryPageData(`select * from xmw_logs`, current, pageSize)
            return ctx.body = { resCode: 200, resMsg: '请求成功!', response: result }
        } catch (error) {
            ctx.logger.info('getLogList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }
}

module.exports = OperationLogs;
