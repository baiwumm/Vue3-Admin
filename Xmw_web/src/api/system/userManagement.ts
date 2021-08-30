/*
 * @Author: Xie Mingwei
 * @Date: 2021-07-15 15:07:52
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-26 13:51:17
 * @Description: 用户管理模块接口
 */
import { defHttp } from '/@/utils/http/axios';
import { LoginParams, GetUserInfoModel, getUserResultModel, userDelParams } from './model/userModel';

enum Api {
    getUserList = '/system/getUserList', // 获取用户列表
    userSave = '/system/userSave', // 新增和更新用户
    userDel = '/system/userDel', // 删除用户
    Login = '/login', // 用户登录
    Logout = '/logout', // 用户注销
    GetUserInfo = '/getUserInfo',  // 获取用户信息
    GetPermCode = '/getPermCode', // 获取按钮权限key
    generateVerifCode = '/generateVerifCode', // 生成验证码
}

export function getUserList(params: getUserResultModel) {
    return defHttp.get<GetUserInfoModel>({ url: Api.getUserList, params: params });
}

export function userSave(params: GetUserInfoModel) {
    return defHttp.post({ url: Api.userSave, params: params });
}

export function userDel(params: userDelParams) {
    return defHttp.post({ url: Api.userDel, params: params });
}

export function loginApi(params: LoginParams) {
    return defHttp.post<GetUserInfoModel>({ url: Api.Login, params, });
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

export function generateVerifCode() {
    return defHttp.get({ url: Api.generateVerifCode });
}
