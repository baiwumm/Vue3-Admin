import dayjs from 'dayjs';
import * as fs from 'fs';

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
 * @description: 将扁平数据转换为树形结构
 */
type TreeNode<T> = T & { children?: TreeNode<T>[] };
export const convertFlatDataToTree = <T extends { id: any; parentId?: any }>(
  flatData: T[],
  rootId?: any,
): TreeNode<T>[] => {
  const map: Record<any, TreeNode<T>> = {};
  const roots: TreeNode<T>[] = [];

  // 将所有节点添加到 map 中，以 id 作为 key
  flatData.forEach((node) => {
    map[node.id] = { ...node } as TreeNode<T>; // 明确类型转换为 TreeNode<T>
  });

  // 遍历所有节点，构建树形结构
  flatData.forEach((node) => {
    const parentNode = map[node.parentId ?? rootId];
    if (parentNode) {
      let children = parentNode.children;
      if (!children) {
        children = [];
        Object.assign(parentNode, { children }); // 添加 children 属性
      }
      children.push(map[node.id]);
    } else {
      // 如果找不到父节点，将当前节点作为根节点
      roots.push(map[node.id]);
    }
  });

  // 移除空的 children 属性
  const cleanUpEmptyChildren = (nodes: TreeNode<T>[]): TreeNode<T>[] =>
    nodes.map((node) => ({
      ...node,
      children: node.children && node.children.length > 0 ? cleanUpEmptyChildren(node.children) : undefined,
    }));

  return cleanUpEmptyChildren(roots);
};

/**
 * @description: 生成文件上传文件夹
 * @param {string} filePath
 */
export const checkDirAndCreate = (filePath: string): void => {
  const pathArr = filePath.split('/');
  let checkPath = '.';
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};
