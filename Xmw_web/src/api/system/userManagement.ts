import { defHttp } from '/@/utils/http/axios';

enum Api {
    getUserList = '/system/getUserList'
}

export function getUserList(params?: object) {
    return defHttp.get({ url: Api.getUserList, params: params });
}
