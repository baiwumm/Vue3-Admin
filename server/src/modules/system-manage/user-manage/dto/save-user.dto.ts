/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 14:57:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-18 17:17:50
 * @Description: 保存用户数据 Dto
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsIP, IsMobilePhone, IsNotEmpty, IsNumber, IsUrl, IsUUID, Length } from 'class-validator';

import { SEX, STATUS } from '@/enums';

export class SaveUserDto {
  @ApiProperty({
    type: String,
    description: '用户名',
    default: 'admin',
  })
  @IsNotEmpty({ message: '用户名必填' })
  userName: string;

  @ApiProperty({
    type: String,
    description: '密码',
    default: 'IqDDrMKzGqHgIOW7ya8cMQ==',
  })
  @IsNotEmpty({ message: '密码必填' })
  password: string;

  @ApiProperty({
    type: String,
    description: '中文名',
    default: '谢明伟',
  })
  @IsNotEmpty({ message: '中文名必填' })
  cnName: string;

  @ApiProperty({
    type: String,
    description: '电子邮箱',
    default: 'baiwumm@foxmail.com',
  })
  @IsEmail({}, { message: '电子邮箱格式不正确' })
  email: string;

  @ApiProperty({
    type: String,
    description: '手机号',
    default: '13800138000',
  })
  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式不正确' })
  @Length(11, 11, { message: '手机号码长度必须为11位' })
  phone: string;

  @ApiProperty({
    type: String,
    description: '头像地址',
    default: 'https://cdn.baiwumm.com/avatar.jpg',
    required: false,
  })
  @IsUrl({}, { message: '头像地址不正确' })
  avatar?: string;

  @ApiProperty({
    enum: SEX,
    description: '性别',
    example: SEX.FEMALE,
  })
  sex: SEX;

  @ApiProperty({
    enum: STATUS,
    description: '状态',
    example: STATUS.ACTIVE,
  })
  status: STATUS;

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
    description: 'token',
    default: '',
    required: false,
  })
  token?: string;

  @ApiProperty({
    type: [String],
    description: '标签',
    default: ['暴发户', '帅气男孩'],
    isArray: true,
  })
  tags: string[];

  @ApiProperty({
    type: [String],
    description: '城市',
    default: ['44', '4403', '440304'],
    isArray: true,
  })
  city: string[];

  @ApiProperty({
    type: String,
    description: '详细地址',
    default: '腾讯滨海大厦',
    required: false,
  })
  address?: string;

  // @ApiProperty({
  //   type: String,
  //   description: '组织id',
  //   default: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
  // })
  // @IsUUID('all', { message: 'orgId 参数不正确' })
  // orgId: string;

  // @ApiProperty({
  //   type: String,
  //   description: '岗位id',
  //   default: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
  // })
  // @IsUUID('all', { message: 'postId 参数不正确' })
  // postId: string;

  @ApiProperty({
    type: Number,
    description: '登录次数',
    default: 99,
  })
  @IsNumber(
    {},
    {
      message: '排序必须为数字',
    },
  )
  loginCount: number;

  @ApiProperty({
    type: String,
    description: '最后一次登录 ip',
    default: '183.14.31.127',
    required: false,
  })
  @IsIP(4, { message: 'Ip 地址不正确' })
  lastIp?: string;

  @ApiProperty({
    type: String,
    description: '最后一次登录时间',
    default: '2024-07-17 01:02:27.831',
    required: false,
  })
  @IsDate({ message: 'lastLoginAt 参数不正确' })
  lastLoginAt?: string;
}
