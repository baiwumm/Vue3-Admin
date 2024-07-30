/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-29 14:34:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-29 15:51:48
 * @Description: FileUploadModule
 */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import dayjs from 'dayjs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { checkDirAndCreate } from '@/utils';

import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => ({
        limits: {
          fileSize: 1024 * 1024 * 5, // 限制文件大小为 5MB
        },
        storage: diskStorage({
          // 配置文件上传后的文件夹路径
          destination: (_, file, cb) => {
            // 定义文件上传格式
            const allowedImageTypes = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp', 'svg', 'tiff']; // 图片
            const allowedOfficeTypes = ['xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx', 'pdf', 'txt', 'md', 'csv']; // office
            const allowedVideoTypes = ['mp4', 'avi', 'wmv']; // 视频
            const allowedAudioTypes = ['mp3', 'wav', 'ogg']; // 音频
            // 根据上传的文件类型将图片视频音频和其他类型文件分别存到对应英文文件夹
            const fileExtension = file.originalname.split('.').pop().toLowerCase();
            let temp = 'other';
            if (allowedImageTypes.includes(fileExtension)) {
              temp = 'image';
            } else if (allowedOfficeTypes.includes(fileExtension)) {
              temp = 'office';
            } else if (allowedVideoTypes.includes(fileExtension)) {
              temp = 'video';
            } else if (allowedAudioTypes.includes(fileExtension)) {
              temp = 'audio';
            }
            // 文件以年月命名文件夹
            const filePath = `upload/${temp}/${dayjs().format('YYYY-MM')}`;
            checkDirAndCreate(filePath); // 判断文件夹是否存在，不存在则自动生成
            return cb(null, `./${filePath}`);
          },
          filename: (_, file, cb) => {
            // 使用随机 uuid 生成文件名
            const filename = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
            return cb(null, filename);
          },
        }),
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule { }
