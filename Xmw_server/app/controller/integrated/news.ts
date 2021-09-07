/*
 * @Author: Xie Mingwei
 * @Date: 2021-09-02 16:35:50
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-09-07 10:46:38
 * @Description:新闻公告模块接口
 */

import { Controller } from 'egg';
import { resResultModel } from '../../public/resModel'

export default class NewsController extends Controller {
    /**
     * @description: 获取新闻公告列表
     * @param {*} title:标题,type:公告类型,current:页码,pageSize:条数
     * @return {*}
     */
    public async getNewsList(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { title, type, current, pageSize } = ctx.params;
            let { user_id } = ctx.session.userInfo
            // 根据条件拼接筛选
            let conditions: string = 'where 1 = 1'
            if (title) conditions += ` and title like '%${title}%'`
            if (type) conditions += ` and type = '${type}'`
            const result = await Raw.QueryPageData(`select n.*,u.cn_name as author_name,u.avatar, case when a.user_id = ${user_id} then 1 else 0 end as already  from xmw_news n 
            left join xmw_user u on n.author = u.user_id 
            left join xmw_news_already a on n.news_id = a.news_id  ${conditions} order by placed_top desc,create_time desc`, current, pageSize)
            return ctx.body = { resCode: 200, resMsg: '请求成功!', response: result }
        } catch (error) {
            ctx.logger.info('getNewsList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '请求失败!', response: error }
        }
    }

    /**
     * @description: 新增和更新新闻公告
     * @param {*} params:表单数据
     * @return {*}
     */
    public async newsSave(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            // 从session获取用户id
            let { user_id } = ctx.session.userInfo
            let { news_id, ...params } = ctx.params
            // 参数news_id判断是新增还是编辑
            if (!news_id) {
                params.news_id = ctx.helper.snowflakeId()
                params.create_time = new Date()
                params.author = user_id
                await Raw.Insert('xmw_news', params);
            } else { // 编辑用户
                params.update_last_time = new Date()
                const options = {
                    wherestr: `where news_id = ${news_id}`
                };
                await Raw.Update('xmw_news', params, options);
            }
            await service.logs.saveLogs(`${news_id ? '编辑' : '新增'}新闻公告:${params.title}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('newsSave方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 删除新闻公告
     * @param {*} ids:id集合,用,分隔
     * @return {*}
     */
    public async newsDel(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { ids, title } = ctx.params
            await Raw.Delete("xmw_news", {
                wherestr: `where news_id in (${ids})`
            });
            await service.logs.saveLogs(`删除新闻公告:${title}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('newsDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 更改置顶状态
     * @param {*} news_id:新闻公告id,placed_top:是否置顶,title:标题
     * @return {*}
     */
    public async setNewsPlacedTop(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { news_id, placed_top, title } = ctx.params;
            const options = {
                wherestr: `where news_id=${news_id}`
            };
            await Raw.Update('xmw_news', { placed_top: placed_top }, options);
            await service.logs.saveLogs(`更改置顶状态:${title}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('setNewsPlacedTop方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 存储已读user_id
     * @param {*} news_id:新闻公告id
     * @return {*}
     */
    public async saveAlreadyNews(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { news_id, title } = ctx.params;
            let { user_id } = ctx.session.userInfo
            // 整理参数
            let params = {
                news_id,
                user_id,
                already_id: ctx.helper.snowflakeId(),
                create_time: new Date()
            }
            await Raw.Insert('xmw_news_already', params);
            await service.logs.saveLogs(`读取消息:${title}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('saveAlreadyNews方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 查询未读数量
     * @param {*} 
     * @return {*}
     */
    public async getNewsUnreadyCount(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_id } = ctx.session.userInfo
            // 查询总数量
            const newsCount = await Raw.Query(`select count(*) as total from xmw_news`)
            // 查询已读数量
            const alreadyCount = await Raw.Query(`select count(*) as total from xmw_news_already where user_id = ${user_id}`)
            // 计算未读数量
            const unreadyCount = newsCount.total - alreadyCount.total
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: { unreadyCount: unreadyCount } }
        } catch (error) {
            ctx.logger.info('getNewsUnreadyCount方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
