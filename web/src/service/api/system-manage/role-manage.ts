/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-22 16:33:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 16:41:05
 * @Description: 角色管理模块接口
 */
import { request } from "@/service/request";

const baseURL = '/system/role-manage'

/**
 * @description: 获取角色管理列表
 * @param {Api.SystemManage.RoleManageSearchParams} params
 */
export const getRoleList = (params?: Api.SystemManage.RoleManageSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.RoleManage>>({
    url: baseURL,
    params,
  });

/**
* @description: 创建角色
* @param {Api.SystemManage.SaveRoleManage} body
*/
export const createRole = (body: Api.SystemManage.SaveRoleManage) =>
  request<Api.SystemManage.RoleManage>({
    url: baseURL,
    method: "post",
    data: body,
  });

/**
 * @description: 更新角色
 * @param {Api.SystemManage.SaveRoleManage} body
 */
export const updateRole = ({ id, ...body }: Api.SystemManage.SaveRoleManage) =>
  request<Api.SystemManage.RoleManage>({
    url: `${baseURL}/${id}`,
    method: "patch",
    data: body,
  });

/**
* @description: 删除角色
* @param {Api.Common.ColumnId} body
*/
export const delRole = ({ id }: Api.Common.ColumnId) =>
  request<Api.SystemManage.RoleManage>({
    url: `${baseURL}/${id}`,
    method: "delete",
  });