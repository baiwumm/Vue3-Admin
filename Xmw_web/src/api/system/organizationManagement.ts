/*
 * @Description: 组织管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:46:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-30 11:20:57
 */
import { defHttp } from '/@/utils/http/axios';
import { orgSearchParams, getOrgListResultModel, orgSaveParams, orgDelParams } from './model/orgModel';

enum Api {
    getOrganizationTree = '/system/getOrganizationTree', // 获取组织树结构
    organizationSave = '/system/organizationSave', // 新增和更新组织
    organizationDel = '/system/organizationDel', // 删除组织
}

export function getOrganizationTree(params?: orgSearchParams) {
    return defHttp.get<getOrgListResultModel>({ url: Api.getOrganizationTree, params: params });
}

export function organizationSave(params: orgSaveParams) {
    return defHttp.post({ url: Api.organizationSave, params: params });
}

export function organizationDel(params: orgDelParams) {
    return defHttp.post({ url: Api.organizationDel, params: params });
}


