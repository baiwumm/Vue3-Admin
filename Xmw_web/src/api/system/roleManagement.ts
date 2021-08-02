/*
 * @Description: 角色管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:46:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-30 11:21:11
 */
import { defHttp } from '/@/utils/http/axios';
import { roleSearchParams, getRoleResultModel, roleSaveParams, roleStatusParams, roleDelParams } from './model/roleModel';

enum Api {
    getRoleList = '/system/getRoleList', // 获取角色列表
    roleSave = '/system/roleSave', // 新增和更新角色
    setRoleStatus = '/system/setRoleStatus', // 更改角色状态
    roleDel = '/system/roleDel', // 删除角色
}

export function getRoleList(params?: roleSearchParams) {
    return defHttp.get<getRoleResultModel>({ url: Api.getRoleList, params: params });
}

export function roleSave(params: roleSaveParams) {
    return defHttp.post({ url: Api.roleSave, params: params });
}

export function setRoleStatus(params: roleStatusParams) {
    return defHttp.post({ url: Api.setRoleStatus, params: params });
}

export function roleDel(params: roleDelParams) {
    return defHttp.post({ url: Api.roleDel, params: params });
}


