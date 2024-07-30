/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 14:57:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-30 11:28:40
 * @Description: 保存用户数据 Dto
 */
import { ApiProperty } from '@nestjs/swagger';
import { Sex, Status } from '@prisma/client';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
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
