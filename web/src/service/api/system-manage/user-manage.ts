/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 17:28:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-27 09:20:09
 * @Description: 用户管理模块接口
 */

import { request } from "@/service/request";

const baseURL = '/system/user-manage'

/**
 * @description: 获取用户管理列表
 * @param {Api.SystemManage.UserManageSearchParams} params
 */
export const getUserList = (params?: Api.SystemManage.UserManageSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.UserManage>>({
    url: baseURL,
    params,
  });

/**
 * @description: 查询用户详情
 * @param {Pick<Api.Common.CommonRecord,'id'>} params
 */
export const getUserDetail = (params: Pick<Api.Common.CommonRecord, "id">) =>
  request<Api.SystemManage.UserManage>({ url: baseURL, params });

/**
 * @description: 创建用户
 * @param {Api.SystemManage.SaveUserManage} body
 */
export const createUser = (body: Api.SystemManage.SaveUserManage) =>
  request<Api.SystemManage.UserManage>({
    url: baseURL,
    method: "post",
    data: body,
  });

/**
 * @description: 更新用户
 * @param {Api.SystemManage.SaveUserManage} body
 */
export const updateUser = ({ id, ...body }: Partial<Api.SystemManage.SaveUserManage>) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/${id}`,
    method: "put",
    data: body,
  });

/**
 * @description: 删除用户
 * @param {Api.Common.ColumnId} body
 */
export const delUser = ({ id }: Api.Common.ColumnId) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/${id}`,
    method: "delete",
  });

/**
* @description: 更新用户标签
* @param {Pick<Api.SystemManage.SaveUserManage,'tags'>} body
*/
export const updateUserTags = (body: Pick<Api.SystemManage.SaveUserManage, 'tags'>) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/updateUserTags`,
    method: "patch",
    data: body,
  });

/**
* @description: 更新用户密码
* @param {Api.SystemManage.ChangeUserPassword} body
*/
export const changePassword = (body: Api.SystemManage.ChangeUserPassword) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/changePassword`,
    method: "patch",
    data: body,
  });
