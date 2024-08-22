/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:39:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-17 15:19:57
 * @Description: 保存岗位数据 Dto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class SavePostDto {
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
    description: '岗位名称',
    default: '前端工程师',
  })
  @IsNotEmpty({ message: '岗位名称必填' })
  name: string;

  @ApiProperty({
    type: String,
    description: '组织id',
    default: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
  })
  @IsUUID('all', { message: 'orgId 参数不正确' })
  orgId: string;

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

  @ApiProperty({
    type: String,
    description: '岗位描述',
    default:
      '前端工程师是互联网时代软件产品研发中不可缺少的一种专业研发角色。从狭义上讲，前端工程师使用 HTML、CSS、JavaScript 等专业技能和工具将产品UI设计稿实现成网站产品，涵盖用户PC端、移动端网页，处理视觉和交互问题。',
    required: false,
  })
  description?: string;
}
