/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-22 10:19:37
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 10:21:37
 * @Description: 请求参数 DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

import { PaginatingDTO } from '@/dto/params.dto';

export class RoleParamsDto extends PaginatingDTO {
  @ApiProperty({
    type: String,
    description: '角色名称',
    default: '超级管理员',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '角色编码',
    default: 'Super Admin',
    required: false,
  })
  code?: string;

  @ApiProperty({
    type: Number,
    description: '开始日期',
    default: 1721145600000,
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: '开始日期必须是时间戳格式' })
  startTime?: number;

  @ApiProperty({
    type: Number,
    description: '结束日期',
    default: 1721318399999,
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: '结束日期必须是时间戳格式' })
  endTime?: number;
}
