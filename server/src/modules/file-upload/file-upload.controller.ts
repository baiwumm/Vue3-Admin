/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-29 14:24:19
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-29 17:18:09
 * @Description: FileUploadController
 */
import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';

import { responseMessage } from '@/utils';

import { FileUploadDto } from './dto';

@Controller('upload')
export class FileUploadController {
  /**
   * @description: 上传单个文件
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('single-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单个文件上传',
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request): Api.Common.Response<Express.Multer.File> {
    // 获取客户端域名端口
    const hostname = req.headers['x-forwarded-host'] || req.hostname;
    const port = req.headers['x-forwarded-port'] || req.socket.localPort;
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    file.path = `${protocol}://${hostname}:${port}/static${file.path.replace(/\\/g, '/').replace(/upload/g, '')}`;
    return responseMessage(file);
  }
}
