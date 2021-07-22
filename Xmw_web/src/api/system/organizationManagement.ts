/*
 * @Description: 组织管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:46:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-21 10:08:20
 */
import { defHttp } from '/@/utils/http/axios';

enum Api {
    getOrganizationTree = '/system/getOrganizationTree', // 获取组织树结构
    organizationSave = '/system/organizationSave', // 新增和更新组织
    organizationDel = '/system/organizationDel', // 删除组织
}

export function getOrganizationTree(params?: object) {
    return defHttp.get({ url: Api.getOrganizationTree, params: params });
}

export function organizationSave(params?: object) {
    return defHttp.post({ url: Api.organizationSave, params: params });
}

export function organizationDel(params?: object) {
    return defHttp.post({ url: Api.organizationDel, params: params });
}


