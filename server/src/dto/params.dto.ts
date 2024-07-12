/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 16:39:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-11 17:44:09
 * @Description: 公共参数
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class PaginatingDTO {
  @ApiProperty({
    type: Number,
    description: '当前页码',
    default: 1,
  })
  @Min(1, { message: 'current 参数不能小于 1' })
  @IsInt({ message: 'current 参数只能是 number 类型' })
  @IsNotEmpty({ message: '缺少 current 页码参数' })
  current: number;

  @ApiProperty({
    type: Number,
    description: '当前页条数',
    default: 10,
  })
  @Min(1, { message: 'size 参数不能小于 1' })
  @IsInt({ message: 'size 参数只能是 number 类型' })
  @IsNotEmpty({ message: '缺少 current 页码参数' })
  size: number;
}
