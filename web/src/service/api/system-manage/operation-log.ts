/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-08 09:48:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-08 14:41:50
 * @Description: 操作日志管理模块接口
 */
import { request } from "@/service/request";

const baseURL = '/system/operation-log'

/**
 * @description: 获取操作日志列表
 * @param {Api.SystemManage.OperationLogSearchParams} params
 */
export const getOperationLogList = (params?: Api.SystemManage.OperationLogSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.OperationLog>>({
    url: baseURL,
    params,
  });