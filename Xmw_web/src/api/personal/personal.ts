/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-10 17:47:03
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-11 16:06:24
 * @Description:个人中心模块接口
 */

import { defHttp } from '/@/utils/http/axios';
import { tagParams, pwdParams } from './model/perModel';
import { UploadFileParams } from '/#/axios';
enum Api {
    changeUserTag = '/personal/changeUserTag', // 修改用户标签
    changeUserPassword = '/personal/changeUserPassword', // 修改用户密码
    changeUserAvatar = '/basic-api/personal/changeUserAvatar', // 修改用户头像
}

export function changeUserTag(params: tagParams) {
    return defHttp.post({ url: Api.changeUserTag, params: params });
}

export function changeUserPassword(params: pwdParams) {
    return defHttp.post({ url: Api.changeUserPassword, params: params });
}

export function changeUserAvatar(params: UploadFileParams, onUploadProgress: (progressEvent: ProgressEvent) => void) {
    return defHttp.uploadFile(
        {
            url: Api.changeUserAvatar,
            onUploadProgress,
        },
        params
    );
}
