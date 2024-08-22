/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 16:19:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:13:48
 * @Description: 响应体
 */
import { ApiProperty } from '@nestjs/swagger';
import type { Organization } from '@prisma/client';

import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 组织管理列表响应体结构 Dto
 */
export class ResponseOrganizationDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: {
      records: [
        {
          id: '1db25530-7407-45ad-ad47-e9dda010e5e8',
          name: '阿里巴巴',
          code: 'ALI_001',
          parentId: null,
          sort: 1,
          description:
            '阿里巴巴集团控股有限公司（简称：阿里巴巴集团）是马云带领下的18位创始人于1999年在浙江省杭州市创立的公司。',
          createdAt: '2024-07-11T08:30:52.100Z',
          updatedAt: '2024-07-11T08:30:52.100Z',
        },
      ],
    },
  })
  data: Organization[];
}

/**
 * @description: 创建/更新/删除组织数据 Dto
 */
export class ResponseSaveOrganizationDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      id: '1db25530-7407-45ad-ad47-e9dda010e5e8',
      name: '阿里巴巴',
      code: 'ALI_001',
      parentId: null,
      sort: 1,
      description:
        '阿里巴巴集团控股有限公司（简称：阿里巴巴集团）是马云带领下的18位创始人于1999年在浙江省杭州市创立的公司。',
      createdAt: '2024-07-11T08:30:52.100Z',
      updatedAt: '2024-07-11T08:30:52.100Z',
    },
  })
  data: Organization;
}
