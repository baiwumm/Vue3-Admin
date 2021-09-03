/*
 * @Author: Xie Mingwei
 * @Date: 2021-07-23 16:17:46
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-09-03 10:49:41
 * @Description: 用户管理参数类型注解
 */
/**
 * @description: 登录参数
 * @param {*}
 * @return {*}
 */
export interface LoginParams {
    user_name: string; // 用户名
    password: string; // 密码
    verifyCode: string; // 验证码
}

/**
 * @description: 角色组
 * @param {*}
 * @return {*}
 */
export interface RoleInfo {
    role_id: string; // 角色id
    role_name: string; // 角色名称
    role_code: string; // 角色编码
}


/**
 * @description: 用户信息返回格式
 * @param {*}
 * @return {*}
 */
export interface GetUserInfoModel {
    address?: string; // 用户地址
    avatar?: string | null; // 用户头像
    cn_name: string; // 中文名
    create_time?: string; // 创建时间
    email?: string; // 电子邮箱
    en_name?: string; // 英文名
    founder?: string; // 创建人
    label?: string | null; // 用户标签
    login_last_ip?: string; // 登录ip
    login_last_time?: string; // 最后一次登录时间
    login_num?: number; // 登录次数
    motto?: string; // 座右铭
    org_id: string; // 组织id
    org_name?: string; // 组织名称
    phone?: string | null; // 手机号码
    post_id?: string | null; // 岗位id
    post_name?: string | null; // 岗位名称
    role_id: string | null; // 角色id
    sex: string; // 性别
    sort: number; // 排序
    status: string; // 状态
    token?: string | undefined; // token
    update_last_time?: string | null; // 最后一次更新时间
    user_id?: string; // 用户id
    user_name: string; // 用户名
    work_no?: string | null; // 工号
    tag?: string; // 标签
    roles?: RoleInfo[];
}

/**
 * @description: 用户列表参数
 * @param {*}
 * @return {*}
 */
export interface getUserResultModel {
    user_name?: string; // 用户名
    status?: string; // 状态,
    role_id?: string; // 角色id
    current: number; // 页码
    pageSize: number; // 条数
}

/**
 * @description: 删除用户参数
 * @param {*}
 * @return {*}
 */
export interface userDelParams {
    ids: string; // id集合,用,分割
    cn_name: string; //中文名
}
