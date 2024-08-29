/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-16 16:28:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 09:05:14
 * @Description: 岗位管理模块接口
 */

import { request } from '@/service/request';

const baseURL = '/administrative/post-manage';

/**
 * @param {Api.Administrative.PostManageSearchParams} params
 * @description: 获取岗位管理列表
 */
export const getPostList = (params?: Api.Administrative.PostManageSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.Administrative.PostManage>>({
    url: baseURL,
    params,
  });

/**
 * @param {Pick<Api.Common.CommonRecord, 'id'>} params
 * @description: 查询岗位详情
 */
export const getPostDetail = (params: Pick<Api.Common.CommonRecord, 'id'>) =>
  request<Api.Administrative.PostManage>({ url: baseURL, params });

/**
 * @param {Api.Administrative.SavePostManage} body
 * @description: 创建岗位
 */
export const createPost = (body: Api.Administrative.SavePostManage) =>
  request<Api.Administrative.PostManage>({
    url: baseURL,
    method: 'post',
    data: body,
  });

/**
 * @param {Api.Administrative.SavePostManage} body
 * @description: 更新岗位
 */
export const updatePost = ({ id, ...body }: Api.Administrative.SavePostManage) =>
  request<Api.Administrative.PostManage>({
    url: `${baseURL}/${id}`,
    method: 'put',
    data: body,
  });

/**
 * @param {Pick<Api.Common.CommonRecord, 'id'>} body
 * @description: 删除岗位
 */
export const delPost = ({ id }: Pick<Api.Common.CommonRecord, 'id'>) =>
  request<Api.Administrative.PostManage>({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });
