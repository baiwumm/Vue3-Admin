/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-07 17:43:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-07 17:45:52
 * @Description: 请求参数 DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { Method } from '@prisma/client';
import { IsNumberString, IsOptional, IsUUID } from 'class-validator';

import { PaginatingDTO } from '@/dto/params.dto';

export class LogParamsDto extends PaginatingDTO {
  @ApiProperty({
    type: String,
    description: '操作人',
    default: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { message: 'userId 参数不正确' })
  userId?: string;

  @ApiProperty({
    enum: Method,
    description: '方法',
    default: Method.GET,
    required: false,
  })
  method?: Method;

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

/**
 * @description: 删除操作日志
 */
export class DelLogsDto {
  @ApiProperty({
    type: [String],
    description: 'id 集合',
    default: ['f45cd48b-e703-49db-91be-ae7f594e73e0', 'fa0fc96c-6c01-459d-b904-c6f65ec369b5'],
  })
  ids: string[];
}
