/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-02 15:58:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-02 16:03:30
 * @Description: 保存消息公告
 */
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class SaveMessageDto {
  @ApiProperty({
    type: String,
    description: '标题',
    default: '中秋节放假通知',
  })
  @IsNotEmpty({ message: '标题必填' })
  title: string;

  @ApiProperty({
    type: String,
    description: '内容',
    default: '中秋节放假通知',
  })
  @IsNotEmpty({ message: '内容必填' })
  content: string;

  @ApiProperty({
    enum: Status,
    description: '状态',
    example: Status.ACTIVE,
  })
  status: Status;

  @ApiProperty({
    type: Boolean,
    description: '是否置顶',
    default: false,
  })
  pinned: boolean;
}

/**
 * @description: 创建已读信息
 */
export class SaveMessageReadDto {
  @ApiProperty({
    type: String,
    description: '消息 id',
    default: 'b64c3c94-5312-45f2-aa8f-fca11a04263a',
  })
  @IsNotEmpty({ message: '消息 id 必填' })
  id: string;
}
