/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-09-02 14:13:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-09 11:14:21
 * @Description: MessageService
 */
import { Injectable } from '@nestjs/common';
import type { Message, MessageRead } from '@prisma/client';

import { PaginatingDTO } from '@/dto/params.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { responseMessage } from '@/utils';

import { MessageParamsDto } from './dto/params-message.dto';
import { SaveMessageDto } from './dto/save-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

  /**
   * @description: 查询消息公告列表
   */
  async findAll({ userId, title, status, startTime, endTime, current, size }: MessageParamsDto) {
    // 分页处理，这里获取到的分页是字符串，需要转换成整数
    const take = Number(size);
    const skip = (Number(current) - 1) * take;
    // 条件判断
    const where = {}; // 查询参数
    // 模糊查询
    if (userId) {
      where['userId'] = { equals: userId };
    }

    if (title) {
      where['title'] = { contains: title, mode: 'insensitive' };
    }

    if (status) {
      where['status'] = { equals: status };
    }

    if (startTime && endTime) {
      where['createdAt'] = {
        gte: new Date(Number(startTime)),
        lte: new Date(Number(endTime)),
      };
    }
    const records = await this.prisma.message.findMany({
      skip,
      take,
      where,
      include: {
        user: true,
        messageReads: {
          include: {
            user: true,
          },
        },
      },
      orderBy: [
        { pinned: 'desc' },
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    // 总条数
    const total = await this.prisma.message.count({ where });
    return responseMessage<CommonType.PageResponse<Message>>({
      records,
      total,
      current: Number(current),
      size: take,
    });
  }

  /**
   * @description: 查询单个消息公告
   */
  async findOne(id: string) {
    const result = await this.prisma.message.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        messageReads: true,
      },
    });
    return responseMessage<Message>(result);
  }

  /**
   * @description: 创建消息公告
   */
  async create(body: SaveMessageDto, session: CommonType.SessionInfo) {
    const result = await this.prisma.message.create({
      data: {
        ...body,
        userId: session.userInfo.id,
      },
      include: {
        user: true,
        messageReads: true,
      },
    });
    return responseMessage<Message>(result);
  }

  /**
   * @description: 更新消息公告
   */
  async update(id: string, body: SaveMessageDto) {
    const result = await this.prisma.message.update({
      where: { id },
      data: body,
    });
    return responseMessage<Message>(result);
  }

  /**
   * @description: 删除消息公告
   */
  async remove(id: string) {
    // 开启事务删除
    const result = await this.prisma.$transaction([
      this.prisma.messageRead.deleteMany({ where: { messageId: id } }),
      this.prisma.message.delete({
        where: { id },
      }),
    ]);
    return responseMessage<[{ count: number }, Message]>(result);
  }

  /**
   * @description: 修改置顶状态
   */
  async changePinned(id: string) {
    // 查询当前数据
    const message = await this.prisma.message.findUnique({
      where: {
        id,
      },
    });
    // 更新置顶状态
    const result = await this.prisma.message.update({
      where: { id },
      data: {
        pinned: !message?.pinned,
      },
    });
    return responseMessage<Message>(result);
  }

  /**
   * @description: 创建已读信息
   */
  async createMessageRead(id: string, session: CommonType.SessionInfo) {
    // 查询当前用户是否已读
    const read = await this.prisma.messageRead.findFirst({
      where: {
        messageId: id,
        userId: session.userInfo.id,
      },
    });
    // 如果有记录，直接返回
    if (read) {
      return responseMessage<null>(read);
    }
    // 没有记录则新增一条记录
    const result = await this.prisma.messageRead.create({
      data: {
        messageId: id,
        userId: session.userInfo.id,
      },
    });
    return responseMessage<MessageRead>(result);
  }

  /**
   * @description: 查询未读消息条数
   */
  async unreadMessageCount(session: CommonType.SessionInfo) {
    // 查询未读消息条数
    const result = await this.prisma.message.count({
      where: {
        NOT: {
          messageReads: {
            some: {
              userId: session.userInfo.id,
            },
          },
        },
      },
    });
    return responseMessage<number>(result);
  }

  /**
   * @description: 查询未读消息列表
   */
  async getUnreadMessageList({ current, size }: PaginatingDTO, session: CommonType.SessionInfo) {
    // 分页处理，这里获取到的分页是字符串，需要转换成整数
    const take = Number(size);
    const skip = (Number(current) - 1) * take;
    // 查询未读消息条数
    const result = await this.prisma.message.findMany({
      skip,
      take,
      where: {
        messageReads: {
          none: {
            userId: session.userInfo.id,
          },
        },
      },
      include: {
        user: true,
        messageReads: {
          include: {
            user: true,
          },
        },
      },
      orderBy: [
        { pinned: 'desc' },
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    return responseMessage<Message[]>(result);
  }
}
