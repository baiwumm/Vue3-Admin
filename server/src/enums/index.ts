/**
 * @description: 响应码
 */
export enum RESPONSE_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 请求成功
  BAD_REQUEST = 400, // 请求错误
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 资源未找到
  INTERNAL_SERVER_ERROR = 500, // 服务器错误
}

/**
 * @description: 请求提示语
 */
export enum RESPONSE_MSG {
  SUCCESS = '请求成功',
  FAILURE = '请求失败',
  ERROR = '服务器错误',
}

/**
 * @description: 国际化语言
 */
export enum LOCALES {
  zhCN = 'zh-CN', // 中文
  enUS = 'en-US', // 英文
  jaJP = 'ja-JP', // 日文
  zhTW = 'zh-TW', // 繁体中文
}

/**
 * @description: 服务器推送事件
 */
export enum EVENTBUS_TYPE {
  MESSAGE_CREATE = 'message_create', // 消息创建
}
