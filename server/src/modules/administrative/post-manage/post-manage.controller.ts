/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:39:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-17 15:33:35
 * @Description: PostManageController
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { PostParamsDto } from './dto/params-post.dto';
import { ResponsePostDto, ResponseSavePostDto } from './dto/response-post.dto';
import { SavePostDto } from './dto/save-post.dto';
import { PostManageService } from './post-manage.service';

@ApiTags('智能行政-岗位管理')
@Controller('post-manage')
export class PostManageController {
  constructor(private readonly postManageService: PostManageService) { }

  /**
   * @description: 查询岗位列表
   */
  @Get()
  @ApiOkResponse({ type: ResponsePostDto })
  @ApiOperation({ summary: '获取岗位管理列表' })
  findAll(@Query() params: PostParamsDto) {
    return this.postManageService.findAll(params);
  }

  /**
   * @description: 创建岗位
   */
  @Post()
  @ApiOkResponse({ type: ResponseSavePostDto })
  @ApiOperation({ summary: '创建岗位' })
  create(@Body() body: SavePostDto) {
    return this.postManageService.create(body);
  }

  /**
   * @description: 查询岗位详情
   */
  @Get(':id')
  @ApiOkResponse({ type: ResponseSavePostDto })
  @ApiOperation({ summary: '查询岗位详情' })
  findOne(@Param('id') id: string) {
    return this.postManageService.findOne(id);
  }

  /**
   * @description: 更新岗位
   */
  @Patch(':id')
  @ApiOkResponse({ type: ResponseSavePostDto })
  @ApiOperation({ summary: '更新岗位' })
  update(@Param('id') id: string, @Body() body: SavePostDto) {
    return this.postManageService.update(id, body);
  }

  /**
   * @description: 删除岗位
   */
  @Delete(':id')
  @ApiOkResponse({ type: ResponseSavePostDto })
  @ApiOperation({ summary: '删除岗位' })
  remove(@Param('id') id: string) {
    return this.postManageService.remove(id);
  }
}
