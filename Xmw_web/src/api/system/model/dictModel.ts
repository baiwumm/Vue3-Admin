/*
 * @Author: Xie Mingwei
 * @Date: 2021-07-30 11:08:06
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-31 17:30:25
 * @Description:字典管理模块参数类型注解
 */

/**
 * @description: 查询参数
 * @param {*}
 * @return {*}
 */
export interface dictSearchParams {
    dict_name?: string; // 字典名称
    dict_coding?: string; // 字典编码
    parent_id?: string; // 父级id
    current: number; // 页码
    pageSize: number; // 条数
}

/**
 * @description: 字典列表数据
 * @param {*}
 * @return {*}
 */
export interface getDictResultModel {
    dictionary_id: string; // 字典id
    dict_name: string; // 字典名称
    dictionary_label: string; // 字典标签
    dictionary_value: string; // 字典键值
    dict_coding: string; // 字典编码
    parent_id: string | null; // 父级id
    status: string; // 状态
    founder: string;// 创建人
    create_time: string;// 创建时间
    update_last_time: string;// 最后一次修改时间
    remark: string; // 备注
    sort: number; // 排序
}

/**
 * @description: 字典保存表单参数
 * @param {*}
 * @return {*}
 */
export interface dictSaveParams {
    dictionary_id?: string; // 字典id
    dict_name?: string; // 字典名称
    dict_coding?: string; // 字典编码
    dictionary_label?: string; // 字典标签
    dictionary_value?: string; // 字典键值
    parent_id?: string; // 父级id
    status: string; // 状态
    remark: string; // 备注
    sort: number; // 排序
}

/**
 * @description: 删除字典参数
 * @param {*}
 * @return {*}
 */
export interface dictDelParams {
    ids: string; // id集合,用,分割
    dict_name?: string; //字典名称
    dictionary_label?: string; //标签名称
}

/**
 * @description: 查询字典参数
 * @param {*}
 * @return {*}
 */
export interface dictModelParams {
    dict_coding: string; // 字典编码
}

/**
 * @description: 查询字典数据
 * @param {*}
 * @return {*}
 */
export interface dictModelResult {
    dictionary_label: string; // 字典标签
    dictionary_value: string; // 字典键值
}
