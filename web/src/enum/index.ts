/** @description: 仓库状态 id */
export enum SetupStoreId {
  App = 'app-store',
  Theme = 'theme-store',
  Auth = 'auth-store',
  Route = 'route-store',
  Tab = 'tab-store',
}

/** @description: 操作类型 */
export enum OPERATION_TYPE {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

/** @description: 公共文案 */
export enum UNIFORM_TEXT {
  NULL = '--',
}

/** @description: 状态 */
export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

/** @description: 用户性别 */
export enum SEX {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

/** @description: 请求方法 */
export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/** @description: 菜单类型 */
export enum MENU_TYPE {
  DIRECTORY = 'DIRECTORY', // 目录
  MENU = 'MENU', // 菜单
  BUTTON = 'BUTTON', // 按钮
}

/** @description: 个人中心 - 安全设置 */
export enum PERSONAL_SETTING {
  BASIC_SETTING = 'basicSetting', // 基本设置
  SECURITY_SETTING = 'securitySetting', // 安全设置
  CHANGE_PASSWORD = 'changePassword', // 修改密码
}
