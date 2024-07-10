/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:39:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-10 16:43:13
 * @Description: OrganazationService - 组织管理
 */
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { responseMessage } from '@/utils';

import { CreateOrganazationDto } from './dto/create-organazation.dto';
import { UpdateOrganazationDto } from './dto/update-organazation.dto';

@Injectable()
export class OrganazationService {
  constructor(private prisma: PrismaService) { }
  create(createOrganazationDto: CreateOrganazationDto) {
    return 'This action adds a new organazation';
  }

  /**
   * @description: 查询组织列表
   */
  async findAll() {
    const result = await this.prisma.organization.findMany();
    return responseMessage(result);
  }

  findOne(id: number) {
    return `This action returns a #${id} organazation`;
  }

  update(id: number, updateOrganazationDto: UpdateOrganazationDto) {
    return `This action updates a #${id} organazation`;
  }

  remove(id: number) {
    return `This action removes a #${id} organazation`;
  }
}
