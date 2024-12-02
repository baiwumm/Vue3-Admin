/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-11-26 17:41:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-02 09:15:18
 * @Description: 按钮权限
 */
/** @description: 智能行政 - 消息公告 */
export enum MESSAGE {
  ADD = 'administrative:message:add',
  EDIT = 'administrative:message:edit',
  DELETE = 'administrative:message:delete',
}

/** @description: 智能行政 - 组织管理 */
export enum ORGANIZATION {
  ADD = 'administrative:organization:add',
  EDIT = 'administrative:organization:edit',
  DELETE = 'administrative:organization:delete',
}

/** @description: 智能行政 - 岗位管理 */
export enum POST {
  ADD = 'administrative:post-manage:add',
  EDIT = 'administrative:post-manage:edit',
  DELETE = 'administrative:post-manage:delete',
}

/** @description: 系统管理 - 菜单管理 */
export enum USER {
  ADD = 'system-manage:user-manage:add',
  EDIT = 'system-manage:user-manage:edit',
  DELETE = 'system-manage:user-manage:delete',
}

/** @description: 系统管理 - 菜单管理 */
export enum MENU {
  ADD = 'system-manage:menu-manage:add',
  EDIT = 'system-manage:menu-manage:edit',
  DELETE = 'system-manage:menu-manage:delete',
}

/** @description: 系统管理 - 角色管理 */
export enum ROLE {
  ADD = 'system-manage:role-manage:add',
  EDIT = 'system-manage:role-manage:edit',
  DELETE = 'system-manage:role-manage:delete',
}

/** @description: 系统管理 - 国际化 */
export enum INTERNALIZATION {
  ADD = 'system-manage:internalization:add',
  EDIT = 'system-manage:internalization:edit',
  DELETE = 'system-manage:internalization:delete',
}

/** @description: 系统管理 - 操作日志 */
export enum OPERATION_LOG {
  DELETE = 'system-manage:operation-log:delete',
  BATCH_DELETE = 'system-manage:operation-log:batch-delete',
}
