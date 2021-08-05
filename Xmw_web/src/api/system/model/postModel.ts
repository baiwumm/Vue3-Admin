/*
 * @Author: Xie Mingwei
 * @Date: 2021-07-30 10:45:36
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-04 09:37:18
 * @Description:岗位管理参数类型注解
 */

/**
 * @description: 查询参数
 * @param {*}
 * @return {*}
 */
export interface postSearchParams {
    post_name?: string; // 岗位名称
    org_id?: string; // 所属组织
}

/**
 * @description: 岗位数据返回格式
 * @param {*}
 * @return {*}
 */
export interface PostListItem {
    post_id: string; //岗位id
    post_name: string; // 岗位名称
    org_id: string; // 所属组织id
    founder: string;// 创建人
    create_time: string;// 创建时间
    update_last_time: string;// 最后一次修改时间
    remark: string; // 备注
    status: string; // 状态
    parent_id: string | null; //父级id
    sort: number; // 排序
    children?: PostListItem[];
}
export type getPostListResultModel = PostListItem[];

/**
 * @description: 岗位保存表单参数
 * @param {*}
 * @return {*}
 */
export interface postSaveParams {
    parent_id?: string; // 父级id
    post_id?: string; // 岗位id
    post_name: string; // 岗位名称
    org_id: string; // 所属组织id
    status: string; // 状态
    sort: number; // 排序
    remark: string; // 备注
}

/**
 * @description: 删除岗位参数
 * @param {*}
 * @return {*}
 */
export interface postDelParams {
    ids: string; // id集合,用,分割
    post_name: string; // 岗位名称
}