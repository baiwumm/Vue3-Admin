import { request } from '../request';

/** @description: 获取常量路由 */
export const fetchGetConstantRoutes = () => request<Api.Route.MenuRoute[]>({ url: '/auth/getConstantRoutes' });

/** @description: 获取用户路由 */
export const fetchGetUserRoutes = () => request<Api.Route.UserRoute>({ url: '/auth/getUserRoutes' });

/**
 * @param {string} name
 * @description: 判断路由是否存在
 */
export const fetchIsRouteExist = (name: string) => request<boolean>({ url: '/auth/isRouteExist', params: { name } });

/** @description: 获取角色权限路由 */
export const fetchRoleRoutes = () => request<Api.SystemManage.MenuManage[]>({ url: '/auth/getRoleRoutes' });
