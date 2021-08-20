/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-20 11:43:25
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 13:57:00
 * @Description:定义接口返回参数类型注解，全局统一
 */
export interface resResultModel {
    resCode: number;
    resMsg: string;
    response: any;
}

/**
 * @description: 路由数据返回格式
 * @param {*}
 * @return {*}
 */
export interface MenuListItem {
    menu_id: string;
    path: string;
    component: string;
    redirect: string;
    parent_id: string;
    title: string;
    ignore_keep_alive: string;
    affix: string;
    icon: string;
    frame_src: any;
    transition_name: string;
    hide_childrenIn_menu: string;
    hide_tab: string;
    hide_menu: string;
}
