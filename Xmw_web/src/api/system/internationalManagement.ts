/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-03 16:55:01
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-05 15:28:01
 * @Description:国际化模块接口
 */

import { defHttp } from '/@/utils/http/axios';
import { interSearchParams, getinterResultModel, interDelParams, interSaveParams, interLangParams } from './model/interModel';

enum Api {
    getInternationalList = '/system/getInternationalList', // 获取国际化列表
    getInternationalLang = '/system/getInternationalLang', // 获取国际化语言
    internationaSave = '/system/internationaSave', // 新增和更新国际化
    internationalDel = '/system/internationalDel', // 删除国际化字段
}

export function getInternationalList(params?: interSearchParams) {
    return defHttp.get<getinterResultModel>({ url: Api.getInternationalList, params: params });
}

export function getInternationalLang(params?: interLangParams) {
    return defHttp.get({ url: Api.getInternationalLang, params: params });
}

export function internationaSave(params?: interSaveParams) {
    return defHttp.post({ url: Api.internationaSave, params: params });
}

export function internationalDel(params?: interDelParams) {
    return defHttp.post({ url: Api.internationalDel, params: params });
}
