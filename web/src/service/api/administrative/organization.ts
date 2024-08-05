/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 09:16:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-11 18:05:16
 * @Description: 组织管理模块接口
 */
import { request } from "@/service/request";

/**
 * @description: 获取组织管理列表
 * @param {Api.Administrative.OrganizationSearchParams} params
 */
export const getOrganazationList = (
  params?: Api.Administrative.OrganizationSearchParams,
) =>
  request<Api.Common.PaginatingQueryRecord<Api.Administrative.Organization>>({
    url: "/organazation",
    params,
  });

/**
 * @description: 查询组织详情
 * @param {Pick<Api.Common.CommonRecord,'id'>} params
 */
export const getOrganazationDetail = (
  params: Pick<Api.Common.CommonRecord, "id">,
) => request<Api.Administrative.Organization>({ url: "/organazation", params });

/**
 * @description: 创建组织
 * @param {Api.Administrative.SaveOrganization} body
 */
export const createOrganazation = (body: Api.Administrative.SaveOrganization) =>
  request<Api.Administrative.Organization>({
    url: "/organazation",
    method: "post",
    data: body,
  });

/**
 * @description: 更新组织
 * @param {Api.Administrative.SaveOrganization} body
 */
export const updateOrganazation = ({
  id,
  ...body
}: Api.Administrative.SaveOrganization) =>
  request<Api.Administrative.Organization>({
    url: `/organazation/${id}`,
    method: "patch",
    data: body,
  });

/**
 * @description: 删除组织
 * @param {Pick<Api.Common.CommonRecord, 'id'>} body
 */
export const delOrganazation = ({ id }: Pick<Api.Common.CommonRecord, "id">) =>
  request<Api.Administrative.Organization>({
    url: `/organazation/${id}`,
    method: "delete",
  });
