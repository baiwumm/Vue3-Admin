/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 14:16:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:21:27
 * @Description: 响应体
 */

import { ApiProperty } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 用户管理列表响应体结构 Dto
 */
export class ResponseUserDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: {
      records: [
        {
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
          token: null,
          tags: ['热血青年'],
          city: ['44', '4403', '440305'],
          address: '粤海街道',
          orgId: '32cab8f0-13df-4876-83c5-86089390dbb7',
          postId: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
          loginCount: 0,
          lastIp: null,
          lastLoginAt: null,
          createdAt: '2024-07-30T02:35:25.835Z',
          updatedAt: '2024-07-30T02:35:25.835Z',
        },
      ],
    },
  })
  data: User[];
}

/**
 * @description: 创建/更新/删除用户数据 Dto
 */
export class ResponseSaveUserDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
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
      token: null,
      tags: ['热血青年'],
      city: ['44', '4403', '440305'],
      address: '粤海街道',
      orgId: '32cab8f0-13df-4876-83c5-86089390dbb7',
      postId: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
      loginCount: 0,
      lastIp: null,
      lastLoginAt: null,
      createdAt: '2024-07-30T02:35:25.835Z',
      updatedAt: '2024-07-30T02:35:25.835Z',
    },
  })
  data: User;
}
