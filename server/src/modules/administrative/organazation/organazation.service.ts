/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:39:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:42:28
 * @Description: OrganazationService - 组织管理
 */
import { Injectable } from '@nestjs/common';
import type { Organization } from '@prisma/client';

import { RESPONSE_MSG } from '@/enums';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { convertFlatDataToTree, responseMessage } from '@/utils';

import { OrganazationParamsDto } from './dto/params-organazation.dto';
import { SaveOrganazationDto } from './dto/save-organazation.dto';

@Injectable()
export class OrganazationService {
  constructor(private prisma: PrismaService) { }

  /**
   * @description: 查询组织列表
   */
  async findAll({ name, code }: OrganazationParamsDto) {
    // 条件判断
    const where = {}; // 查询参数
    // 模糊查询
    if (name) {
      where['name'] = { contains: name, mode: 'insensitive' };
    }

    if (code) {
      where['code'] = { contains: code, mode: 'insensitive' };
    }
    const result = await this.prisma.organization.findMany({
      where,
      include: {
        posts: true,
      },
      orderBy: [
        { sort: 'asc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    return responseMessage<CommonType.PageResponse<Organization>>({
      records: convertFlatDataToTree(result),
    });
  }

  /**
   * @description: 查询单个组织
   */
  async findOne(id: string) {
    const result = await this.prisma.organization.findUnique({
      where: {
        id,
      },
    });
    return responseMessage<Organization>(result);
  }

  /**
   * @description: 创建组织
   */
  async create(body: SaveOrganazationDto) {
    try {
      const result = await this.prisma.organization.create({
        data: body,
      });
      return responseMessage<Organization>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '组织名称或编码已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 更新组织
   */
  async update(id: string, body: SaveOrganazationDto) {
    try {
      // 判断父级不能是子级
      if (id === body.parentId) {
        return responseMessage(null, '父级不能是自己!', -1);
      }
      const result = await this.prisma.organization.update({
        where: { id },
        data: body,
      });
      return responseMessage<Organization>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '组织名称或编码已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 删除组织
   */
  async remove(id: string) {
    try {
      // 查询该组织是否有子组织
      const hasChildren = await this.prisma.organization.count({
        where: {
          parentId: id,
        },
      });
      if (hasChildren > 0) {
        return responseMessage(null, '该组织下有子级，不能删除!', -1);
      } else {
        const result = await this.prisma.organization.delete({
          where: { id },
        });
        return responseMessage<Organization>(result);
      }
    } catch (error) {
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }
}
