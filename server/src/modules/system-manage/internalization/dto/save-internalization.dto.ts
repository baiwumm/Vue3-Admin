/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-08-15 10:44:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-15 11:01:13
 * @Description: 保存国际化数据
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class SaveInternalizationDto {
  @ApiProperty({
    type: String,
    description: '国际化字段',
    default: 'login',
  })
  @IsNotEmpty({ message: '国际化字段必填' })
  name: string;

  @ApiProperty({
    type: String,
    description: '父级id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { message: 'parentId 参数不正确' })
  parentId?: string;

  @ApiProperty({
    type: String,
    description: '中文',
    default: '统版本更新通知',
    required: false,
  })
  zhCN?: string;

  @ApiProperty({
    type: String,
    description: '英文',
    default: 'System version update notification',
    required: false,
  })
  enUS?: string;

  @ApiProperty({
    type: String,
    description: '日文',
    default: 'システム更新のお知らせです',
    required: false,
  })
  jaJP?: string;

  @ApiProperty({
    type: String,
    description: '繁体中文',
    default: '系統版本更新通知',
    required: false,
  })
  zhTW?: string;
}
