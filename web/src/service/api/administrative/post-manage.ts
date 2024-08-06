/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-16 16:28:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-06 17:51:10
 * @Description: 岗位管理模块接口
 */

import { request } from "@/service/request";

const baseURL = '/administrative/post-manage'

/**
 * @description: 获取岗位管理列表
 * @param {Api.Administrative.PostManageSearchParams} params
 */
export const getPostList = (
  params?: Api.Administrative.PostManageSearchParams,
) =>
  request<Api.Common.PaginatingQueryRecord<Api.Administrative.PostManage>>({
    url: baseURL,
    params,
  });

/**
 * @description: 查询岗位详情
 * @param {Pick<Api.Common.CommonRecord,'id'>} params
 */
export const getPostDetail = (params: Pick<Api.Common.CommonRecord, "id">) =>
  request<Api.Administrative.PostManage>({ url: baseURL, params });

/**
 * @description: 创建岗位
 * @param {Api.Administrative.SavePostManage} body
 */
export const createPost = (body: Api.Administrative.SavePostManage) =>
  request<Api.Administrative.PostManage>({
    url: baseURL,
    method: "post",
    data: body,
  });

/**
 * @description: 更新岗位
 * @param {Api.Administrative.SavePostManage} body
 */
export const updatePost = ({
  id,
  ...body
}: Api.Administrative.SavePostManage) =>
  request<Api.Administrative.PostManage>({
    url: `${baseURL}/${id}`,
    method: "patch",
    data: body,
  });

/**
 * @description: 删除岗位
 * @param {Pick<Api.Common.CommonRecord, 'id'>} body
 */
export const delPost = ({ id }: Pick<Api.Common.CommonRecord, "id">) =>
  request<Api.Administrative.PostManage>({
    url: `${baseURL}/${id}`,
    method: "delete",
  });
