/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-19 17:07:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 09:05:39
 * @Description: 菜单管理模块接口
 */
import { request } from "@/service/request";

const baseURL = '/system/menu-manage'

/**
 * @description: 获取菜单管理列表
 * @param {Api.SystemManage.MenuManageSearchParams} params
 */
export const getMenuList = (
  params?: Api.SystemManage.MenuManageSearchParams,
) =>
  request<Api.Common.PaginatingQueryRecord<Api.SystemManage.MenuManage>>({
    url: baseURL,
    params,
  });

/**
* @description: 创建菜单
* @param {Api.SystemManage.SaveMenuManage} body
*/
export const createMenu = (body: Api.SystemManage.SaveMenuManage) =>
  request<Api.SystemManage.MenuManage>({
    url: baseURL,
    method: "post",
    data: body,
  });

/**
 * @description: 更新岗位
 * @param {Api.SystemManage.SaveMenuManage} body
 */
export const updateMenu = ({
  id,
  ...body
}: Api.SystemManage.SaveMenuManage) =>
  request<Api.SystemManage.MenuManage>({
    url: `${baseURL}/${id}`,
    method: "put",
    data: body,
  });

/**
* @description: 删除菜单
* @param {Pick<Api.Common.CommonRecord, 'id'>} body
*/
export const delMenu = ({ id }: Pick<Api.Common.CommonRecord, "id">) =>
  request<Api.SystemManage.MenuManage>({
    url: `${baseURL}/${id}`,
    method: "delete",
  });