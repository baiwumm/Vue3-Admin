/*
 * @Author: Xie Mingwei
 * @Date: 2021-07-30 10:08:30
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-04 17:58:54
 * @Description:角色管理模块参数类型注解
 */

/**
 * @description: 查询参数
 * @param {*}
 * @return {*}
 */
export interface roleSearchParams {
    role_name?: string; // 角色名称
    status?: string; // 状态
    current: number; // 页码
    pageSize: number; // 条数
}

/**
 * @description: 角色列表数据
 * @param {*}
 * @return {*}
 */
export interface getRoleResultModel {
    role_id: string; // 角色id
    role_name: string; // 角色名称
    role_code: string; // 角色编码
    status: string; // 状态
    founder: string;// 创建人
    create_time: string;// 创建时间
    update_last_time: string;// 最后一次修改时间
    remark: string; // 备注
}

/**
 * @description: 角色保存表单参数
 * @param {*}
 * @return {*}
 */
export interface roleSaveParams {
    role_id?: string; // 角色id
    role_name: string; // 角色名称
    role_code: string; // 角色编码
    status: string; // 状态
    remark: string; // 备注
    menu_role: string[]; // 菜单权限
}

/**
 * @description: 角色改变状态参数
 * @param {*}
 * @return {*}
 */
export interface roleStatusParams {
    role_id: string; // 角色id
    status: string; // 状态
}

/**
 * @description: 删除角色参数
 * @param {*}
 * @return {*}
 */
export interface roleDelParams {
    ids: string; // id集合,用,分割
    role_name: string; //角色名称
}