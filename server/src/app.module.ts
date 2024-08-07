import { Module } from '@nestjs/common';

import { OrganazationModule } from '@/modules/administrative/organazation/organazation.module'; // 智能行政-组织管理
import { PostManageModule } from '@/modules/administrative/post-manage/post-manage.module'; // 智能行政-岗位管理
import { AuthModule } from '@/modules/auth/auth.module'; // 登录授权
import { FileUploadModule } from '@/modules/file-upload/file-upload.module'; // 文件上传
import { OperationLogModule } from '@/modules/system-manage/operation-log/operation-log.module'; // 系统管理 - 操作日志
import { UserManageModule } from '@/modules/system-manage/user-manage/user-manage.module'; // 系统管理 - 用户管理

@Module({
  imports: [OrganazationModule, PostManageModule, AuthModule, UserManageModule, FileUploadModule, OperationLogModule],
})
export class AppModule { }
