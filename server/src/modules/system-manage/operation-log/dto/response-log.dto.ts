/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-07 17:52:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:28:20
 * @Description: 响应体
 */
import { ApiProperty } from '@nestjs/swagger';
import type { Log } from '@prisma/client';

import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 操作日志列表响应体结构 Dto
 */
export class ResponseLogDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: {
      records: [
        {
          id: '625a53f9-e947-49cc-8e7c-441c3487957a',
          userId: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
          ip: '::1',
          action: '/system/user-manage?current=1&size=10',
          method: 'GET',
          params: {
            size: '10',
            current: '1',
          },
          os: 'Windows 10',
          browser: 'Chrome',
          createdAt: '2024-08-07T09:40:02.491Z',
          user: {
            id: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
            userName: 'Admin',
            password: '$2b$10$e1RRf...EUn3Ckujm5JKGeTUduc/OaeDKOu.6DZUzIsm36xuXpv.q',
            cnName: '谢明伟',
            email: 'baiwumm@foxmail.com',
            phone: '15920157932',
            avatar: 'http://localhost:3000/static/image/2024-07/cc9e77ee-cf84-48e8-a9d0-dc3e9d21224c.jpeg',
            sex: 'MALE',
            status: 'ACTIVE',
            sort: 88,
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwic3ViIjoiZGRkZDdiYTktYzFkNC00YTZiLWI5NDYtZjA1ZTJmNzk4ODBmIiwiaWF0IjoxNzIzMDIzNTk1LCJleHAiOjE3MjMyODI3OTV9.iFi5iog3CXjLxVtgzEJWR32gJrf_Cb6Qavq5UwQn9ks',
            tags: ['热血青年', '热爱自由'],
            city: ['44', '4403', '440305'],
            address: '粤海街道',
            orgId: '32cab8f0-13df-4876-83c5-86089390dbb7',
            postId: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
            loginCount: 57,
            lastIp: '::1',
            lastLoginAt: '2024-08-07T09:39:55.266Z',
            createdAt: '2024-07-30T02:35:25.835Z',
            updatedAt: '2024-08-07T09:39:55.269Z',
          },
        },
      ],
    },
  })
  data: Log[];
}

/**
 * @description: 删除日志数据 Dto
 */
export class ResponseDelLogDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: [
      {
        id: '625a53f9-e947-49cc-8e7c-441c3487957a',
        userId: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
        ip: '::1',
        action: '/system/user-manage?current=1&size=10',
        method: 'GET',
        params: {
          size: '10',
          current: '1',
        },
        os: 'Windows 10',
        browser: 'Chrome',
        createdAt: '2024-08-07T09:40:02.491Z',
      },
    ],
  })
  data: Log[];
}
