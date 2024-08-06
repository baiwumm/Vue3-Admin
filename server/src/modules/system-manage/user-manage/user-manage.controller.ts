/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 14:14:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-06 17:47:17
 * @Description: UserManageController
 */

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { UserParamsDto } from './dto/params-user.dto';
import { ResponseSaveUserDto, ResponseUserDto } from './dto/response-user.dto';
import { SaveUserDto } from './dto/save-user.dto';
import { UserManageService } from './user-manage.service';

@ApiTags('系统管理-用户管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/user-manage')
export class UserManageController {
  constructor(private readonly userManageService: UserManageService) { }

  /**
   * @description: 查询用户列表
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiOperation({ summary: '获取用户管理列表' })
  findAll(@Query() params: UserParamsDto) {
    return this.userManageService.findAll(params);
  }

  /**
   * @description: 创建用户
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiOperation({ summary: '创建用户' })
  create(@Body() body: SaveUserDto) {
    return this.userManageService.create(body);
  }

  /**
   * @description: 查询用户详情
   */
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOkResponse({ type: ResponseSaveUserDto })
  @ApiOperation({ summary: '查询用户详情' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userManageService.findOne(id);
  }

  /**
   * @description: 更新用户
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOkResponse({ type: SaveUserDto })
  @ApiOperation({ summary: '更新用户' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: SaveUserDto) {
    return this.userManageService.update(id, body);
  }

  /**
   * @description: 删除用户
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOkResponse({ type: ResponseSaveUserDto })
  @ApiOperation({ summary: '删除用户' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userManageService.remove(id);
  }
}
