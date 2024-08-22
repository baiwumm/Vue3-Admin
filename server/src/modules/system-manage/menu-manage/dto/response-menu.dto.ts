/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-19 16:34:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:24:14
 * @Description: 响应体
 */
import { ApiProperty } from '@nestjs/swagger';
import type { Menu } from '@prisma/client';

import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 菜单管理列表响应体结构 Dto
 */
export class ResponseMenuDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: {
      records: [
        {
          id: '8f16a2cd-b613-4419-bfa5-996f16beaa6a',
          title: '首页',
          type: 'MENU',
          parentId: null,
          name: 'home',
          path: '/home',
          component: 'layout.base$view.home',
          meta: {
            icon: 'mdi:monitor-dashboard',
            order: 1,
            title: 'home',
            i18nKey: 'route.home',
          },
          sort: 1,
          permission: null,
          createdAt: '2024-08-19T09:05:42.591Z',
          updatedAt: '2024-08-19T09:05:42.591Z',
        },
      ],
    },
  })
  data: Menu[];
}

/**
 * @description: 创建/更新/删除菜单数据 Dto
 */
export class ResponseSaveMenuDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      id: '8f16a2cd-b613-4419-bfa5-996f16beaa6a',
      title: '首页',
      type: 'MENU',
      parentId: null,
      name: 'home',
      path: '/home',
      component: 'layout.base$view.home',
      meta: {
        icon: 'mdi:monitor-dashboard',
        order: 1,
        title: 'home',
        i18nKey: 'route.home',
      },
      sort: 1,
      permission: null,
      createdAt: '2024-08-19T09:05:42.591Z',
      updatedAt: '2024-08-19T09:05:42.591Z',
    },
  })
  data: Menu;
}
