/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 16:44:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-17 15:23:42
 * @Description: 请求参数 DTO
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsUUID } from 'class-validator';

export class PostParamsDto {
  @ApiProperty({
    type: String,
    description: '岗位名称',
    required: false,
    default: '前端工程师',
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '所属组织',
    default: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { message: 'orgId 参数不正确' })
  orgId?: string;

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
