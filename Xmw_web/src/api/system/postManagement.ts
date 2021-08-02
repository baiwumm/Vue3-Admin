/*
 * @Description: 岗位管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:46:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-30 11:21:03
 */
import { defHttp } from '/@/utils/http/axios';
import { postSearchParams, getPostListResultModel, postSaveParams, postDelParams } from './model/postModel';

enum Api {
    getPostTree = '/system/getPostTree', // 获取岗位树结构
    postSave = '/system/postSave', // 新增和更新岗位
    postDel = '/system/postDel', // 删除岗位
}

export function getPostTree(params?: postSearchParams) {
    return defHttp.get<getPostListResultModel>({ url: Api.getPostTree, params: params });
}

export function postSave(params: postSaveParams) {
    return defHttp.post({ url: Api.postSave, params: params });
}

export function postDel(params: postDelParams) {
    return defHttp.post({ url: Api.postDel, params: params });
}


