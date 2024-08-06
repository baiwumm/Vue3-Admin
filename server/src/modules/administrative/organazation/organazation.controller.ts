/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:39:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-06 17:47:47
 * @Description: OrganazationController
 */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { OrganazationParamsDto } from './dto/params-organazation.dto';
import { ResponseOrganizationDto, ResponseSaveOrganizationDto } from './dto/response-organazation.dto';
import { SaveOrganazationDto } from './dto/save-organazation.dto';
import { OrganazationService } from './organazation.service';

@ApiTags('智能行政-组织管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('administrative/organazation')
export class OrganazationController {
  constructor(private readonly organazationService: OrganazationService) { }

  /**
   * @description: 查询组织列表
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseOrganizationDto })
  @ApiOperation({ summary: '获取组织管理列表' })
  findAll(@Query() params: OrganazationParamsDto) {
    return this.organazationService.findAll(params);
  }

  /**
   * @description: 创建组织
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: ResponseSaveOrganizationDto })
  @ApiOperation({ summary: '创建组织' })
  create(@Body() body: SaveOrganazationDto) {
    return this.organazationService.create(body);
  }

  /**
   * @description: 查询组织详情
   */
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({ type: ResponseSaveOrganizationDto })
  @ApiOperation({ summary: '查询组织详情' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.organazationService.findOne(id);
  }

  /**
   * @description: 更新组织
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOkResponse({ type: ResponseSaveOrganizationDto })
  @ApiOperation({ summary: '更新组织' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: SaveOrganazationDto) {
    return this.organazationService.update(id, body);
  }

  /**
   * @description: 删除组织
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOkResponse({ type: ResponseSaveOrganizationDto })
  @ApiOperation({ summary: '删除组织' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.organazationService.remove(id);
  }
}
