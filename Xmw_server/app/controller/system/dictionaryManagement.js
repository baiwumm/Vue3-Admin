/*
 * @Description:字典管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:42:58
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-27 16:45:00
 */
'use strict';

const Controller = require('egg').Controller;
class DictionaryManagementController extends Controller {
    /**
     * @description: 获取字典列表
     * @param {*} dict_name:字典名称,dict_coding:字典编码,parent_id:父级id,current:页码,pageSize:条数
     * @return {*}
     */
    async getDictionaryList() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { dict_name, dict_coding, parent_id, current, pageSize } = ctx.params;
            // 根据条件拼接筛选
            let conditions = 'where 1 = 1'
            if (dict_name) conditions += ` and dict_name like '%${dict_name}%'`
            if (dict_coding) conditions += ` and dict_coding like '%${dict_coding}%'`
            if (parent_id) conditions += ` and parent_id = ${parent_id}`
            // 有parent_id查字典子项,没有则查字典列表
            else conditions += ` and parent_id is null or parent_id = ''`
            const result = await Raw.QueryPageData(`select * from xmw_dictionary ${conditions} order by sort desc,create_time asc `, current, pageSize);
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
            let { dictionary_id, ...params } = ctx.params
            // 判断字典编码和字典名称是否已存在
            let conditions = `where (dict_coding = '${params.dict_coding}' or dict_name = '${params.dict_name}')`
            if (dictionary_id) conditions += ` and dictionary_id != '${dictionary_id}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_dictionary ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '字典名称和字典编码不能重复!', response: {} }
            }
            // 判断字典子项的标签和键值不能重复
            if (params.parent_id) {
                let conditions_item = `where (dictionary_label = '${params.dictionary_label}' or dictionary_value = '${params.dictionary_value}') and parent_id = '${params.parent_id}'`
                const exist_item = await Raw.Query(`select count(1) as total from xmw_dictionary ${conditions_item}`);
                if (exist_item.total) {
                    return ctx.body = { resCode: -1, resMsg: '相同字典下,标签和键值不能重复!', response: {} }
                }
            }
            // 参数dictionary_id判断是新增还是编辑
            if (!dictionary_id) {
                params.dictionary_id = ctx.helper.snowflakeId()
                params.create_time = new Date()
                await Raw.Insert('xmw_dictionary', params);
            } else { // 编辑字典
                params.update_last_time = new Date()
                const options = {
                    wherestr: `where dictionary_id = ${dictionary_id}`
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
                wherestr: `where dictionary_id in (${ids})`
            });
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('dictionaryDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 查询字典键值集合
     * @param {*} dict_coding:字典编码
     * @return {*}
     */
    async dictionaryModel() {
        const { app, ctx } = this;
        const { Raw } = app.Db.xmw;
        try {
            let { dict_coding } = ctx.params
            let parentDict = await Raw.Query(`select dictionary_id from xmw_dictionary where dict_coding = '${dict_coding}'`)
            // 如果parentDict存在dictionary_id,则代表有数据
            if (parentDict) {
                let conditions = `where status = 1 and parent_id = '${parentDict.dictionary_id}'`
                const result = await Raw.QueryList(`select dictionary_label as label,dictionary_value as value from xmw_dictionary ${conditions} order by sort desc `);
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
