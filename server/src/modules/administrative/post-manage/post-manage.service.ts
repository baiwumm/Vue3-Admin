/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-16 15:40:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:42:55
 * @Description: PostManageService - 岗位管理
 */

import { Injectable } from '@nestjs/common';
import type { Post } from '@prisma/client';

import { RESPONSE_MSG } from '@/enums';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { convertFlatDataToTree, responseMessage } from '@/utils';

import { PostParamsDto } from './dto/params-post.dto';
import { SavePostDto } from './dto/save-post.dto';

@Injectable()
export class PostManageService {
  constructor(private prisma: PrismaService) { }

  /**
   * @description: 查询岗位列表
   */
  async findAll({ name, orgId, startTime, endTime }: PostParamsDto) {
    // 条件判断
    const where = {}; // 查询参数
    // 模糊查询
    if (name) {
      where['name'] = { contains: name, mode: 'insensitive' };
    }

    if (orgId) {
      where['orgId'] = { equals: orgId };
    }

    if (startTime && endTime) {
      where['createdAt'] = {
        gte: new Date(Number(startTime)),
        lte: new Date(Number(endTime)),
      };
    }
    const result = await this.prisma.post.findMany({
      where,
      include: {
        organization: true,
      },
      orderBy: [
        { sort: 'asc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    return responseMessage<CommonType.PageResponse<Post>>({
      records: convertFlatDataToTree(result),
    });
  }

  /**
   * @description: 查询单个岗位信息
   */
  async findOne(id: string) {
    const result = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    return responseMessage<Post>(result);
  }

  /**
   * @description: 创建岗位
   */
  async create(body: SavePostDto) {
    try {
      const result = await this.prisma.post.create({
        data: body,
      });
      return responseMessage<Post>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '岗位名称已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 更新岗位
   */
  async update(id: string, body: SavePostDto) {
    try {
      // 判断父级不能是子级
      if (id === body.parentId) {
        return responseMessage(null, '父级不能是自己!', -1);
      }
      const result = await this.prisma.post.update({
        where: { id },
        data: body,
      });
      return responseMessage<Post>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '岗位名称已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 删除岗位
   */
  async remove(id: string) {
    try {
      // 查询该岗位是否有子级
      const hasChildren = await this.prisma.post.count({
        where: {
          parentId: id,
        },
      });
      if (hasChildren > 0) {
        return responseMessage(null, '该岗位下有子级，不能删除!', -1);
      } else {
        const result = await this.prisma.post.delete({
          where: { id },
        });
        return responseMessage<Post>(result);
      }
    } catch (error) {
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }
}
