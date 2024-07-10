/**
 * @description: 全局响应体
 */
export type Response<T = any> = {
  code: number; // 状态码
  data?: T; // 业务数据
  msg: string; // 响应信息
  timestamp: number; // 时间戳
};

/**
 * @description: 分页数据
 */
export type PageResponse<T> = {
  total: number;
  list: T[];
};
