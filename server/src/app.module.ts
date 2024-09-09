/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-12 14:34:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-09-09 09:57:27
 * @Description: AppModule
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonModule } from 'nest-winston';

import { LoggerMiddleware } from '@/middleware/logger.middleware'; // 全局日志中间件
import { MessageModule } from '@/modules/administrative/message/message.module'; // 智能行政 - 消息公告
import { OrganazationModule } from '@/modules/administrative/organazation/organazation.module'; // 智能行政-组织管理
import { PostManageModule } from '@/modules/administrative/post-manage/post-manage.module'; // 智能行政-岗位管理
import { AuthModule } from '@/modules/auth/auth.module'; // 登录授权
import { FileUploadModule } from '@/modules/file-upload/file-upload.module'; // 文件上传
import { InternalizationModule } from '@/modules/system-manage/internalization/internalization.module'; // 系统管理 - 国际化
import { MenuManageModule } from '@/modules/system-manage/menu-manage/menu-manage.module'; // 系统管理 - 菜单管理
import { OperationLogModule } from '@/modules/system-manage/operation-log/operation-log.module'; // 系统管理 - 操作日志
import { RoleManageModule } from '@/modules/system-manage/role-manage/role-manage.module'; // 系统管理 - 角色管理
import { UserManageModule } from '@/modules/system-manage/user-manage/user-manage.module'; // 系统管理 - 用户管理

import winstonLogger from './config/winston.config';

@Module({
  imports: [
    OrganazationModule,
    PostManageModule,
    AuthModule,
    UserManageModule,
    FileUploadModule,
    OperationLogModule,
    InternalizationModule,
    MenuManageModule,
    RoleManageModule,
    MessageModule,
    WinstonModule.forRoot({
      transports: winstonLogger.transports,
      format: winstonLogger.format,
      defaultMeta: winstonLogger.defaultMeta,
      exitOnError: false, // 防止意外退出
    }),
    // 发布-订阅模块
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
