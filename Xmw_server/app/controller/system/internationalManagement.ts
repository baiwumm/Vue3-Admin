/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-20 10:29:06
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 15:10:15
 * @Description:国际化模块API接口
 */

import { Controller } from 'egg';
import { resResultModel } from '../../public/resModel'
export default class InternationalManagement extends Controller {

    /**
     * @description: 获取国际化列表
     * @param {*} internation_name:国际化字段,zh_CN:中文,current:页码,pageSize:条数
     * @return {*}
     */
    public async getInternationalList(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { internation_name, zh_CN, current, pageSize } = ctx.params;
            // 根据条件拼接筛选
            let conditions: string = 'where 1 = 1'
            if (internation_name) conditions += ` and internation_name like '%${internation_name}%'`
            if (zh_CN) conditions += ` and zh_CN like '%${zh_CN}%'`
            const result = await Raw.QueryPageData(`select i.*,u.cn_name from xmw_international i left join xmw_user u on i.founder = u.user_id ${conditions} order by create_time desc`, current, pageSize)
            return ctx.body = { resCode: 200, resMsg: '请求成功!', response: result }
        } catch (error) {
            ctx.logger.info('getInternationalList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    /**
     * @description: 获取国际化语言
     * @param {*} 
     * @return {*}
     */
    public async getInternationalLang(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { lang } = ctx.params;
            const langData = await Raw.QueryList(`select internation_name,${lang} from xmw_international`)
            // 将语言数据转成对象形式
            let result = ctx.helper.transformLang(langData, lang, 'internation_name')
            return ctx.body = { resCode: 200, resMsg: '请求成功!', response: result }
        } catch (error) {
            ctx.logger.info('getInternationalLang方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    /**
    * @description: 新增和更新国际化
    * @param {*} params:表单数据
    * @return {*}
    */
    public async internationaSave(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            // 从session获取用户id
            let { user_id } = ctx.session.userInfo
            let { internation_id, ...params } = ctx.params
            // 判断国际化字段是否已存在
            let conditions: string = `where internation_name = '${params.internation_name}'`
            if (internation_id) conditions += ` and internation_id != '${internation_id}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_international ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '国际化字段已存在!', response: {} }
            }
            // 参数internation_id判断是新增还是编辑
            if (!internation_id) {
                params.internation_id = ctx.helper.snowflakeId()
                params.create_time = new Date()
                params.founder = user_id
                await Raw.Insert('xmw_international', params);
            } else { // 编辑用户
                params.update_last_time = new Date()
                const options = {
                    wherestr: `where internation_id = ${internation_id}`
                };
                await Raw.Update('xmw_international', params, options);
            }
            await service.logs.saveLogs(`${internation_id ? '编辑' : '新增'}国际化字段:${params.internation_name}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('internationaSave方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 删除国际化字段
     * @param {*} ids:id集合,用,分隔
     * @return {*}
     */
    public async internationalDel(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { ids, internation_name } = ctx.params
            await Raw.Delete("xmw_international", {
                wherestr: `where internation_id in (${ids})`
            });
            await service.logs.saveLogs(`删除国际化字段:${internation_name}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('internationalDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
