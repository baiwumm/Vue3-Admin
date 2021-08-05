/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-05 14:25:11
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-05 15:27:55
 * @Description:国际化模块类型注解
 */

/**
 * @description: 查询参数
 * @param {*}
 * @return {*}
 */
export interface interSearchParams {
    current: number; // 页码
    pageSize: number; // 条数
}

export interface getinterResultModel {
    internation_id: string; //id
    cn_name: string; // 中文名
    internation_name: string; // 国际化字段
    zh_CN: string; // 中文
    en: string; // 英文
    founder: string; // 创建人
    create_time: string; // 创建时间
    update_last_time: string; // 最后一次更新时间
}

/**
 * @description: 删除国际化字段参数
 * @param {*}
 * @return {*}
 */
export interface interDelParams {
    ids: string; // id集合,用,分割
    internation_name: string; //国际化字段
}

/**
 * @description: 国际化表单参数
 * @param {*}
 * @return {*}
 */
export interface interSaveParams {
    internation_id?: string; // id
    internation_name: string; // 国际化字段
    zh_CN: string; // 中文
    en: string; // 英文
}

/**
 * @description: 国际化语言参数
 * @param {*}
 * @return {*}
 */
export interface interLangParams {
    lang: string; // 语言类型
}
