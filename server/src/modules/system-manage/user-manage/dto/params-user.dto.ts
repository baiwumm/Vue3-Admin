/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 13:48:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-18 18:00:30
 * @Description: 请求参数 DTO
 */
import { ApiProperty } from '@nestjs/swagger';

import { PaginatingDTO } from '@/dto/params.dto';
import { STATUS } from '@/enums';

export class UserParamsDto extends PaginatingDTO {
  @ApiProperty({
    type: String,
    description: '用户名',
    required: false,
    default: 'admin',
  })
  name?: string;

  @ApiProperty({
    enum: STATUS,
    description: '状态',
    default: 0,
    required: false,
  })
  status?: STATUS;
}
