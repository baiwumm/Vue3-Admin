/*
 * @Description: 字典管理模块接口
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-16 17:46:42
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-30 11:28:57
 */
import { defHttp } from '/@/utils/http/axios';
import { dictSearchParams, getDictResultModel, dictSaveParams, dictDelParams, dictModelParams, dictModelResult } from './model/dictModel';

enum Api {
    getDictionaryList = '/system/getDictionaryList', // 获取字典列表
    dictionarySave = '/system/dictionarySave', // 新增和更新字典
    dictionaryDel = '/system/dictionaryDel', // 删除字典
    dictionaryModel = '/system/dictionaryModel', // 查询字典键值集合
}

export function getDictionaryList(params?: dictSearchParams) {
    return defHttp.get<getDictResultModel>({ url: Api.getDictionaryList, params: params });
}

export function dictionarySave(params: dictSaveParams) {
    return defHttp.post({ url: Api.dictionarySave, params: params });
}

export function dictionaryDel(params: dictDelParams) {
    return defHttp.post({ url: Api.dictionaryDel, params: params });
}

export function dictionaryModel(params: dictModelParams) {
    return defHttp.get<dictModelResult>({ url: Api.dictionaryModel, params: params });
}
