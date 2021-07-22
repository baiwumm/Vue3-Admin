/*
 * @Description: 岗位管理API接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 15:00:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-22 11:38:02
 */
'use strict';

const Controller = require('egg').Controller;
class PostManagementController extends Controller {

    /**
     * @description: 获取岗位树结构
     * @param {*} 
     * @return {*}
     */
    async getPostTree() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { postName, orgId } = ctx.params;
            // 根据条件拼接筛选
            let conditions = 'where 1 = 1'
            if (postName) conditions += ` and n.postName like '%${postName}%'`
            if (orgId) conditions += ` and t.orgId = '${orgId}'`
            let data = await Raw.QueryList(`select n.*,orgName from xmw_post n left join xmw_organization t on n.orgId = t.orgId ${conditions} order by n.createTime desc`);
            const result = ctx.helper.initializeTree(data, 'postId', 'parentId', 'children')
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
    async postSave() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { postId, ...params } = ctx.params
            // 判断父级不能是自己
            if (params.parentId == postId && postId) {
                return ctx.body = { resCode: -1, resMsg: '父级不能是自己!', response: {} }
            }
            // 判断部门名称和部门编码是否已存在
            let conditions = `where (postName = '${params.postName}' and (orgId = '${params.orgId}' or parentId = '${params.parentId}'))`
            if (postId) conditions += ` and postId != '${postId}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_post ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '相同组织和同级岗位不能重名!', response: {} }
            }
            // 参数orgId判断是新增还是编辑
            if (!postId) {
                params.postId = ctx.helper.snowflakeId()
                params.createTime = new Date()
                await Raw.Insert('xmw_post', params);
            } else { // 编辑字典
                params.updateLastTime = new Date()
                const options = {
                    wherestr: `where postId = ${postId}`
                };
                await Raw.Update('xmw_post', params, options);
            }
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
    async postDel() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { ids } = ctx.params
            // 判断当前岗位是否存在子级
            let conditions = `where parentId = '${ids}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_post ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '当前岗位存在子级,不能删除!', response: {} }
            }
            await Raw.Delete("xmw_post", {
                wherestr: `where postId in (${ids})`
            });
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('postDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
module.exports = PostManagementController;
