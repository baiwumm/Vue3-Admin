/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-18 14:14:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-26 17:55:57
 * @Description: UserManageController
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

import { LoggerInterceptor } from '@/interceptor/logger.interceptor';

import { UserParamsDto } from './dto/params-user.dto';
import { ResponseSaveUserDto, ResponseUserDto } from './dto/response-user.dto';
import { ChangePasswordDto, SaveUserDto, UpdateUserTagsDto } from './dto/save-user.dto';
import { UserManageService } from './user-manage.service';

@ApiTags('系统管理-用户管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/user-manage')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class UserManageController {
  constructor(private readonly userManageService: UserManageService) { }

  /**
   * @description: 查询用户列表
   */
  @Get()
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiOperation({ summary: '获取用户管理列表' })
  findAll(@Query() params: UserParamsDto) {
    return this.userManageService.findAll(params);
  }

  /**
   * @description: 创建用户
   */
  @Post()
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiOperation({ summary: '创建用户' })
  create(@Body() body: SaveUserDto) {
    return this.userManageService.create(body);
  }

  /**
   * @description: 查询用户详情
   */
  @Get(':id')
  @ApiOkResponse({ type: ResponseSaveUserDto })
  @ApiOperation({ summary: '查询用户详情' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userManageService.findOne(id);
  }

  /**
   * @description: 更新用户
   */
  @Put(':id')
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiOperation({ summary: '更新用户' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: SaveUserDto,
    @Session() session: CommonType.SessionInfo,
  ) {
    return this.userManageService.update(id, body, session);
  }

  /**
   * @description: 删除用户
   */
  @Delete(':id')
  @ApiOkResponse({ type: ResponseSaveUserDto })
  @ApiOperation({ summary: '删除用户' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userManageService.remove(id);
  }

  /**
   * @description: 更新用户标签
   */
  @Patch('/updateUserTags')
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiOperation({ summary: '更新用户标签' })
  updateUserTags(@Session() session: CommonType.SessionInfo, @Body() body: UpdateUserTagsDto) {
    return this.userManageService.updateUserTags(session, body.tags);
  }

  /**
   * @description: 更改用户密码
   */
  @Patch('/changePassword')
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiOperation({ summary: '更改用户密码' })
  changePassword(@Body() body: ChangePasswordDto, @Session() session: CommonType.SessionInfo) {
    return this.userManageService.changePassword(body, session);
  }
}
