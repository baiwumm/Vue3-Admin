/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-02 14:26:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-04 10:56:03
 * @Description: 响应体
 */

import { ApiProperty } from '@nestjs/swagger';
import type { Message, MessageRead } from '@prisma/client';

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
 * @description: 创建/更新/消息数据 Dto
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

/**
 * @description: 删除消息数据 Dto
 */
export class ResponseDeleteMessageDto extends ResponseDto {
  @ApiProperty({
    type: [Object, Object],
    description: '响应体',
    default: [
      {
        count: 1,
      },
      {
        id: '42e27ded-ba63-45ea-962b-e49580a32095',
        title: '青岛警方通报王某驾车逆行殴打他人案',
        content:
          '<p>【<a href="https://s.weibo.com/weibo?q=%23%E9%9D%92%E5%B2%9B%E8%AD%A6%E6%96%B9%E9%80%9A%E6%8A%A5%E7%8E%8B%E6%9F%90%E9%A9%BE%E8%BD%A6%E9%80%86%E8%A1%8C%E6%AE%B4%E6%89%93%E4%BB%96%E4%BA%BA%E6%A1%88%23" target="_blank">#青岛警方通报王某驾车逆行殴打他人案#</a>】<a href="https://s.weibo.com/weibo?q=%23%E7%BD%91%E4%BC%A0%E9%80%86%E8%A1%8C%E6%89%93%E4%BA%BA%E5%8F%B8%E6%9C%BA%E8%A2%AB%E5%B1%85%E5%AE%B6%E6%8B%98%E7%95%99%E4%B8%8D%E5%B1%9E%E5%AE%9E%23" target="_blank">#网传逆行打人司机被居家拘留不属实#</a> 近日，青岛市崂山区“王某驾车逆行辱骂殴打他人”案件引发关注，青岛市公安局成立工作专班，依法进行了核查，现将有关情况通报如下↓↓（人民日报记者侯琳良、王沛） ​</p><p><br></p><ul><li style="text-align: center;"><img src="https://wx1.sinaimg.cn/orj360/0033ImPzly1htag9nhazqj60ku408b2b02.jpg" alt="" data-href="" style="width: 167px;height: auto;"><br></li></ul>',
        status: 'ACTIVE',
        pinned: false,
        userId: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
        createdAt: '2024-09-03T10:00:02.340Z',
        updatedAt: '2024-09-03T10:00:02.340Z',
      },
    ],
  })
  data: [{ count: number }, Message];
}

/**
 * @description: 创建已读信息 Dto
 */
export class ResponseSaveMessageReadDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      id: '8d1b1833-08bd-44a0-8837-17d1ae64d917',
      messageId: '42e27ded-ba63-45ea-962b-e49580a32095',
      userId: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
      createdAt: '2024-09-04T02:09:08.542Z',
    },
  })
  data: MessageRead;
}

/**
 * @description: 未读消息条数 Dto
 */
export class UnReadMessageCountDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: 10,
  })
  data: number;
}

/**
 * @description: 未读消息列表 Dto
 */
export class UnReadMessageDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: [
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
  })
  data: Message[];
}
