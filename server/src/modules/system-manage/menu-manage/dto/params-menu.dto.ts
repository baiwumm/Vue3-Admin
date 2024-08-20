/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-19 16:13:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-19 16:13:48
 * @Description: 请求参数 DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class MenuParamsDto {
  @ApiProperty({
    type: String,
    description: '菜单名称',
    required: false,
    default: '首页',
  })
  title?: string;

  @ApiProperty({
    type: String,
    description: '路由名称',
    required: false,
    default: 'home',
  })
  name?: string;

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
