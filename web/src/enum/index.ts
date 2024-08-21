export enum SetupStoreId {
  App = 'app-store',
  Theme = 'theme-store',
  Auth = 'auth-store',
  Route = 'route-store',
  Tab = 'tab-store'
}

/**
 * @description: 操作类型
 */
export enum OPERATION_TYPE {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

/**
 * @description: 公共文案
 */
export enum UNIFORM_TEXT {
  NULL = '--',
}

/**
 * @description: 状态
 */
export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

/**
 * @description: 用户性别
 */
export enum SEX {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

/**
 * @description: 请求方法
 */
export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * @description: 菜单类型
 */
export enum MENU_TYPE {
  DIRECTORY = 'DIRECTORY', // 目录
  MENU = 'MENU', // 菜单
  BUTTON = 'BUTTON', // 按钮
}