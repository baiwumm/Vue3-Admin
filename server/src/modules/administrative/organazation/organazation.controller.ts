/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:39:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-10 16:44:10
 * @Description: OrganazationController
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateOrganazationDto } from './dto/create-organazation.dto';
import { UpdateOrganazationDto } from './dto/update-organazation.dto';
import { OrganazationService } from './organazation.service';

@Controller('organazation')
export class OrganazationController {
  constructor(private readonly organazationService: OrganazationService) { }

  @Post()
  create(@Body() createOrganazationDto: CreateOrganazationDto) {
    return this.organazationService.create(createOrganazationDto);
  }

  /**
   * @description: 查询组织列表
   */
  @Get()
  findAll() {
    return this.organazationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organazationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganazationDto: UpdateOrganazationDto,
  ) {
    return this.organazationService.update(+id, updateOrganazationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organazationService.remove(+id);
  }
}
