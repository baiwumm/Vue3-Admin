/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-11 10:01:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-31 15:39:14
 * @Description: AuthController
 */
import { Controller, Get, Post, Res, Session } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档
import { Response } from 'express';
import svgCaptcha from 'svg-captcha';

import { responseMessage } from '@/utils';

import { AuthService } from './auth.service';
import { VerifyCodeResponseDto } from './dto/response-auth.dto';

@ApiTags('身份鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  /**
   * @description: 用户登录
   */
  @Post('/login')
  login() {
    return this.authService.login();
  }

  /**
   * @description: 获取用户信息
   */
  @Get('/getUserInfo')
  getUserInfo() {
    return this.authService.getUserInfo();
  }

  /**
   * @description: 获取图形验证码
   */
  @Get('captcha') //当请求该接口时，返回一张随机图片验证码
  @ApiOkResponse({ type: VerifyCodeResponseDto })
  @ApiOperation({ summary: '获取图形验证码' })
  async getCaptcha(@Session() session: Api.Common.SessionInfo, @Res() res: Response) {
    const captcha = svgCaptcha.createMathExpr({
      //可配置返回的图片信息
      size: 4, // 验证码长度
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
      noise: 2, // 干扰线条的数量
      width: 132,
      height: 40,
      fontSize: 50,
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#fff',
    });
    session.captchaCode = captcha.text; //使用session保存验证，用于登陆时验证
    res.type('image/svg+xml'); //指定返回的类型
    return res.send(responseMessage(captcha.data)); //给页面返回一张图片
  }
}
