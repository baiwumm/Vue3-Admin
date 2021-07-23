import type { RouteMeta } from 'vue-router';

/**
 * @description: 获取路由树结构参数
 */
export interface menuTreeParams {
    title?: string; // 菜单名称
    status?: string; // 路由状态
}

/**
 * @description: 路由树结构返回格式
 */
export interface menuTreeItem {
    menuId: string; //路由id
    path: string; // 路由url
    component: any; // vue文件路径
    redirect: string; // 重定向地址
    title: string; // 菜单名称
    ignoreKeepAlive: string; // 是否忽略KeepAlive缓存
    affix: string; // 是否固定标签
    icon: string; // 图标，也是菜单图标
    frameSrc: string; // 内嵌iframe的地址
    transitionName: string; // 指定该路由切换的动画名
    hideChildrenInMenu: string; // 隐藏所有子菜单
    hideTab: string; // 当前路由不在标签页显示
    hideMenu: string; // 当前路由不在菜单显示
    parentId: string; // 父级路由Id
    sort: number; // 排序
    status: string; // 路由状态
    permission: string; // 权限标识
    menuType: string; // 菜单类型
    founder: string;// 创建人
    createTime: string;// 创建时间
    updateLastTime: string;// 最后一次创建时间
    children?: menuTreeItem[]
}
export type getMenuTreeResultModel = menuTreeItem[];

/**
 * @description: 保存路由表单参数
 */
export interface menuSaveParams {
    menuId?: string; //路由id
    path?: string; // 路由url
    component?: any; // vue文件路径
    redirect?: string; // 重定向地址
    title: string; // 菜单名称
    ignoreKeepAlive: string; // 是否忽略KeepAlive缓存
    affix: string; // 是否固定标签
    icon: string; // 图标，也是菜单图标
    frameSrc?: string; // 内嵌iframe的地址
    transitionName?: string; // 指定该路由切换的动画名
    hideChildrenInMenu?: string; // 隐藏所有子菜单
    hideTab?: string; // 当前路由不在标签页显示
    hideMenu?: string; // 当前路由不在菜单显示
    parentId?: string; // 父级路由Id
    sort: number; // 排序
    status: string; // 路由状态
    permission?: string; // 权限标识
    menuType: string; // 菜单类型
}

/**
 * @description: 删除路由参数
 */
export interface menuDelParams {
    ids: string; // id集合,用,分割
}

/**
 * @description: 路由数据返回格式
 */
export interface MenuListItem {
    menuId: string; //路由id
    path: string; // 路由url
    component: any; // vue文件路径
    meta: RouteMeta; // 路由meta对象
    name: string; // 路由name
    redirect?: string; // 重定向地址
    children?: MenuListItem[]; // 子路由
}
export type getMenuListResultModel = MenuListItem[];
