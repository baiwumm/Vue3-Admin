/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-09 15:26:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-30 15:10:21
 * @Description: 全局入口文件
 */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

import { AllExceptionsFilter } from '@/filter/all-exception.filter'; // 全局异常过滤器
import { HttpExceptionsFilter } from '@/filter/http-exception.filter'; // http 异常过滤器
import { ValidationPipe } from '@/pipe/validation.pipe'; // 参数校验

import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  // 全局参数校验
  app.useGlobalPipes(new ValidationPipe());

  // 配置文件访问  文件夹为静态目录，以达到可直接访问下面文件的目的
  const rootDir = join(__dirname, '..');
  app.use('/static', express.static(join(rootDir, '/upload')));

  // 构建swagger文档
  const options = new DocumentBuilder()
    .setTitle('vue3-admin')
    .setDescription('Background system based on Nest.js + Vue3 full stack development')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
