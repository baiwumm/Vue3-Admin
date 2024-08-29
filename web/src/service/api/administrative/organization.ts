/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 09:16:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-06 17:50:38
 * @Description: 组织管理模块接口
 */
import { request } from '@/service/request';

const baseURL = '/administrative/organazation';

/**
 * @param {Api.Administrative.OrganizationSearchParams} params
 * @description: 获取组织管理列表
 */
export const getOrganazationList = (params?: Api.Administrative.OrganizationSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.Administrative.Organization>>({
    url: baseURL,
    params,
  });

/**
 * @param {Pick<Api.Common.CommonRecord, 'id'>} params
 * @description: 查询组织详情
 */
export const getOrganazationDetail = (params: Pick<Api.Common.CommonRecord, 'id'>) =>
  request<Api.Administrative.Organization>({ url: baseURL, params });

/**
 * @param {Api.Administrative.SaveOrganization} body
 * @description: 创建组织
 */
export const createOrganazation = (body: Api.Administrative.SaveOrganization) =>
  request<Api.Administrative.Organization>({
    url: baseURL,
    method: 'post',
    data: body,
  });

/**
 * @param {Api.Administrative.SaveOrganization} body
 * @description: 更新组织
 */
export const updateOrganazation = ({ id, ...body }: Api.Administrative.SaveOrganization) =>
  request<Api.Administrative.Organization>({
    url: `${baseURL}/${id}`,
    method: 'put',
    data: body,
  });

/**
 * @param {Pick<Api.Common.CommonRecord, 'id'>} body
 * @description: 删除组织
 */
export const delOrganazation = ({ id }: Pick<Api.Common.CommonRecord, 'id'>) =>
  request<Api.Administrative.Organization>({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });
