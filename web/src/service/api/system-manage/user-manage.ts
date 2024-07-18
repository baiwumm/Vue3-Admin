/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 17:28:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-18 17:48:28
 * @Description: 用户管理模块接口
 */


import { request } from '@/service/request';

/**
 * @description: 获取用户管理列表
 * @param {Api.SystemManage.UserManageSearchParams} params
 */
export function getUserList(params?: Api.SystemManage.UserManageSearchParams) {
  return request<Api.Common.PaginatingQueryRecord<Api.SystemManage.UserManage>>({ url: '/user-manage', params });
}

/**
 * @description: 查询用户详情
 * @param {Pick<Api.Common.CommonRecord,'id'>} params
 */
export function getUserDetail(params: Pick<Api.Common.CommonRecord, 'id'>) {
  return request<Api.SystemManage.UserManage>({ url: '/user-manage', params });
}

/**
 * @description: 创建用户
 * @param {Api.SystemManage.SaveUserManage} body
 */
export function createUser(body: Api.SystemManage.SaveUserManage) {
  return request<Api.SystemManage.UserManage>({ url: '/user-manage', method: 'post', data: body });
}

/**
 * @description: 更新用户
 * @param {Api.SystemManage.SaveUserManage} body
 */
export function updateUser({ id, ...body }: Api.SystemManage.SaveUserManage) {
  return request<Api.SystemManage.UserManage>({ url: `/user-manage/${id}`, method: 'patch', data: body });
}

/**
 * @description: 删除用户
 * @param {Api.Common.ColumnId} body
 */
export function delUser({ id }: Api.Common.ColumnId) {
  return request<Api.SystemManage.UserManage>({ url: `/user-manage/${id}`, method: 'delete' });
}