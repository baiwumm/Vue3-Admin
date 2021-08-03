/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-03 10:43:05
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-03 11:40:12
 * @Description: 记录用户操作日志
 */
'use strict'
const Service = require('egg').Service

class Logs extends Service {
    // 记录每一个接口的操作到日志
    async saveLogs(content) {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { user_id } = ctx.session.userInfo
            let url = ctx.request.url
            // 正则先去掉http获取https
            let path = ctx.header.referer.replace(/^https?\:\/\//i, "");
            let logInfo = {
                log_id: ctx.helper.snowflakeId(),
                user_id: user_id,
                content: content,
                ip: ctx.request.ip,
                path: path.slice(path.indexOf('/')),
                // 判断url是否带参数，只获取路径
                api_url: url.slice(0, url.indexOf('?') === -1 ? undefined : url.indexOf('?')),
                user_agent: ctx.header['user-agent'],
                create_time: new Date()
            }
            await Raw.Insert('xmw_logs', logInfo);
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('saveLogs方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}

module.exports = Logs