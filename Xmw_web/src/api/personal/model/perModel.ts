/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-10 17:49:07
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-11 10:16:14
 * @Description:个人中心参数类型注解
 */

/**
 * @description: 修改标签参数
 * @param {*}
 * @return {*}
 */
export interface tagParams {
    tags: string; // 标签内容
}

/**
 * @description: 修改密码参数
 * @param {*}
 * @return {*}
 */
export interface pwdParams {
    passwordOld: string; // 原密码
    passwordNew: string; // 新密码
}
