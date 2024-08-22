/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-19 16:41:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-19 16:46:57
 * @Description: 保存菜单数据 Dto
 */

import { ApiProperty } from '@nestjs/swagger';
import { MenuType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class SaveMenuDto {
  @ApiProperty({
    type: String,
    description: '菜单名称',
    default: '首页',
  })
  @IsNotEmpty({ message: '菜单名称必填' })
  title: string;

  @ApiProperty({
    enum: MenuType,
    description: '菜单类型',
    example: MenuType.MENU,
  })
  type: MenuType;

  @ApiProperty({
    type: String,
    description: '父级id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { message: 'parentId 参数不正确' })
  parentId?: string;

  @ApiProperty({
    type: String,
    description: '路由名称',
    default: 'home',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '路由路径',
    default: '/home',
    required: false,
  })
  path?: string;

  @ApiProperty({
    type: String,
    description: '组件布局',
    default: 'layout.base$view.home',
    required: false,
  })
  component?: string;

  @ApiProperty({
    type: Object,
    description: '路由元信息',
    default: {
      title: 'home',
      i18nKey: 'route.home',
      icon: 'mdi:monitor-dashboard',
      order: 1,
    },
    required: false,
  })
  meta?: CommonType.RouteMeta;

  @ApiProperty({
    type: Number,
    description: '排序',
    default: 1,
  })
  @IsNumber(
    {},
    {
      message: '排序必须为数字',
    },
  )
  sort: number;
}
