import { request } from '../request';

/**
 * @param {Api.Auth.LoginParams} params
 * @description: 用户登录
 */
export const fetchLogin = (params: Api.Auth.LoginParams) =>
  request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: params,
  });

/** @description: 获取用户信息 */
export const fetchGetUserInfo = () => request<Api.Auth.UserInfo>({ url: '/auth/getUserInfo' });

/** @description: 获取图形验证码 */
export const getCaptcha = () => request({ url: '/auth/captcha' });

/** @description: 用户注销登录 */
export const fetchLogout = () =>
  request({
    url: '/auth/logout',
    method: 'post',
  });

/** @description: 国际化层级数据 */
export const getLocales = () => request({ url: '/auth/getLocales' });

/** @description: 获取掘金文章 */
export const getJuejinList = (params: Api.Auth.JuejinParams) =>
  request({ url: '/auth/juejin', method: 'post', data: params });

/** @description: 上传图片 */
export const uploadSingleFile = (params: FormData) =>
  request({
    url: '/upload/single-file',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
