/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-22 10:24:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 09:02:30
 * @Description: RoleManageController
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { LoggerInterceptor } from '@/interceptor/logger.interceptor';

import { RoleParamsDto } from './dto/params-role.dto';
import { ResponseDeleteRoleDto, ResponseRoleDto } from './dto/response-role.dto';
import { ResponseSaveRoleDto } from './dto/response-role.dto';
import { SaveRoleDto } from './dto/save-role.dto';
import { RoleManageService } from './role.manage.service';

@ApiTags('系统管理-角色管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/role-manage')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class RoleManageController {
  constructor(private readonly roleManageService: RoleManageService) { }

  /**
   * @description: 查询角色列表
   */
  @Get()
  @ApiOkResponse({ type: ResponseRoleDto })
  @ApiOperation({ summary: '获取角色管理列表' })
  findAll(@Query() params: RoleParamsDto) {
    return this.roleManageService.findAll(params);
  }

  /**
   * @description: 创建角色
   */
  @Post()
  @ApiOkResponse({ type: ResponseSaveRoleDto })
  @ApiOperation({ summary: '创建角色' })
  create(@Body() body: SaveRoleDto) {
    return this.roleManageService.create(body);
  }

  /**
   * @description: 更新角色
   */
  @Put(':id')
  @ApiOkResponse({ type: SaveRoleDto })
  @ApiOperation({ summary: '更新角色' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: SaveRoleDto) {
    return this.roleManageService.update(id, body);
  }

  /**
   * @description: 删除角色
   */
  @Delete(':id')
  @ApiOkResponse({ type: ResponseDeleteRoleDto })
  @ApiOperation({ summary: '删除角色' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.roleManageService.remove(id);
  }
}
