/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-02 14:15:22
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-02 14:19:05
 * @Description: 请求参数 DTO
 */

import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsNumberString, IsOptional, IsUUID } from 'class-validator';

import { PaginatingDTO } from '@/dto/params.dto';

export class MessageParamsDto extends PaginatingDTO {
  @ApiProperty({
    type: String,
    description: '作者 id',
    default: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { message: 'userId 参数不正确' })
  userId?: string;

  @ApiProperty({
    type: String,
    description: '标题',
    default: '全红婵夺冠拉',
    required: false,
  })
  title?: string;

  @ApiProperty({
    enum: Status,
    description: '状态',
    default: Status.ACTIVE,
    required: false,
  })
  status?: Status;

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
