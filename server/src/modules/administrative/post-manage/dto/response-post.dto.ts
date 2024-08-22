/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 16:19:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:17:28
 * @Description: 响应体
 */
import { ApiProperty } from '@nestjs/swagger';
import type { Post } from '@prisma/client';

import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 岗位管理列表响应体结构 Dto
 */
export class ResponsePostDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: {
      records: [
        {
          id: '1d83e15c-3dba-4cbf-bd23-e1f37b3ab834',
          name: '程序员',
          orgId: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
          parentId: null,
          sort: 1,
          description:
            '程序员（英文Programmer）是从事程序开发、程序维护的基层工作人员。一般将程序员分为程序设计人员和程序编码人员，但两者的界限并不非常清楚。随着互联网的不断普及，网络上把男程序员称作“程序猿”。或将男女程序员统称为“工程师（攻城狮）”。',
          createdAt: '2024-07-17T00:39:54.384Z',
          updatedAt: '2024-07-17T01:36:06.188Z',
          organization: {
            id: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
            name: '阿里巴巴',
            code: 'ALI_000',
            parentId: null,
            sort: 1,
            description:
              '阿里巴巴集团由曾担任英语教师的马云为首的18人，于1999年在中国杭州创立。从一开始，所有创始人就深信互联网能够创造公平的竞争环境，让小企业通过创新与科技扩展业务，并在参与国内或全球市场竞争时处于更有利的位置。自推出让中国的小型出口商、制造商及创业者接触全球买家的首个网站以来，阿里巴巴集团不断成长，成为了网上及移动商务的全球领导者。',
            icon: 'simple-icons:alibabadotcom',
            createdAt: '2024-07-15T07:59:08.613Z',
            updatedAt: '2024-07-15T07:59:08.613Z',
          },
          children: [
            {
              id: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
              name: '前端工程师',
              orgId: '9382c3d0-42ef-496b-961f-f0bcee6edfbf',
              parentId: '1d83e15c-3dba-4cbf-bd23-e1f37b3ab834',
              sort: 1,
              description:
                '前端工程师是互联网时代软件产品研发中不可缺少的一种专业研发角色。从狭义上讲，前端工程师使用 HTML、CSS、JavaScript 等专业技能和工具将产品UI设计稿实现成网站产品，涵盖用户PC端、移动端网页，处理视觉和交互问题。从广义上来讲，所有用户终端产品与视觉和交互有关的部分，都是前端工程师的专业领域。',
              createdAt: '2024-07-17T01:02:27.831Z',
              updatedAt: '2024-07-17T01:02:27.831Z',
              organization: {
                id: '9382c3d0-42ef-496b-961f-f0bcee6edfbf',
                name: '支付宝',
                code: 'ALI_002',
                parentId: 'f45cd48b-e703-49db-91be-ae7f594e73e0',
                sort: 1,
                description:
                  '支付宝（Alipay）是蚂蚁科技集团股份有限公司旗下业务，成立于2004年，是中国第三方支付开放平台，是当下世界上流行的网络银行和网络支付形式之一。',
                icon: 'ri:alipay-fill',
                createdAt: '2024-07-15T07:59:53.677Z',
                updatedAt: '2024-07-15T07:59:53.677Z',
              },
            },
          ],
        },
      ],
    },
  })
  data: Post[];
}

/**
 * @description: 创建/更新/删除岗位数据 Dto
 */
export class ResponseSavePostDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      id: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
      name: '前端工程师',
      orgId: '9382c3d0-42ef-496b-961f-f0bcee6edfbf',
      parentId: '1d83e15c-3dba-4cbf-bd23-e1f37b3ab834',
      sort: 1,
      description:
        '前端工程师是互联网时代软件产品研发中不可缺少的一种专业研发角色。从狭义上讲，前端工程师使用 HTML、CSS、JavaScript 等专业技能和工具将产品UI设计稿实现成网站产品，涵盖用户PC端、移动端网页，处理视觉和交互问题。从广义上来讲，所有用户终端产品与视觉和交互有关的部分，都是前端工程师的专业领域。',
      createdAt: '2024-07-17T01:02:27.831Z',
      updatedAt: '2024-07-17T01:02:27.831Z',
    },
  })
  data: Post;
}
