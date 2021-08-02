/*
 * @Description: 菜单管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:46:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-30 10:11:05
 */
import { defHttp } from '/@/utils/http/axios';
import { getMenuTreeResultModel, menuSearchParams, menuSaveParams, menuDelParams, getMenuListResultModel } from './model/menuModel';

enum Api {
    getMenuTree = '/system/getMenuTree', // 获取菜单树结构
    menuSave = '/system/menuSave', // 新增和更新菜单
    menuDel = '/system/menuDel', // 删除菜单
    getMenuList = '/system/getMenuList', // 获取路由菜单
}

export function getMenuTree(params?: menuSearchParams) {
    return defHttp.get<getMenuTreeResultModel>({ url: Api.getMenuTree, params });
}

export function menuSave(params: menuSaveParams) {
    return defHttp.post({ url: Api.menuSave, params });
}

export function menuDel(params: menuDelParams) {
    return defHttp.post({ url: Api.menuDel, params });
}

export function getMenuList() {
    return defHttp.get<getMenuListResultModel>({ url: Api.getMenuList });
}


