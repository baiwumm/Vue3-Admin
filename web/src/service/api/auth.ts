import { request } from "../request";

/**
 * @description: 用户登录
 * @param {Api.Auth.LoginParams} params
 */
export const fetchLogin = (params: Api.Auth.LoginParams) =>
  request<Api.Auth.LoginToken>({
    url: "/auth/login",
    method: "post",
    data: params,
  });

/**
 * @description: 获取用户信息
 */
export const fetchGetUserInfo = () =>
  request<Api.Auth.UserInfo>({ url: "/auth/getUserInfo" });

/**
 * @description: 获取图形验证码
 */
export const getCaptcha = () => request({ url: "/auth/captcha" });

/**
 * @description: 用户注销登录
 */
export const fetchLogout = () =>
  request({
    url: "/auth/logout",
    method: "post",
  });
