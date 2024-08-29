/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-22 16:33:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 09:05:51
 * @Description: 角色管理模块接口
 */
import { request } from '@/service/request';

const baseURL = '/system/role-manage';

/**
 * @param {Api.SystemManage.RoleManageSearchParams} params
 * @description: 获取角色管理列表
 */
export const getRoleList = (params?: Api.SystemManage.RoleManageSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.RoleManage>>({
    url: baseURL,
    params,
  });

/**
 * @param {Api.SystemManage.SaveRoleManage} body
 * @description: 创建角色
 */
export const createRole = (body: Api.SystemManage.SaveRoleManage) =>
  request<Api.SystemManage.RoleManage>({
    url: baseURL,
    method: 'post',
    data: body,
  });

/**
 * @param {Api.SystemManage.SaveRoleManage} body
 * @description: 更新角色
 */
export const updateRole = ({ id, ...body }: Api.SystemManage.SaveRoleManage) =>
  request<Api.SystemManage.RoleManage>({
    url: `${baseURL}/${id}`,
    method: 'put',
    data: body,
  });

/**
 * @param {Api.Common.ColumnId} body
 * @description: 删除角色
 */
export const delRole = ({ id }: Api.Common.ColumnId) =>
  request<Api.SystemManage.RoleManage>({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });
