/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-14 17:49:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-09 18:08:59
 * @Description: InternalizationService
 */
import { Injectable } from '@nestjs/common';
import type { Internalization } from '@prisma/client';

import { RESPONSE_MSG } from '@/enums';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { convertFlatDataToTree, responseMessage } from '@/utils';

import { InternalizationParamsDto } from './dto/params-internalization.dto';
import { SaveInternalizationDto } from './dto/save-internalization.dto';

@Injectable()
export class InternalizationService {
  constructor(private prisma: PrismaService) { }

  /**
   * @description: 查询国际化列表
   */
  async findAll({ name, zhCN, startTime, endTime }: InternalizationParamsDto) {
    // 条件判断
    const where = {}; // 查询参数
    // 模糊查询
    if (name) {
      where['name'] = { contains: name, mode: 'insensitive' };
    }

    if (zhCN) {
      where['zhCN'] = { contains: zhCN, mode: 'insensitive' };
    }

    if (startTime && endTime) {
      where['createdAt'] = {
        gte: new Date(Number(startTime)),
        lte: new Date(Number(endTime)),
      };
    }
    const result = await this.prisma.internalization.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
    });
    return responseMessage<CommonType.PageResponse<Internalization>>({
      records: convertFlatDataToTree(result),
    });
  }

  /**
   * @description: 创建国际化
   */
  async create(body: SaveInternalizationDto) {
    try {
      // 条件判断
      const where = {
        name: body.name,
        parentId: body.parentId || null,
      };
      // 同一层级不能有重复的key
      const hasChildren = await this.prisma.internalization.count({
        where,
      });
      if (hasChildren > 0) {
        return responseMessage(null, '同一层级 name 不能相同', -1);
      }
      const result = await this.prisma.internalization.create({
        data: body,
      });
      return responseMessage<Internalization>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '国际化字段已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 更新国际化
   */
  async update(id: string, body: SaveInternalizationDto) {
    try {
      // 判断父级不能是子级
      if (id === body.parentId) {
        return responseMessage(null, '父级不能是自己!', -1);
      }
      // 条件判断
      const where = {
        id: {
          not: id,
        },
        name: body.name,
        parentId: body.parentId || null,
      };
      // 同一层级不能有重复的key
      const hasChildren = await this.prisma.internalization.count({
        where,
      });
      if (hasChildren > 0) {
        return responseMessage(null, '同一层级 name 不能相同', -1);
      }
      const result = await this.prisma.internalization.update({
        where: { id },
        data: body,
      });
      return responseMessage<Internalization>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '国际化字段已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 删除国际化
   */
  async remove(id: string) {
    try {
      // 查询该国际化是否有子级
      const hasChildren = await this.prisma.internalization.count({
        where: {
          parentId: id,
        },
      });
      if (hasChildren > 0) {
        return responseMessage(null, '该国际化字段下有子级，不能删除!', -1);
      } else {
        const result = await this.prisma.internalization.delete({
          where: { id },
        });
        return responseMessage<Internalization>(result);
      }
    } catch (error) {
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }
}
