import dayjs from 'dayjs';

import { RESPONSE_CODE, RESPONSE_MSG } from '@/enums';

/**
 * @description: 统一返回体
 */
export const responseMessage = <T = any>(
  data,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): Api.Common.Response<T> => ({ data, msg, code, timestamp: dayjs().valueOf() });

/**
 * @description: 移除子节点未空数组的节点
 */
export const removeEmptyChildren = (tree) => {
  // 遍历数组中的每个节点
  tree.forEach((node) => {
    // 检查当前节点是否有children属性且该数组为空
    if (node.children && node.children.length === 0) {
      // 删除当前节点的children属性
      delete node.children;
    } else if (node.children) {
      // 如果children不为空，继续递归清理子节点中的空children
      removeEmptyChildren(node.children);
    }
  });
};
