/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-09 15:26:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-07 09:58:31
 * @Description: 全局入口文件
 */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import session from 'express-session';
import { join } from 'path';

import { AllExceptionsFilter } from '@/filter/all-exception.filter'; // 全局异常过滤器
import { HttpExceptionsFilter } from '@/filter/http-exception.filter'; // http 异常过滤器
import { ValidationPipe } from '@/pipe/validation.pipe'; // 参数校验

import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.json()); // 用于解析 JSON 格式的请求体
  app.use(express.urlencoded({ extended: true })); // 用于解析 URL 编码格式的请求体

  // 设置信任代理
  app.set('trust proxy', true);

  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  // 全局参数校验
  app.useGlobalPipes(new ValidationPipe());

  // 配置 session
  app.use(
    session({
      secret: 'baiwumm', // 签名
      resave: false, // 强制保存 sseion 即使它并没有变化，默认为true
      saveUninitialized: false, // 强制将未初始化的 session 存储
    }),
  );

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
