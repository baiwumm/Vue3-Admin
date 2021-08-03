/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-03 16:55:01
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-03 16:57:42
 * @Description:操作日志模块接口
 */

import { defHttp } from '/@/utils/http/axios';
import { getLogResultModel } from './model/logModel';

enum Api {
    getLogList = '/system/getLogList', // 获取日志列表
}

export function getLogList() {
    return defHttp.get<getLogResultModel>({ url: Api.getLogList });
}
