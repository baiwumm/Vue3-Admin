/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 11:01:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-18 17:21:02
 * @Description: UserManageService - 用户管理
 */
import { Injectable } from '@nestjs/common';

import { RESPONSE_MSG } from '@/enums';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { responseMessage } from '@/utils';

import { UserParamsDto } from './dto/params-user.dto';

@Injectable()
export class UserManageService {
  constructor(private prisma: PrismaService) { }

  /**
   * @description: 查询用户列表
   */
  async findAll({ name, status, current, size }: UserParamsDto) {
    // 分页处理，这里获取到的分页是字符串，需要转换成整数
    const take = Number(size);
    const skip = (Number(current) - 1) * take;
    // 条件判断
    const where = {}; // 查询参数
    // 模糊查询
    if (name) {
      where['name'] = { contains: name, mode: 'insensitive' };
    }

    if (status) {
      where['status'] = { equals: status };
    }

    const result = await this.prisma.user.findMany({
      skip,
      take,
      where,
      include: {
        organization: true,
        post: true,
      },
      orderBy: [
        { sort: 'asc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    return responseMessage({
      records: result,
    });
  }

  /**
   * @description: 查询单个用户信息
   */
  async findOne(id: string) {
    const result = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return responseMessage(result);
  }

  /**
   * @description: 创建用户
   */
  async create(body) {
    try {
      const result = await this.prisma.user.create({
        data: body,
      });
      return responseMessage<Api.SystemManage.User>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '用户名、电子邮箱、手机号已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 更新用户
   */
  async update(id: string, body) {
    try {
      const result = await this.prisma.user.update({
        where: { id },
        data: body,
      });
      return responseMessage<Api.SystemManage.User>(result);
    } catch (error) {
      // 判断是否违反 postgresql 唯一性约束
      if (error.code === 'P2002') {
        return responseMessage(null, '用户名、电子邮箱、手机号已存在!', -1);
      }
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }

  /**
   * @description: 删除用户
   */
  async remove(id: string) {
    try {
      const result = await this.prisma.user.delete({
        where: { id },
      });
      return responseMessage<Api.SystemManage.User>(result);
    } catch (error) {
      return responseMessage(error, RESPONSE_MSG.ERROR, -1);
    }
  }
}
