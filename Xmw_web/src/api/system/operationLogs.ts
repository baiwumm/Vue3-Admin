/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-03 16:55:01
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-04 18:00:04
 * @Description:操作日志模块接口
 */

import { defHttp } from '/@/utils/http/axios';
import { logSearchParams, getLogResultModel } from './model/logModel';

enum Api {
    getLogList = '/system/getLogList', // 获取日志列表
}

export function getLogList(params?: logSearchParams) {
    return defHttp.get<getLogResultModel>({ url: Api.getLogList, params: params });
}
