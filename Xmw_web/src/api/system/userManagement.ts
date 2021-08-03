/*
 * @Author: Xie Mingwei
 * @Date: 2021-07-15 15:07:52
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-03 18:06:57
 * @Description: 用户管理模块接口
 */
import { defHttp } from '/@/utils/http/axios';
import { LoginParams, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
    getUserList = '/system/getUserList', // 获取用户列表
    userSave = '/system/userSave', // 新增和更新用户
    userDel = '/system/userDel', // 删除用户
    Login = '/login', // 用户登录
    Logout = '/logout', // 用户注销
    GetUserInfo = '/getUserInfo',  // 获取用户信息
    GetPermCode = '/getPermCode', // 获取按钮权限key
}

export function getUserList(params?: object) {
    return defHttp.get({ url: Api.getUserList, params: params });
}

export function userSave(params?: object) {
    return defHttp.post({ url: Api.userSave, params: params });
}

export function userDel(params?: object) {
    return defHttp.post({ url: Api.userDel, params: params });
}

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
    return defHttp.post<GetUserInfoModel>(
        {
            url: Api.Login,
            params,
        },
        {
            errorMessageMode: mode,
        }
    );
}


export function getUserInfo() {
    return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
    return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
    return defHttp.get({ url: Api.Logout });
}
