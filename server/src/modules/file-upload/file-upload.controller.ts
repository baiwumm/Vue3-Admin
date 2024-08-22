/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-29 14:24:19
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-02 10:01:55
 * @Description: FileUploadController
 */
import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { responseMessage } from '@/utils';

import { FileUploadDto, SingleFileResponseDto } from './dto';

@ApiTags('文件上传')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('upload')
export class FileUploadController {
  /**
   * @description: 上传单个文件
   */
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('single-file')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: SingleFileResponseDto })
  @ApiBody({
    description: '单个文件上传',
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request): CommonType.Response<Express.Multer.File> {
    // 获取客户端域名端口
    const hostname = req.headers['x-forwarded-host'] || req.hostname;
    const port = req.headers['x-forwarded-port'] || req.socket.localPort;
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    file.path = `${protocol}://${hostname}:${port}/static${file.path.replace(/\\/g, '/').replace(/upload/g, '')}`;
    return responseMessage(file);
  }
}
