/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-22 10:16:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-04 10:53:46
 * @Description: RoleManageService
 */
import { Injectable } from '@nestjs/common';
import type { Role } from '@prisma/client';

import { RESPONSE_MSG } from '@/enums';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { responseMessage } from '@/utils';

import { RoleParamsDto } from './dto/params-role.dto';
import { SaveRoleDto } from './dto/save-role.dto';

@Injectable()
export class RoleManageService {
  constructor(private prisma: PrismaService) { }

  /**
   * @description: 查询角色列表
   */
  async findAll({ name, code, startTime, endTime, current, size }: RoleParamsDto) {
    // 分页处理，这里获取到的分页是字符串，需要转换成整数
    const take = Number(size);
    const skip = (Number(current) - 1) * take;
    // 条件判断
    const where = {}; // 查询参数
    // 模糊查询
    if (name) {
      where['name'] = { contains: name, mode: 'insensitive' };
    }

    if (code) {
      where['code'] = { contains: code, mode: 'insensitive' };
    }

    if (startTime && endTime) {
      where['createdAt'] = {
        gte: new Date(Number(startTime)),
        lte: new Date(Number(endTime)),
      };
    }
    const records = await this.prisma.role.findMany({
      skip,
      take,
      where,
      include: {
        permissions: {
          include: {
            role: true,
            menu: true,
          },
        },
      },
      orderBy: [
        { sort: 'desc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    // 总条数
    const total = await this.prisma.role.count({ where });
    return responseMessage<CommonType.PageResponse<Role>>({
      records,
      total,
      current: Number(current),
      size: take,
    });
  }

  /**
   * @description: 创建角色
   */

  async create({ menus = [], ...body }: SaveRoleDto) {
    try {
      // 使用事务进行嵌套写入
      const result = await this.prisma.role.create({
        data: {
          ...body,
          permissions: {
            create: menus.map((menuId) => ({
              menuId,
            })),
          },
        },
      });
      return responseMessage<Role>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '角色名称、角色编码已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 更新角色
   */
  async update(id: string, { menus = [], ...body }: SaveRoleDto) {
    try {
      // 开启事务
      const result = await this.prisma.$transaction(async (prisma) => {
        // 删除角色权限
        await prisma.permission.deleteMany({ where: { roleId: id } });
        // 使用事务进行嵌套写入
        const result = await this.prisma.role.update({
          where: { id },
          data: {
            ...body,
            permissions: {
              create: menus.map((menuId) => ({
                menuId,
              })),
            },
          },
        });
        return result;
      });
      return responseMessage<Role>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '角色名称、角色编码已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 删除角色
   */
  async remove(id: string) {
    try {
      // 开启事务删除
      const result = await this.prisma.$transaction([
        this.prisma.permission.deleteMany({ where: { roleId: id } }),
        this.prisma.role.delete({ where: { id } }),
      ]);
      return responseMessage<[{ count: number }, Role]>(result);
    } catch (error) {
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }
}
