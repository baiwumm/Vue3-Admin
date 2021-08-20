/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-03 16:50:34
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 15:10:53
 * @Description:操作日志模块API接口
 */
import { Controller } from 'egg';
import { resResultModel } from '../../public/resModel'

export default class OperationLogs extends Controller {
    // 获取日志列表
    public async getLogList(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_id, start_time, end_time, current, pageSize } = ctx.params;
            // 根据条件拼接筛选
            let conditions: string = 'where 1 = 1'
            if (user_id) conditions += ` and l.user_id = '${user_id}'`
            if (start_time && end_time) conditions += ` and l.create_time between '${start_time} 00:00:00' and '${end_time} 23:59:59'`
            const result = await Raw.QueryPageData(`select l.*,u.user_name,u.cn_name from xmw_logs l left join xmw_user u on l.user_id = u.user_id ${conditions} order by l.create_time desc`, current, pageSize)
            return ctx.body = { resCode: 200, resMsg: '请求成功!', response: result }
        } catch (error) {
            ctx.logger.info('getLogList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }
}
