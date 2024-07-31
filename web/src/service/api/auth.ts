import { request } from '../request';

/**
 * @description: 用户登录
 * @param {Api.Auth.LoginParams} params
 */
export const fetchLogin = (params: Api.Auth.LoginParams) => request<Api.Auth.LoginToken>({
  url: '/auth/login',
  method: 'post',
  data: params
});

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/getUserInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}

/**
 * @description: 获取图形验证码
 */
export const getCaptcha = () => request({ url: '/auth/captcha' });