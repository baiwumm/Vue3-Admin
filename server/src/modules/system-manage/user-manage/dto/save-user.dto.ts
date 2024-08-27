/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 14:57:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 17:54:09
 * @Description: 保存用户数据 Dto
 */
import { ApiProperty } from '@nestjs/swagger';
import { Sex, Status } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

function IsImageUrl(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isImageUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const url = value;
          // 正则表达式来匹配常见的图片格式
          const regex = /\.(jpg|jpeg|png|webp|avif|gif|svg|tiff)$/i;
          return typeof url === 'string' && regex.test(url);
        },
        defaultMessage() {
          return `${propertyName} must be a valid image URL`;
        },
      },
    });
  };
}

/**
 * @description: 新增/编辑用户 DTO
 */
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
    default: '$2b$10$46pBPB5U2RJr3kGoEdve6uyPQSb6PC0e78VgR4m6Ro4fLj.8ilvry',
  })
  password?: string;

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
    default: 'http://localhost:3000/static/image/2024-07/395e036d-34b3-4bbb-ab0f-99bf10a63f97.jpeg',
    required: false,
  })
  @IsImageUrl({ message: '头像地址格式不正确' })
  avatar: string;

  @ApiProperty({
    enum: Sex,
    description: '性别',
    example: Sex.FEMALE,
  })
  sex: Sex;

  @ApiProperty({
    enum: Status,
    description: '状态',
    example: Status.ACTIVE,
  })
  status: Status;

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
    type: [String],
    description: '标签',
    default: ['暴发户', '帅气男孩'],
    isArray: true,
  })
  @IsString({ each: true, message: '标签是字符串数组' })
  @IsArray({
    message: '标签是数组类型',
  })
  tags: string[];

  @ApiProperty({
    type: [String],
    description: '城市',
    default: ['44', '4403', '440304'],
    isArray: true,
  })
  @IsString({ each: true, message: '城市是字符串数组' })
  @IsArray({
    message: '城市是数组类型',
  })
  city: string[];

  @ApiProperty({
    type: String,
    description: '详细地址',
    default: '腾讯滨海大厦',
    required: false,
  })
  address?: string;

  @ApiProperty({
    type: String,
    description: '组织id',
    default: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
  })
  @IsUUID('all', { message: 'orgId 参数不正确' })
  orgId: string;

  @ApiProperty({
    type: String,
    description: '岗位id',
    default: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
  })
  @IsUUID('all', { message: 'postId 参数不正确' })
  postId: string;
}

/**
 * @description: 更新用户 DTo
 */
export class UpdateUserTagsDto {
  @ApiProperty({
    type: [String],
    description: '标签',
    default: ['暴发户', '帅气男孩'],
    isArray: true,
  })
  @IsString({ each: true, message: '标签是字符串数组' })
  @IsArray({
    message: '标签是数组类型',
  })
  tags: string[];
}

/**
 * @description: 修改密码 DTO
 */
export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: '原密码',
    default: '$2b$10$46pBPB5U2RJr3kGoEdve6uyPQSb6PC0e78VgR4m6Ro4fLj.8ilvry',
  })
  @IsNotEmpty({ message: '原密码不能为空' })
  password: string;

  @ApiProperty({
    type: String,
    description: '新密码',
    default: 'abc123456!!',
  })
  @IsNotEmpty({ message: '新密码不能为空' })
  newPassword: string;
}
