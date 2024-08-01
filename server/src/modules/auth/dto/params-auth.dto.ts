/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-01 15:35:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-01 15:38:26
 * @Description: 请求参数 DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
