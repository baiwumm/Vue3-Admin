import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
    getUserList = '/system/getUserList', // 获取用户列表
    userSave = '/system/userSave', // 新增和更新角色
    userDel = '/system/userDel', // 删除用户
    Login = '/login',
    Logout = '/logout',
    GetUserInfo = '/getUserInfo',
    GetPermCode = '/getPermCode',
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
/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
    return defHttp.post<LoginResultModel>(
        {
            url: Api.Login,
            params,
        },
        {
            errorMessageMode: mode,
        }
    );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
    return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
    return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
    return defHttp.get({ url: Api.Logout });
}
