import { request } from '../request';

/**
 * @description: 获取常量路由
 */
export function fetchGetConstantRoutes() {
  return request<Api.Route.MenuRoute[]>({ url: '/auth/getConstantRoutes' });
}

/**
 * @description: 获取用户路由
 */
export function fetchGetUserRoutes() {
  return request<Api.Route.UserRoute>({ url: '/auth/getUserRoutes' });
}

/**
 * @description: 判断路由是否存在
 * @param {string} name
 */
export function fetchIsRouteExist(name: string) {
  return request<boolean>({ url: '/auth/isRouteExist', params: { name } });
}
