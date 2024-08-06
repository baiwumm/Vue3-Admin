/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-10 13:39:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-06 17:47:34
 * @Description: PostManageController
 */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { PostParamsDto } from './dto/params-post.dto';
import { ResponsePostDto, ResponseSavePostDto } from './dto/response-post.dto';
import { SavePostDto } from './dto/save-post.dto';
import { PostManageService } from './post-manage.service';

@ApiTags('智能行政-岗位管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('administrative/post-manage')
export class PostManageController {
  constructor(private readonly postManageService: PostManageService) { }

  /**
   * @description: 查询岗位列表
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponsePostDto })
  @ApiOperation({ summary: '获取岗位管理列表' })
  findAll(@Query() params: PostParamsDto) {
    return this.postManageService.findAll(params);
  }

  /**
   * @description: 创建岗位
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: ResponseSavePostDto })
  @ApiOperation({ summary: '创建岗位' })
  create(@Body() body: SavePostDto) {
    return this.postManageService.create(body);
  }

  /**
   * @description: 查询岗位详情
   */
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({ type: ResponseSavePostDto })
  @ApiOperation({ summary: '查询岗位详情' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.postManageService.findOne(id);
  }

  /**
   * @description: 更新岗位
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOkResponse({ type: ResponseSavePostDto })
  @ApiOperation({ summary: '更新岗位' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: SavePostDto) {
    return this.postManageService.update(id, body);
  }

  /**
   * @description: 删除岗位
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOkResponse({ type: ResponseSavePostDto })
  @ApiOperation({ summary: '删除岗位' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.postManageService.remove(id);
  }
}
