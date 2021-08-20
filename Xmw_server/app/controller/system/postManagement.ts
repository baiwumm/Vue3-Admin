/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-20 14:03:50
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 15:11:39
 * @Description:岗位管理API接口
 */
import { Controller } from 'egg';
import { resResultModel } from '../../public/resModel'
export default class PostManagementController extends Controller {
    /**
     * @description: 获取岗位树结构
     * @param {*} 
     * @return {*}
     */
    public async getPostTree(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { post_name, org_id } = ctx.params;
            // 根据条件拼接筛选
            let conditions: string = 'where 1 = 1'
            if (post_name) conditions += ` and n.post_name like '%${post_name}%'`
            if (org_id) conditions += ` and t.org_id = '${org_id}'`
            let data = await Raw.QueryList(`select n.*,org_name from xmw_post n left join xmw_organization t on n.org_id = t.org_id ${conditions} order by n.create_time desc`);
            const result = ctx.helper.initializeTree(data, 'post_id', 'parent_id', 'children')
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
        } catch (error) {
            ctx.logger.info('getPostTree方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 新增和更新岗位
     * @param {*} params:表单数据
     * @return {*}
     */
    public async postSave(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            // 从session获取用户id
            let { user_id } = ctx.session.userInfo
            let { post_id, ...params } = ctx.params
            // 判断父级不能是自己
            if (params.parent_id == post_id && post_id) {
                return ctx.body = { resCode: -1, resMsg: '父级不能是自己!', response: {} }
            }
            // 判断部门名称和部门编码是否已存在
            let conditions: string = `where (post_name = '${params.post_name}' and (org_id = '${params.org_id}' or parent_id = '${params.parent_id}'))`
            if (post_id) conditions += ` and post_id != '${post_id}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_post ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '相同组织和同级岗位不能重名!', response: {} }
            }
            // 参数post_id判断是新增还是编辑
            if (!post_id) {
                params.post_id = ctx.helper.snowflakeId()
                params.create_time = new Date()
                params.founder = user_id
                await Raw.Insert('xmw_post', params);
            } else { // 编辑字典
                params.update_last_time = new Date()
                const options = {
                    wherestr: `where post_id = ${post_id}`
                };
                await Raw.Update('xmw_post', params, options);
            }
            await service.logs.saveLogs(`${post_id ? '编辑' : '新增'}岗位:${params.post_name}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('postSave方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
    * @description: 删除岗位
    * @param {*} ids:id集合,用,分隔
    * @return {*}
    */
    public async postDel(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { ids, post_name } = ctx.params
            // 判断当前岗位是否存在子级
            let conditions: string = `where parent_id = '${ids}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_post ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '当前岗位存在子级,不能删除!', response: {} }
            }
            await Raw.Delete("xmw_post", {
                wherestr: `where post_id in (${ids})`
            });
            await service.logs.saveLogs(`删除岗位:${post_name}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('postDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
