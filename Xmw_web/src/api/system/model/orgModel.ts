/*
 * @Author: Xie Mingwei
 * @Date: 2021-07-30 10:27:13
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-04 09:36:58
 * @Description:组织管理模块参数类型注解
 */

/**
 * @description: 查询参数
 * @param {*}
 * @return {*}
 */
export interface orgSearchParams {
    org_name?: string; // 组织名称
    status?: string; // 状态
}

/**
 * @description: 组织数据返回格式
 * @param {*}
 * @return {*}
 */
export interface OrgListItem {
    org_id: string; //组织id
    org_name: string; // 组织名称
    org_code: string; // 组织编码
    org_type: string; // 组织类型
    leader: string; // 部门负责人
    founder: string;// 创建人
    create_time: string;// 创建时间
    update_last_time: string;// 最后一次修改时间
    remark: string; // 备注
    status: string; // 状态
    parent_id: string | null; //父级id
    sort: number; // 排序
    children?: OrgListItem[];
}
export type getOrgListResultModel = OrgListItem[];

/**
 * @description: 组织保存表单参数
 * @param {*}
 * @return {*}
 */
export interface orgSaveParams {
    parent_id?: string; // 父级id
    org_id?: string; // 组织id
    org_name: string; // 组织名称
    org_code: string; // 组织编码
    org_type: string; // 组织类型
    status: string; // 状态
    sort: number; // 排序
    remark: string; // 备注
}

/**
 * @description: 删除组织参数
 * @param {*}
 * @return {*}
 */
export interface orgDelParams {
    ids: string; // id集合,用,分割
    org_name: string; //组织名称
}
