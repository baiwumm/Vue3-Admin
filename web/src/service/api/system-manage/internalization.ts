/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-15 11:06:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 09:05:30
 * @Description: 国际化模块接口
 */
import { request } from '@/service/request';

const baseURL = '/system/internalization';

/**
 * @param {Api.SystemManage.InternalizationSearchParams} params
 * @description: 获取国际化列表
 */
export const getInternalizationList = (params?: Api.SystemManage.InternalizationSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.Internalization>>({
    url: baseURL,
    params,
  });

/**
 * @param {Api.SystemManage.SaveInternalization} body
 * @description: 创建国际化
 */
export const createInternalization = (body: Api.SystemManage.SaveInternalization) =>
  request<Api.SystemManage.Internalization>({
    url: baseURL,
    method: 'post',
    data: body,
  });

/**
 * @param {Api.SystemManage.SaveInternalization} body
 * @description: 更新国际化
 */
export const updateInternalization = ({ id, ...body }: Api.SystemManage.SaveInternalization) =>
  request<Api.SystemManage.Internalization>({
    url: `${baseURL}/${id}`,
    method: 'put',
    data: body,
  });

/**
 * @param {Api.Common.ColumnId} body
 * @description: 删除国际化
 */
export const delInternalization = ({ id }: Api.Common.ColumnId) =>
  request<Api.SystemManage.Internalization>({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });
