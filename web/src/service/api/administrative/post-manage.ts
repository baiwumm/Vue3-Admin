/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-16 16:28:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-17 15:42:46
 * @Description: 岗位管理模块接口
 */

import { request } from '@/service/request';

/**
 * @description: 获取岗位管理列表
 * @param {Api.Administrative.PostManageSearchParams} params
 */
export function getPostList(params?: Api.Administrative.PostManageSearchParams) {
  return request<Api.Common.PaginatingQueryRecord<Api.Administrative.PostManage>>({ url: '/post-manage', params });
}

/**
 * @description: 查询岗位详情
 * @param {Pick<Api.Common.CommonRecord,'id'>} params
 */
export function getPostDetail(params: Pick<Api.Common.CommonRecord, 'id'>) {
  return request<Api.Administrative.PostManage>({ url: '/post-manage', params });
}

/**
 * @description: 创建岗位
 * @param {Api.Administrative.SavePostManage} body
 */
export function createPost(body: Api.Administrative.SavePostManage) {
  return request<Api.Administrative.PostManage>({ url: '/post-manage', method: 'post', data: body });
}

/**
 * @description: 更新岗位
 * @param {Api.Administrative.SavePostManage} body
 */
export function updatePost({ id, ...body }: Api.Administrative.SavePostManage) {
  return request<Api.Administrative.PostManage>({ url: `/post-manage/${id}`, method: 'patch', data: body });
}

/**
 * @description: 删除岗位
 * @param {Pick<Api.Common.CommonRecord, 'id'>} body
 */
export function delPost({ id }: Pick<Api.Common.CommonRecord, 'id'>) {
  return request<Api.Administrative.PostManage>({ url: `/post-manage/${id}`, method: 'delete' });
}