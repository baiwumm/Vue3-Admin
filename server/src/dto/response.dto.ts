/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 14:05:23
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-10 14:24:36
 * @Description: 全局响应体
 */
import { ApiProperty } from '@nestjs/swagger';

import { RESPONSE_CODE, RESPONSE_MSG } from '@/enums';

export class ResponseDto {
  @ApiProperty({
    type: Number,
    description: '业务状态码',
    default: RESPONSE_CODE.SUCCESS,
  })
  code: number;

  @ApiProperty({
    type: String,
    description: '业务信息',
    default: RESPONSE_MSG.SUCCESS,
  })
  msg: string;

  @ApiProperty({ description: '业务数据' })
  data?: any;

  @ApiProperty({ type: Number, description: '时间戳' })
  timestamp: number;
}
