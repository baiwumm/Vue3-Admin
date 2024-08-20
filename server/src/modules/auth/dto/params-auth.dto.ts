/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-01 15:35:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-20 15:42:13
 * @Description: 请求参数 DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * @description: 用户登录参数
 */
export class LoginParamsDto {
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
    default: 'abc123456',
  })
  @IsNotEmpty({ message: '密码必填' })
  password: string;

  @ApiProperty({
    type: String,
    description: '验证码',
    default: '16',
  })
  @IsNotEmpty({ message: '验证码必填' })
  captchaCode: string;
}

/**
 * @description: 掘金文章列表
 */
export class juejinParamsDto {
  @ApiProperty({
    type: String,
    description: '用户id',
    default: '1917147257534279',
  })
  @IsNotEmpty({ message: '用户id必填' })
  user_id: string;

  @ApiProperty({
    type: Number,
    description: '文章类型',
    default: 2,
  })
  @IsNotEmpty({ message: '文章类型必填' })
  sort_type: number;

  @ApiProperty({
    type: String,
    description: '文章偏移量',
    default: '5',
  })
  @IsNotEmpty({ message: '文章偏移量必填' })
  cursor: string;
}

/**
 * @description: 判断路由是否存在
 */
export class RouteExistParamsDto {
  @ApiProperty({
    type: String,
    description: '路由名称',
    default: 'home',
  })
  @IsNotEmpty({ message: '路由名称必填' })
  name: string;
}
