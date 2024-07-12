/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 16:44:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-11 17:50:58
 * @Description: 请求参数 DTO
 */

import { ApiProperty } from '@nestjs/swagger';

export class OrganazationParamsDto {
  @ApiProperty({
    type: String,
    description: '组织名称',
    default: '阿里巴巴',
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '组织编码',
    default: 'Alibaba',
  })
  code?: string;
}
