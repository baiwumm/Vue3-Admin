/*
 * @Description: 组织管理API接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 15:00:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-21 10:17:28
 */
'use strict';

const Controller = require('egg').Controller;
class OrganizationManagementController extends Controller {

    /**
     * @description: 获取组织树结构
     * @param {*} 
     * @return {*}
     */
    async getOrganizationTree() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { orgName, orgCode } = ctx.params;
            // 根据条件拼接筛选
            let conditions = 'where 1 = 1'
            if (orgName) conditions += ` and orgName like '%${orgName}%'`
            if (orgCode) conditions += ` and orgCode like '%${orgCode}%'`
            let data = await Raw.QueryList(`select * from xmw_organization ${conditions} order by createTime desc`);
            const result = ctx.helper.initializeTree(data, 'orgId', 'parentId', 'children')
            ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }

        } catch (error) {
            ctx.logger.info('getOrganizationTree方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 新增和更新组织
     * @param {*} params:表单数据
     * @return {*}
     */
    async organizationSave() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { orgId, ...params } = ctx.params
            // 判断父级不能是自己
            if (params.parentId == orgId && orgId) {
                ctx.body = { resCode: -1, resMsg: '父级不能是自己!', response: {} }
                return
            }
            // 判断部门名称和部门编码是否已存在
            let conditions = `where (orgName = '${params.orgName}' or orgCode = '${params.orgCode}')`
            if (orgId) conditions += ` and orgId != '${orgId}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_organization ${conditions}`);
            if (exist.total) {
                ctx.body = { resCode: -1, resMsg: '组织名称或组织编码已存在!', response: {} }
                return
            }
            // 参数orgId判断是新增还是编辑
            if (!orgId) {
                params.orgId = ctx.helper.snowflakeId()
                params.createTime = new Date()
                await Raw.Insert('xmw_organization', params);
            } else { // 编辑字典
                params.updateLastTime = new Date()
                const options = {
                    wherestr: `where orgId = ${orgId}`
                };
                await Raw.Update('xmw_organization', params, options);
            }
            ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('organizationSave方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 删除组织
     * @param {*} ids:id集合,用,分隔
     * @return {*}
     */
    async organizationDel() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { ids } = ctx.params
            // 判断当前部门是否存在子部门
            let conditions = `where parentId = '${ids}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_organization ${conditions}`);
            if (exist.total) {
                ctx.body = { resCode: -1, resMsg: '当前组织存在子级,不能删除!', response: {} }
                return
            }
            await Raw.Delete("xmw_organization", {
                wherestr: `where orgId in (${ids})`
            });
            ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('organizationDel方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
module.exports = OrganizationManagementController;
