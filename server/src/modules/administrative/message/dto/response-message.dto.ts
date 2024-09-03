/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-02 14:26:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-03 11:34:55
 * @Description: 响应体
 */

import { ApiProperty } from '@nestjs/swagger';
import type { Message } from '@prisma/client';

import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 消息公告列表响应体结构 Dto
 */
export class ResponseMessageDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: {
      records: [
        {
          id: 'b64c3c94-5312-45f2-aa8f-fca11a04263a',
          title: '泰安交通事故致十余名学生死伤',
          content:
            '<p>【<a href="https://s.weibo.com/weibo?q=%23%E6%B3%B0%E5%AE%89%E4%BA%A4%E9%80%9A%E4%BA%8B%E6%95%85%E8%87%B4%E5%8D%81%E4%BD%99%E5%90%8D%E5%AD%A6%E7%94%9F%E6%AD%BB%E4%BC%A4%23" target="_blank">#泰安交通事故致十余名学生死伤#</a>】记者9月3日从山东省泰安市东平县相关部门获悉，上午7点多当地一所中学门口发生一起严重交通事故，一辆接送学生的定制公交车冲进路边正在上学的学生人群中，目前已造成十几名学生死伤。（新华社） ​​​</p><p><br></p><ul><li style="text-align: center;"><img src="https://wx3.sinaimg.cn/orj360/001PVG9Vly1htac0c4fg3j60z20vvgqx02.jpg" alt="" data-href="" style="width: auto;height: 167px;"><br></li></ul>',
          status: 'ACTIVE',
          pinned: false,
          userId: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
          createdAt: '2024-09-03T03:32:14.656Z',
          updatedAt: '2024-09-03T03:32:14.656Z',
          user: {
            id: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
            userName: 'Admin',
            password: '$2b$10$lfMvyYSrWNjVF55UhxeC0uoVYgf7GwWBhXu1BZAlvHXoGf./E7Lk2',
            cnName: '谢明伟',
            email: 'baiwumm@foxmail.com',
            phone: '15920157932',
            avatar: 'http://localhost:3000/static/image/2024-07/cc9e77ee-cf84-48e8-a9d0-dc3e9d21224c.jpeg',
            sex: 'MALE',
            status: 'ACTIVE',
            sort: 88,
            token: null,
            tags: ['热血青年', '佛系', '追求自由', '做自己喜欢做的事'],
            city: ['44', '4403', '440305'],
            address: '粤海街道',
            roleId: '6db049fe-c944-4680-b6dc-f9f40d6ad018',
            orgId: '32cab8f0-13df-4876-83c5-86089390dbb7',
            postId: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
            loginCount: 163,
            lastIp: '::1',
            lastLoginAt: '2024-09-03T02:45:50.342Z',
            createdAt: '2024-07-30T02:35:25.835Z',
            updatedAt: '2024-09-03T03:33:28.195Z',
          },
          messageReads: [],
        },
      ],
      total: 100,
      current: 1,
      size: 10,
    },
  })
  data: Message[];
}

/**
 * @description: 创建/更新/删除消息数据 Dto
 */
export class ResponseSaveMessageDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      id: 'b64c3c94-5312-45f2-aa8f-fca11a04263a',
      title: '泰安交通事故致十余名学生死伤',
      content:
        '<p>【<a href="https://s.weibo.com/weibo?q=%23%E6%B3%B0%E5%AE%89%E4%BA%A4%E9%80%9A%E4%BA%8B%E6%95%85%E8%87%B4%E5%8D%81%E4%BD%99%E5%90%8D%E5%AD%A6%E7%94%9F%E6%AD%BB%E4%BC%A4%23" target="_blank">#泰安交通事故致十余名学生死伤#</a>】记者9月3日从山东省泰安市东平县相关部门获悉，上午7点多当地一所中学门口发生一起严重交通事故，一辆接送学生的定制公交车冲进路边正在上学的学生人群中，目前已造成十几名学生死伤。（新华社） ​​​</p><p><br></p><ul><li style="text-align: center;"><img src="https://wx3.sinaimg.cn/orj360/001PVG9Vly1htac0c4fg3j60z20vvgqx02.jpg" alt="" data-href="" style="width: auto;height: 167px;"><br></li></ul>',
      status: 'ACTIVE',
      pinned: false,
      userId: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
      createdAt: '2024-09-03T03:32:14.656Z',
      updatedAt: '2024-09-03T03:32:14.656Z',
    },
  })
  data: Message;
}
