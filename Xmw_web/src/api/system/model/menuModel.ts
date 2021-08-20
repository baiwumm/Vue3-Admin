/*
 * @Author: Xie Mingwei
 * @Date: 2021-07-23 14:25:12
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 13:52:14
 * @Description: 菜单管理模块参数类型注解
 */

import type { RouteMeta } from 'vue-router';
/**
 * @description: 查询参数
 * @param {*}
 * @return {*}
 */
export interface menuSearchParams {
    title?: string; // 菜单名称
    status?: string; // 路由状态
}

/**
 * @description: 路由树结构返回格式
 * @param {*}
 * @return {*}
 */
export interface menuTreeItem {
    menu_id: string; //路由id
    path: string; // 路由url
    component: any; // vue文件路径
    redirect: string; // 重定向地址
    title: string; // 菜单名称
    ignore_keep_alive: string; // 是否忽略KeepAlive缓存
    affix: string; // 是否固定标签
    icon: string; // 图标，也是菜单图标
    frame_src: string; // 内嵌iframe的地址
    transition_name: string; // 指定该路由切换的动画名
    hide_childrenIn_menu: string; // 隐藏所有子菜单
    hide_tab: string; // 当前路由不在标签页显示
    hide_menu: string; // 当前路由不在菜单显示
    parent_id: string | null; // 父级路由Id
    sort: number; // 排序
    status: string; // 路由状态
    permission: string; // 权限标识
    menu_type: string; // 菜单类型
    founder: string;// 创建人
    create_time: string;// 创建时间
    update_last_time: string;// 最后一次修改时间
    children?: menuTreeItem[]
}
export type getMenuTreeResultModel = menuTreeItem[];

/**
 * @description: 保存路由表单参数
 * @param {*}
 * @return {*}
 */
export interface menuSaveParams {
    menu_id?: string; //路由id
    path?: string; // 路由url
    component?: any; // vue文件路径
    redirect?: string; // 重定向地址
    title: string; // 菜单名称
    ignore_keep_alive?: string; // 是否忽略KeepAlive缓存
    affix?: string; // 是否固定标签
    icon?: string; // 图标，也是菜单图标
    frame_src?: string; // 内嵌iframe的地址
    transition_name?: string; // 指定该路由切换的动画名
    hide_childrenIn_menu?: string; // 隐藏所有子菜单
    hide_tab?: string; // 当前路由不在标签页显示
    hide_menu?: string; // 当前路由不在菜单显示
    parent_id?: string; // 父级路由Id
    sort: number; // 排序
    status: string; // 路由状态
    permission?: string; // 权限标识
    menu_type: string; // 菜单类型
}

/**
 * @description: 删除路由参数
 * @param {*}
 * @return {*}
 */
export interface menuDelParams {
    ids: string; // id集合,用,分割
    permission: string; //权限标识
}

/**
 * @description: 路由数据返回格式
 * @param {*}
 * @return {*}
 */
export interface MenuListItem {
    menu_id: string; //路由id
    path: string; // 路由url
    component: any; // vue文件路径
    meta: RouteMeta; // 路由meta对象
    name: string; // 路由name
    redirect?: string; // 重定向地址
    children?: MenuListItem[]; // 子路由
}
export type getMenuListResultModel = MenuListItem[];
