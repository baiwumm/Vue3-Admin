/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-22 10:27:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-04 10:54:12
 * @Description: 角色管理
 */
import { ApiProperty } from '@nestjs/swagger';
import type { Permission, Role } from '@prisma/client';

import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 角色管理列表响应体结构 Dto
 */
export class ResponseRoleDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: {
      records: [
        {
          id: '6db049fe-c944-4680-b6dc-f9f40d6ad018',
          name: '超级管理员',
          code: 'Super Admin',
          description: '拥有系统全部权限',
          sort: 1,
          createdAt: '2024-08-22T07:03:04.323Z',
          updatedAt: '2024-08-22T07:03:04.323Z',
          permissions: [
            {
              id: 'd7226f8e-4d9f-405f-99b2-70889657dab2',
              roleId: '6db049fe-c944-4680-b6dc-f9f40d6ad018',
              menuId: 'dea4e038-592f-4532-ac86-c7de25a3416c',
              createdAt: '2024-08-22T07:03:04.323Z',
              role: {
                id: '6db049fe-c944-4680-b6dc-f9f40d6ad018',
                name: '超级管理员',
                code: 'Super Admin',
                description: '拥有系统全部权限',
                sort: 1,
                createdAt: '2024-08-22T07:03:04.323Z',
                updatedAt: '2024-08-22T07:03:04.323Z',
              },
              menu: {
                id: 'dea4e038-592f-4532-ac86-c7de25a3416c',
                title: '组织管理',
                type: 'MENU',
                parentId: '03404a66-50aa-4b21-8c93-9dcddaeffdb7',
                name: 'administrative_organization',
                path: '/administrative/organization',
                component: 'view.administrative_organization',
                meta: {
                  icon: 'ri:exchange-2-line',
                  order: 0,
                  title: 'administrative_organization',
                  i18nKey: 'route.administrative_organization',
                  constant: false,
                  multiTab: false,
                  keepAlive: true,
                  hideInMenu: false,
                },
                sort: 1,
                permission: null,
                createdAt: '2024-08-20T06:18:01.518Z',
                updatedAt: '2024-08-20T06:18:08.978Z',
              },
            },
            {
              id: '45fe6deb-b5bc-49f6-9a6e-54de6df4ac2b',
              roleId: '6db049fe-c944-4680-b6dc-f9f40d6ad018',
              menuId: '4fc642f4-18bb-4b18-980b-7e41e804720c',
              createdAt: '2024-08-22T07:03:04.323Z',
              role: {
                id: '6db049fe-c944-4680-b6dc-f9f40d6ad018',
                name: '超级管理员',
                code: 'Super Admin',
                description: '拥有系统全部权限',
                sort: 1,
                createdAt: '2024-08-22T07:03:04.323Z',
                updatedAt: '2024-08-22T07:03:04.323Z',
              },
              menu: {
                id: '4fc642f4-18bb-4b18-980b-7e41e804720c',
                title: '个人中心',
                type: 'MENU',
                parentId: null,
                name: 'user-center',
                path: '/user-center',
                component: 'layout.base$view.user-center',
                meta: {
                  order: 0,
                  title: 'user-center',
                  i18nKey: 'route.user-center',
                  constant: false,
                  multiTab: false,
                  keepAlive: false,
                  hideInMenu: true,
                },
                sort: 9,
                permission: null,
                createdAt: '2024-08-20T09:53:42.835Z',
                updatedAt: '2024-08-20T09:53:42.835Z',
              },
            },
          ],
        },
      ],
    },
  })
  data: (Role & {
    permissions: Permission[];
  })[];
}

/**
 * @description: 创建/更新角色数据 Dto
 */
export class ResponseSaveRoleDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      id: 'b9543dee-9d17-4483-ab39-992ee0ed8e1b',
      name: '超级管理员',
      code: 'Super Admin',
      description: '拥有系统全部权限',
      sort: 1,
      createdAt: '2024-08-22T06:19:52.715Z',
      updatedAt: '2024-08-22T06:19:52.715Z',
    },
  })
  data: Role;
}

/**
 * @description: 删除角色 DTO
 */
export class ResponseDeleteRoleDto extends ResponseDto {
  @ApiProperty({
    type: [Object, Object],
    description: '响应体',
    default: [
      {
        count: 2,
      },
      {
        id: 'b9543dee-9d17-4483-ab39-992ee0ed8e1b',
        name: '超级管理员',
        code: 'Super Admin',
        description: '拥有系统全部权限',
        sort: 1,
        createdAt: '2024-08-22T06:19:52.715Z',
        updatedAt: '2024-08-22T06:35:01.473Z',
      },
    ],
  })
  data: [{ count: number }, Role];
}
