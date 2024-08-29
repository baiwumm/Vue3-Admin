/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-08 09:48:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-09 18:17:50
 * @Description: 操作日志管理模块接口
 */
import { request } from '@/service/request';

const baseURL = '/system/operation-log';

/**
 * @param {Api.SystemManage.OperationLogSearchParams} params
 * @description: 获取操作日志列表
 */
export const getOperationLogList = (params?: Api.SystemManage.OperationLogSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.OperationLog>>({
    url: baseURL,
    params,
  });

/**
 * @param {Api.SystemManage.OperationLogDelParams} body
 * @description: 删除操作日志
 */
export const delOperationLog = (body: Api.SystemManage.OperationLogDelParams) =>
  request<Api.SystemManage.OperationLog>({
    url: baseURL,
    method: 'delete',
    data: body,
  });
