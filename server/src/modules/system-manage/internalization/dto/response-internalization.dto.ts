/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-15 10:02:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:26:31
 * @Description: 响应体
 */
import { ApiProperty } from '@nestjs/swagger';
import type { Internalization } from '@prisma/client';

import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 国际化列表响应体结构 Dto
 */
export class ResponseInternalizationDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: {
      records: [
        {
          id: '9ec5117e-370f-4785-8ea4-42fc72399be2',
          name: 'updateTitle',
          parentId: '54d1a5bd-0275-4a27-a613-63f679a50d4d',
          zhCN: '系统版本更新通知',
          enUS: 'System version update notification',
          jaJP: 'システム更新のお知らせです',
          zhTW: '系統版本更新通知',
          createdAt: '2024-08-15T02:59:31.025Z',
          updatedAt: '2024-08-15T02:59:31.025Z',
        },
      ],
    },
  })
  data: Internalization[];
}

/**
 * @description: 创建/更新/删除国际化数据 Dto
 */
export class ResponseSaveInternalizationDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      id: '9ec5117e-370f-4785-8ea4-42fc72399be2',
      name: 'updateTitle',
      parentId: '54d1a5bd-0275-4a27-a613-63f679a50d4d',
      zhCN: '系统版本更新通知',
      enUS: 'System version update notification',
      jaJP: 'システム更新のお知らせです',
      zhTW: '系統版本更新通知',
      createdAt: '2024-08-15T02:59:31.025Z',
      updatedAt: '2024-08-15T02:59:31.025Z',
    },
  })
  data: Internalization;
}
