/*
 * @Author: Xie Mingwei
 * @Date: 2021-09-02 17:08:39
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-09-07 10:19:52
 * @Description:新闻公告模块类型注解
 */

/**
 * @description: 查询参数
 * @param {*}
 * @return {*}
 */
export interface newsSearchParams {
    current: number; // 页码
    pageSize: number; // 条数
    title?: string; // 标题
    type?: string; // 新闻类型
}

export interface getNewsResultModel {
    news_id: string; //唯一id
    author: string; // 发布作者id
    author_name: string;// 发布作者中文名
    title: string; // 标题
    content: string; // 内容
    type: string; // 新闻类型
    create_time: string; // 创建时间
    update_last_time: string; // 最后一次更新时间
    status: string; // 状态
    placed_top: string; // 是否置顶
    already: number; // 是否已读
    avatar: string; // 发布者头像
}

// 保存表单参数
export interface newsSaveParams {
    title: string; // 标题
    type: string; // 新闻类型
    status: string; // 状态
    placed_top: string; // 是否置顶
    content: string; //内容
}

export interface newsDelParams {
    ids: string; // id集合
    title: string; // 标题
}

export interface newsPlacedTopParams {
    news_id: string; // 唯一id
    placed_top: string; // 是否置顶
    title: string; // 标题
}

export interface alreadyParams {
    news_id: string; // 唯一id
    title: string; // 标题
}
