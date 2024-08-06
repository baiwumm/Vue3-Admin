/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 17:28:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-06 17:51:42
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
export const updateUser = ({ id, ...body }: Api.SystemManage.SaveUserManage) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/${id}`,
    method: "patch",
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
