/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-02 16:17:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-03 16:16:23
 * @Description: 消息公告模块接口
 */
import { request } from '@/service/request';

const baseURL = '/administrative/message';

/**
 * @param {Api.SystemManage.MessageSearchParams} params
 * @description: 获取消息公告列表
 */
export const getMessageList = (params?: Api.Administrative.MessageSearchParams) =>
  request<Api.Common.PaginatingQueryRecord<Api.Administrative.Message>>({
    url: baseURL,
    params,
  });

/**
 * @param {Pick<Api.Common.CommonRecord, 'id'>} params
 * @description: 查询组织详情
 */
export const getMessageDetail = (params: Pick<Api.Common.CommonRecord, 'id'>) =>
  request<Api.Administrative.Message>({ url: baseURL, params });

/**
 * @param {Api.Administrative.SaveMessage} body
 * @description: 创建消息公告
 */
export const createMessage = (body: Api.Administrative.SaveMessage) =>
  request<Api.Administrative.Message>({
    url: baseURL,
    method: 'post',
    data: body,
  });

/**
 * @param {Api.Administrative.SaveMessage} body
 * @description: 更新消息公告
 */
export const updateMessage = ({ id, ...body }: Api.Administrative.SaveMessage) =>
  request<Api.Administrative.Message>({
    url: `${baseURL}/${id}`,
    method: 'put',
    data: body,
  });

/**
 * @param {Pick<Api.Common.CommonRecord, 'id'>} body
 * @description: 删除消息公告
 */
export const delMessage = ({ id }: Pick<Api.Common.CommonRecord, 'id'>) =>
  request<Api.Administrative.Message>({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });

/**
 * @param {string} id
 * @description: 修改置顶状态
 */
export const changePinned = (id: string) =>
  request<Api.Administrative.Message>({
    url: `${baseURL}/${id}`,
    method: 'patch',
  });
