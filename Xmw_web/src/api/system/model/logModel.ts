/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-03 16:56:38
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-04 17:59:20
 * @Description:操作日志模块参数类型注解
 */
/**
 * @description: 查询参数
 * @param {*}
 * @return {*}
 */
export interface logSearchParams {
    current: number; // 页码
    pageSize: number; // 条数
}
export interface getLogResultModel {
    log_id: string; //日志id
    user_id: string; // 用户id
    content: string; // 操作内容
    ip: string; // 客户端ip
    path: string; // 页面路径
    user_agent: string; // 用户代理
    create_time: string; // 创建时间
    api_url: string; // 请求地址
}
