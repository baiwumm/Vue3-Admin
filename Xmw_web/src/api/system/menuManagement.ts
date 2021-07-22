/*
 * @Description: 菜单管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:46:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-22 11:45:20
 */
import { defHttp } from '/@/utils/http/axios';

enum Api {
    getMenuTree = '/system/getMenuTree', // 获取菜单树结构
    menuSave = '/system/menuSave', // 新增和更新菜单
    menuDel = '/system/menuDel', // 删除菜单
}

export function getMenuTree(params?: object) {
    return defHttp.get({ url: Api.getMenuTree, params: params });
}

export function menuSave(params?: object) {
    return defHttp.post({ url: Api.menuSave, params: params });
}

export function menuDel(params?: object) {
    return defHttp.post({ url: Api.menuDel, params: params });
}


