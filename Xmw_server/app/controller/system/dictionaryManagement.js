/*
 * @Description:字典管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:42:58
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-22 11:39:06
 */
'use strict';

const Controller = require('egg').Controller;
class DictionaryManagementController extends Controller {
    /**
     * @description: 获取字典列表
     * @param {*} dictName:字典名称,dictCoding:字典编码,parentId:父级id,current:页码,pageSize:条数
     * @return {*}
     */
    async getDictionaryList() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { dictName, dictCoding, parentId, current, pageSize } = ctx.params;
            // 根据条件拼接筛选
            let conditions = 'where 1 = 1'
            if (dictName) conditions += ` and dictName like '%${dictName}%'`
            if (dictCoding) conditions += ` and dictCoding like '%${dictCoding}%'`
            if (parentId) conditions += ` and parentId = ${parentId}`
            // 有parentId查字典子项,没有则查字典列表
            else conditions += ` and parentId is null or parentId = ''`
            const result = await Raw.QueryPageData(`select * from xmw_dictionary ${conditions} order by sort desc,createTime asc `, current, pageSize);
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
        } catch (error) {
            ctx.logger.info('getDictionaryList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 新增和更新字典
     * @param {*} params:表单数据
     * @return {*}
     */
    async dictionarySave() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { dictionaryId, ...params } = ctx.params
            // 判断字典编码是否已存在
            let conditions = `where dictCoding = '${params.dictCoding}'`
            if (dictionaryId) conditions += ` and dictionaryId != '${dictionaryId}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_dictionary ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '字典编码已存在!', response: {} }
            }
            // 参数dictionaryId判断是新增还是编辑
            if (!dictionaryId) {
                params.dictionaryId = ctx.helper.snowflakeId()
                params.createTime = new Date()
                await Raw.Insert('xmw_dictionary', params);
            } else { // 编辑字典
                params.updateLastTime = new Date()
                const options = {
                    wherestr: `where dictionaryId = ${dictionaryId}`
                };
                await Raw.Update('xmw_dictionary', params, options);
            }
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('dictionarySave方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 删除字典
     * @param {*} ids:id集合,用,分隔
     * @return {*}
     */
    async dictionaryDel() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { ids } = ctx.params
            await Raw.Delete("xmw_dictionary", {
                wherestr: `where dictionaryId in (${ids})`
            });
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('dictionaryDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 查询字典键值集合
     * @param {*} dictCoding:字典编码
     * @return {*}
     */
    async dictionaryModel() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { dictCoding } = ctx.params
            let parentDict = await Raw.Query(`select dictionaryId from xmw_dictionary where dictCoding = '${dictCoding}'`)
            // 如果parentDict存在dictionaryId,则代表有数据
            if (parentDict) {
                let conditions = `where status = 1 and parentId = '${parentDict.dictionaryId}'`
                const result = await Raw.QueryList(`select dictionaryLabel as label,dictionaryValue as value from xmw_dictionary ${conditions} order by sort desc `);
                return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
            } else {
                return ctx.body = { resCode: 200, resMsg: '字典编码不存在!', response: [] }
            }
        } catch (error) {
            ctx.logger.info('dictionaryModel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
module.exports = DictionaryManagementController;
