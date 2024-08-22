/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-19 11:19:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:41:29
 * @Description: MenuManageService
 */
import { Injectable } from '@nestjs/common';
import { type Menu, MenuType } from '@prisma/client';

import { RESPONSE_MSG } from '@/enums';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { convertFlatDataToTree, responseMessage } from '@/utils';

import { MenuParamsDto } from './dto/params-menu.dto';
import { SaveMenuDto } from './dto/save-menu.dto';

@Injectable()
export class MenuManageService {
  constructor(private prisma: PrismaService) { }

  /**
   * @description: 查询菜单列表
   */
  async findAll({ title, name, startTime, endTime }: MenuParamsDto) {
    // 条件判断
    const where = {}; // 查询参数
    // 模糊查询
    if (title) {
      where['title'] = { contains: title, mode: 'insensitive' };
    }

    if (name) {
      where['name'] = { contains: name, mode: 'insensitive' };
    }

    if (startTime && endTime) {
      where['createdAt'] = {
        gte: new Date(Number(startTime)),
        lte: new Date(Number(endTime)),
      };
    }
    const result = await this.prisma.menu.findMany({
      where,
      orderBy: [
        { sort: 'asc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    return responseMessage<CommonType.PageResponse<Menu>>({
      records: convertFlatDataToTree(result),
    });
  }

  /**
   * @description: 保存菜单时的验证
   */
  async validateSaveMenu(body: SaveMenuDto): Promise<CommonType.Response | null> {
    // 先验证是否有父级
    if (body.parentId) {
      const menu = await this.prisma.menu.findUnique({
        where: {
          id: body.parentId,
        },
      });
      if (menu) {
        if (menu.type === MenuType.BUTTON) {
          return responseMessage(null, '按钮不能是父级，只能是叶子结点!', -1);
        }
        if (body.type === MenuType.BUTTON && menu.type !== MenuType.MENU) {
          return responseMessage(null, '按钮类型的父级只能是菜单!', -1);
        }
        if (body.type === MenuType.MENU && menu.type !== MenuType.DIRECTORY) {
          return responseMessage(null, '菜单类型的父级只能是目录!', -1);
        }
        if (body.type === MenuType.DIRECTORY && menu.type !== MenuType.DIRECTORY) {
          return responseMessage(null, '目录类型的父级只能是目录!', -1);
        }
      } else {
        return responseMessage(null, '父级不存在!', -1);
      }
    } else {
      if (body.type === MenuType.BUTTON) {
        return responseMessage({}, '按钮不能处于顶级，只能是叶子结点!', -1);
      }
    }
    return null;
  }

  /**
   * @description: 创建菜单
   */
  async create(body: SaveMenuDto) {
    try {
      const response = await this.validateSaveMenu(body);
      if (response) {
        return response;
      }
      const result = await this.prisma.menu.create({
        data: body,
      });
      return responseMessage<Menu>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '菜单名称、路由名称、路由路径、按钮标识已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 更新菜单
   */
  async update(id: string, body: SaveMenuDto) {
    try {
      // 判断父级不能是子级
      if (id === body.parentId) {
        return responseMessage(null, '父级不能是自己!', -1);
      }
      const response = await this.validateSaveMenu(body);
      if (response) {
        return response;
      }
      const result = await this.prisma.menu.update({
        where: { id },
        data: body,
      });
      return responseMessage<Menu>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '菜单名称、路由名称、路由路径、按钮标识已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 删除菜单
   */
  async remove(id: string) {
    try {
      // 查询该菜单是否有子级
      const hasChildren = await this.prisma.menu.count({
        where: {
          parentId: id,
        },
      });
      if (hasChildren > 0) {
        return responseMessage(null, '该菜单下有子级，不能删除!', -1);
      } else {
        const result = await this.prisma.menu.delete({
          where: { id },
        });
        return responseMessage<Menu>(result);
      }
    } catch (error) {
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }
}
