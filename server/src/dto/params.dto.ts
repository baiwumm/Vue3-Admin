/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 16:39:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-22 10:19:30
 * @Description: 公共参数
 */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class PaginatingDTO {
  @ApiProperty({
    type: Number,
    description: '当前页码',
    default: 1,
  })
  @IsInt({ message: 'current 参数只能是 number 类型' })
  @Min(1, { message: 'current 参数不能小于 1' })
  @IsNotEmpty({ message: '缺少 current 页码参数' })
  @Transform(({ value }) => parseInt(value, 10))
  current: number;

  @ApiProperty({
    type: Number,
    description: '当前页条数',
    default: 10,
  })
  @IsInt({ message: 'size 参数只能是 number 类型' })
  @Min(1, { message: 'size 参数不能小于 1' })
  @IsNotEmpty({ message: '缺少 size 页码参数' })
  @Transform(({ value }) => parseInt(value, 10))
  size: number;
}
