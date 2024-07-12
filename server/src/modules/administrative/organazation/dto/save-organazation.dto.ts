/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:39:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-12 11:23:55
 * @Description: 保存组织数据 Dto
 */
import { ApiProperty } from '@nestjs/swagger';

export class SaveOrganazationDto {
  @ApiProperty({
    type: String,
    description: '父级id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  parentId?: string;

  @ApiProperty({
    type: String,
    description: '组织名称',
    default: '阿里巴巴',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: '组织编码',
    default: 'Alibaba',
  })
  code: string;

  @ApiProperty({
    type: Number,
    description: '排序',
    default: 1,
  })
  sort: number;

  @ApiProperty({
    type: String,
    description: '组织描述',
    default: '阿里巴巴集团控股有限公司（简称：阿里巴巴集团）是马云带领下的18位创始人于1999年在浙江省杭州市创立的公司。',
  })
  describe: string;
}
