/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-29 14:43:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-31 15:21:52
 * @Description: 上传文件 Dto
 */
import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '@/dto/response.dto';

export class FileUploadDto {
  @ApiProperty({
    type: String,
    description: '文件流',
    format: 'binary',
  })
  file: BinaryData;
}

/**
 * @description: 单个文件上传
 */
export class SingleFileResponseDto extends ResponseDto {
  @ApiProperty({
    type: String,
    description: '单个文件上传',
    default: {
      fieldname: 'file',
      originalname: '1.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: './upload/image/2024-07',
      filename: '07614707-436a-49b3-b8e3-1fcbd1398600.jpeg',
      path: 'http://localhost:3000/static/image/2024-07/07614707-436a-49b3-b8e3-1fcbd1398600.jpeg',
      size: 40232,
    },
  })
  data: Record<string, any>;
}
