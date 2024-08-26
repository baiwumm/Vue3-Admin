/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-19 16:29:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 09:02:13
 * @Description: MenuManageController
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

import { MenuParamsDto } from './dto/params-menu.dto';
import { ResponseMenuDto, ResponseSaveMenuDto } from './dto/response-menu.dto';
import { SaveMenuDto } from './dto/save-menu.dto';
import { MenuManageService } from './menu-manage.service';

@ApiTags('系统管理-菜单管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/menu-manage')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class MenuManageController {
  constructor(private readonly menuManageService: MenuManageService) { }

  /**
   * @description: 查询菜单列表
   */
  @Get()
  @ApiOkResponse({ type: ResponseMenuDto })
  @ApiOperation({ summary: '获取菜单管理列表' })
  findAll(@Query() params: MenuParamsDto) {
    return this.menuManageService.findAll(params);
  }

  /**
   * @description: 创建菜单
   */
  @Post()
  @ApiOkResponse({ type: ResponseSaveMenuDto })
  @ApiOperation({ summary: '创建菜单' })
  create(@Body() body: SaveMenuDto) {
    return this.menuManageService.create(body);
  }

  /**
   * @description: 更新菜单
   */
  @Put(':id')
  @ApiOkResponse({ type: ResponseSaveMenuDto })
  @ApiOperation({ summary: '更新菜单' })
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: SaveMenuDto) {
    return this.menuManageService.update(id, body);
  }

  /**
   * @description: 删除菜单
   */
  @Delete(':id')
  @ApiOkResponse({ type: ResponseSaveMenuDto })
  @ApiOperation({ summary: '删除菜单' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.menuManageService.remove(id);
  }
}
