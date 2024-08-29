/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 17:28:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-27 09:20:09
 * @Description: 用户管理模块接口
 */

import { request } from '@/service/request';

const baseURL = '/system/user-manage';

/**
 * @param {Api.SystemManage.UserManageSearchParams} params
 * @description: 获取用户管理列表
 */
export const getUserList = (params?: Api.SystemManage.UserManageSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.UserManage>>({
    url: baseURL,
    params,
  });

/**
 * @param {Pick<Api.Common.CommonRecord, 'id'>} params
 * @description: 查询用户详情
 */
export const getUserDetail = (params: Pick<Api.Common.CommonRecord, 'id'>) =>
  request<Api.SystemManage.UserManage>({ url: baseURL, params });

/**
 * @param {Api.SystemManage.SaveUserManage} body
 * @description: 创建用户
 */
export const createUser = (body: Api.SystemManage.SaveUserManage) =>
  request<Api.SystemManage.UserManage>({
    url: baseURL,
    method: 'post',
    data: body,
  });

/**
 * @param {Api.SystemManage.SaveUserManage} body
 * @description: 更新用户
 */
export const updateUser = ({ id, ...body }: Partial<Api.SystemManage.SaveUserManage>) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/${id}`,
    method: 'put',
    data: body,
  });

/**
 * @param {Api.Common.ColumnId} body
 * @description: 删除用户
 */
export const delUser = ({ id }: Api.Common.ColumnId) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });

/**
 * @param {Pick<Api.SystemManage.SaveUserManage, 'tags'>} body
 * @description: 更新用户标签
 */
export const updateUserTags = (body: Pick<Api.SystemManage.SaveUserManage, 'tags'>) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/updateUserTags`,
    method: 'patch',
    data: body,
  });

/**
 * @param {Api.SystemManage.ChangeUserPassword} body
 * @description: 更新用户密码
 */
export const changePassword = (body: Api.SystemManage.ChangeUserPassword) =>
  request<Api.SystemManage.UserManage>({
    url: `${baseURL}/changePassword`,
    method: 'patch',
    data: body,
  });
