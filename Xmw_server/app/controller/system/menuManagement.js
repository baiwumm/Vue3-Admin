/*
 * @Description:菜单管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:42:58
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-22 18:18:23
 */
'use strict';

const Controller = require('egg').Controller;
class MenuManagementController extends Controller {
    /**
     * @description: 获取菜单树结构
     * @param {*} title:菜单名称,status:状态,current:页码,pageSize:条数
     * @return {*}
     */
    async getMenuTree() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { title, status } = ctx.params;
            // 根据条件拼接筛选
            let conditions = 'where 1 = 1'
            if (title) conditions += ` and title like '%${title}%'`
            if (status) conditions += ` and status = ${status}`
            let data = await Raw.QueryList(`select * from xmw_menu ${conditions} order by sort desc,createTime asc `);
            const result = ctx.helper.initializeTree(data, 'menuId', 'parentId', 'children')
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
        } catch (error) {
            ctx.logger.info('getMenuTree方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 新增和更新菜单
     * @param {*} params:表单数据
     * @return {*}
     */
    async menuSave() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { menuId, ...params } = ctx.params
            // 判断父级不能是自己
            if (params.parentId == menuId && menuId) {
                return ctx.body = { resCode: -1, resMsg: '父级不能是自己!', response: {} }
            }
            // 判断菜单名称是否已存在
            let conditions = `where title = '${params.title}' and menuType != 'button'`
            if (menuId) conditions += ` and menuId != '${menuId}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_menu ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '菜单名称已存在!', response: {} }
            }
            // 参数menuId判断是新增还是编辑
            if (!menuId) {
                params.menuId = ctx.helper.snowflakeId()
                params.createTime = new Date()
                await Raw.Insert('xmw_menu', params);
            } else { // 编辑字典
                params.updateLastTime = new Date()
                const options = {
                    wherestr: `where menuId = ${menuId}`
                };
                await Raw.Update('xmw_menu', params, options);
            }
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('menuSave方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 删除菜单
     * @param {*} ids:id集合,用,分隔
     * @return {*}
     */
    async menuDel() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { ids } = ctx.params
            // 判断当前菜单是否存在子级
            let conditions = `where parentId = '${ids}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_menu ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '当前菜单是否存在子级,不能删除!', response: {} }
            }
            await Raw.Delete("xmw_menu", {
                wherestr: `where menuId in (${ids})`
            });
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('menuDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
module.exports = MenuManagementController;
