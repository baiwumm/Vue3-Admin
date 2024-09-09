/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-14 17:52:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-09 18:08:26
 * @Description: 请求参数 DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class InternalizationParamsDto {
  @ApiProperty({
    type: String,
    description: '多语言字段',
    required: false,
    default: 'menu',
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '中文',
    required: false,
    default: '首页',
  })
  zhCN?: string;

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
