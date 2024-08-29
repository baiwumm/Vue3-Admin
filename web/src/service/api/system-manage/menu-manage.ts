/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-19 17:07:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 09:05:39
 * @Description: 菜单管理模块接口
 */
import { request } from '@/service/request';

const baseURL = '/system/menu-manage';

/**
 * @param {Api.SystemManage.MenuManageSearchParams} params
 * @description: 获取菜单管理列表
 */
export const getMenuList = (params?: Api.SystemManage.MenuManageSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.MenuManage>>({
    url: baseURL,
    params,
  });

/**
 * @param {Api.SystemManage.SaveMenuManage} body
 * @description: 创建菜单
 */
export const createMenu = (body: Api.SystemManage.SaveMenuManage) =>
  request<Api.SystemManage.MenuManage>({
    url: baseURL,
    method: 'post',
    data: body,
  });

/**
 * @param {Api.SystemManage.SaveMenuManage} body
 * @description: 更新岗位
 */
export const updateMenu = ({ id, ...body }: Api.SystemManage.SaveMenuManage) =>
  request<Api.SystemManage.MenuManage>({
    url: `${baseURL}/${id}`,
    method: 'put',
    data: body,
  });

/**
 * @param {Pick<Api.Common.CommonRecord, 'id'>} body
 * @description: 删除菜单
 */
export const delMenu = ({ id }: Pick<Api.Common.CommonRecord, 'id'>) =>
  request<Api.SystemManage.MenuManage>({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });
