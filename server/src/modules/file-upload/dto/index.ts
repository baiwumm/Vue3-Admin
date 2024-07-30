/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-29 14:43:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-29 14:43:59
 * @Description: 上传文件 Dto
 */
import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    type: String,
    description: '文件流',
    format: 'binary',
  })
  file: BinaryData;
}
