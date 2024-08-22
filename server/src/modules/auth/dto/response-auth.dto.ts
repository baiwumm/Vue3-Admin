/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-31 15:09:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-08-22 15:23:14
 * @Description: 响应体
 */
import { ApiProperty } from '@nestjs/swagger';
import type { Menu, User } from '@prisma/client';

import { ResponseDto } from '@/dto/response.dto';

/**
 * @description: 用户登录
 */
export class LoginResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '用户信息',
    default: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImxpemhpZW4iLCJzdWIiOiIxNzg1NzM3Yi04ZGFmLTRiYzEtYWU0OS04NzY5YzI1NmMyMDkiLCJpYXQiOjE3MjMxODkyMDEsImV4cCI6MTcyMzQ0ODQwMX0.-J1L-tSrQNO2etsTLg7yLm4s3SYRg0NT7NHqBiqM7m8',
    },
  })
  data: Pick<User, 'token'>;
}

/**
 * @description: 获取用户信息
 */
export class UserInfoResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '获取用户信息',
    default: {
      id: 'dddd7ba9-c1d4-4a6b-b946-f05e2f79880f',
      userName: 'Admin',
      cnName: '谢明伟',
      email: 'baiwumm@foxmail.com',
      phone: '15920157932',
      avatar: 'http://localhost:3000/static/image/2024-07/cc9e77ee-cf84-48e8-a9d0-dc3e9d21224c.jpeg',
      sex: 'MALE',
      status: 'ACTIVE',
      sort: 88,
      tags: ['热血青年', '热爱自由'],
      city: ['44', '4403', '440305'],
      address: '粤海街道',
      orgId: '32cab8f0-13df-4876-83c5-86089390dbb7',
      postId: '34f2d5e1-7378-46b3-8f0c-56cfdbb8f3eb',
      loginCount: 90,
      lastIp: '::1',
      lastLoginAt: '2024-08-20T07:31:48.356Z',
      createdAt: '2024-07-30T02:35:25.835Z',
      updatedAt: '2024-08-20T07:31:48.358Z',
    },
  })
  data: Record<string, any>;
}

/**
 * @description: 图形验证码
 */
export class VerifyCodeResponseDto extends ResponseDto {
  @ApiProperty({
    type: String,
    description: '图形验证码',
    default:
      '<svg xmlns="http://www.w3.org/2000/svg" width="132" height="40" viewBox="0,0,132,40"><rect width="100%" height="100%" fill="#fff"/><path d="M6 38 C51 36,87 35,117 2" stroke="#e79073" fill="none"/><path d="M11 21 C84 9,79 34,127 27" stroke="#aa69ec" fill="none"/><path fill="#e46be4" d="M63.63 32.86L63.67 32.90L63.66 32.89Q63.04 32.84 62.43 32.88L62.39 32.83L62.41 32.86Q61.89 33.05 61.27 33.05L61.14 32.92L61.24 33.02Q61.68 29.99 61.68 26.93L61.70 26.94L61.67 26.92Q59.95 26.86 59.13 26.86L59.20 26.93L59.08 26.81Q58.44 26.92 56.81 26.85L56.67 26.71L56.78 26.82Q56.85 26.62 56.68 24.41L56.71 24.44L56.64 24.37Q58.82 24.74 61.47 24.74L61.59 24.86L61.49 24.77Q61.33 20.90 60.95 18.59L60.94 18.58L61.02 18.65Q61.75 18.77 62.46 18.77L62.45 18.76L63.90 18.74L63.94 18.78Q63.61 22.46 63.61 24.77L63.74 24.91L63.65 24.82Q65.61 24.84 68.46 24.53L68.53 24.60L68.53 24.60Q68.39 25.75 68.39 26.84L68.31 26.76L68.44 26.89Q68.14 26.83 67.43 26.86L67.40 26.84L67.32 26.75Q66.47 26.79 65.93 26.82L65.97 26.87L65.93 26.83Q65.94 26.84 63.56 26.84L63.56 26.84L63.57 29.91L63.68 30.01Q63.67 31.46 63.77 32.99ZM68.87 24.13L68.87 24.12L68.92 24.17Q67.12 24.34 65.45 24.41L65.43 24.39L65.45 24.41Q65.60 21.54 65.98 19.87L66.15 20.05L66.17 20.06Q65.45 20.02 64.19 20.16L64.11 20.08L64.35 18.31L64.24 18.21Q61.96 18.27 60.46 18.17L60.51 18.21L60.49 18.19Q61.07 21.05 61.24 24.52L61.25 24.53L61.24 24.51Q59.59 24.39 56.29 23.85L56.28 23.84L56.22 23.78Q56.49 24.86 56.49 27.21L56.56 27.28L57.89 27.25L57.97 27.34Q57.96 27.97 57.83 29.23L57.70 29.10L61.32 28.94L61.21 28.83Q61.15 31.80 60.87 33.43L60.89 33.45L60.89 33.45Q61.57 33.44 62.83 33.34L62.72 33.24L62.67 33.19Q62.74 33.87 62.70 35.06L62.65 35.00L62.78 35.14Q63.09 34.96 66.32 35.10L66.46 35.24L66.40 35.19Q65.52 32.37 65.32 28.84L65.37 28.88L65.43 28.94Q68.31 28.93 70.18 29.27L70.12 29.22L70.26 29.36Q70.11 28.53 70.11 27.68L70.07 27.64L70.11 25.98L70.09 25.95Q69.76 25.83 69.29 25.87L69.47 26.05L68.65 25.95L68.75 26.05Q68.76 25.34 68.87 24.12Z"/><path fill="#e07ee0" d="M102.03 31.59L102.00 31.55L101.97 31.53Q102.34 32.50 102.81 34.30L102.81 34.30L102.69 34.18Q98.96 33.04 94.85 33.28L94.86 33.28L94.84 33.26Q90.76 33.50 87.19 35.26L87.17 35.24L87.08 35.16Q87.33 34.59 87.36 34.66L87.47 34.77L87.37 34.67Q90.66 31.09 94.16 27.15L94.28 27.27L94.17 27.16Q98.15 22.74 99.20 18.55L99.16 18.52L99.23 18.59Q99.74 17.13 98.60 16.07L98.52 15.99L98.61 16.08Q97.39 14.95 95.79 15.08L95.80 15.09L95.77 15.05Q95.42 14.98 95.11 14.98L95.22 15.09L95.22 15.08Q93.73 14.96 92.61 15.77L92.76 15.92L92.69 15.85Q91.52 17.06 91.72 19.44L91.77 19.49L91.64 19.36Q90.10 19.11 89.01 18.70L89.01 18.70L89.09 18.78Q88.84 17.44 88.77 16.15L88.77 16.15L88.73 16.11Q88.67 14.65 89.21 13.63L89.28 13.70L89.33 13.75Q90.87 12.47 93.86 12.47L93.90 12.51L95.43 12.48L95.53 12.58Q97.40 12.44 98.25 12.54L98.32 12.61L98.27 12.56Q102.18 12.97 102.41 15.14L102.37 15.09L102.38 15.10Q102.49 15.66 102.42 16.38L102.49 16.44L102.38 16.33Q102.38 16.94 102.24 17.55L102.19 17.50L102.37 17.68Q100.76 24.77 94.00 30.89L93.97 30.87L93.97 30.87Q95.25 30.75 96.47 30.75L96.48 30.76L96.53 30.80Q99.43 30.82 101.98 31.53ZM101.44 12.91L101.45 12.92L101.50 12.97Q100.06 12.38 98.53 12.31L98.45 12.23L95.46 12.13L95.40 12.08Q91.39 11.80 89.42 12.79L89.42 12.79L89.56 12.92Q88.46 14.00 88.46 15.84L88.47 15.85L88.51 15.89Q88.60 16.59 88.88 19.11L88.93 19.16L88.81 19.04Q89.25 19.21 90.30 19.48L90.35 19.53L90.36 20.46L90.33 20.43Q90.36 20.90 90.43 21.37L90.39 21.34L90.45 21.40Q91.54 21.47 93.75 21.67L93.65 21.57L93.76 21.68Q93.78 21.40 93.78 21.09L93.67 20.98L93.61 20.92Q93.77 19.44 94.85 18.24L94.82 18.21L94.75 18.14Q95.83 16.92 97.43 17.02L97.44 17.04L97.40 17.00Q98.11 17.06 98.79 17.19L98.75 17.15L98.90 17.30Q99.00 17.65 99.07 18.02L98.99 17.94L99.11 18.06Q99.12 18.41 99.05 18.71L98.91 18.57L98.89 18.55Q97.81 22.84 93.87 27.16L93.84 27.13L94.00 27.29Q92.01 29.21 87.15 34.61L87.21 34.67L87.25 34.71Q86.90 35.29 86.60 35.80L86.72 35.92L86.75 35.95Q88.17 35.16 89.53 34.69L89.44 34.59L89.40 34.56Q88.79 35.10 87.94 36.43L88.01 36.49L88.04 36.53Q87.85 36.74 87.75 37.05L87.85 37.15L87.79 37.09Q92.09 35.20 96.98 35.37L97.01 35.40L96.98 35.37Q102.04 35.50 106.12 37.61L106.15 37.64L105.33 35.80L105.22 35.69Q104.77 34.63 104.53 33.92L104.54 33.92L104.50 33.89Q103.90 33.56 102.82 33.19L102.80 33.17L102.64 33.01Q102.64 32.50 102.30 31.27L102.24 31.21L102.17 31.15Q100.36 30.80 98.32 30.63L98.13 30.44L98.28 30.58Q102.45 26.49 103.81 19.12L103.73 19.04L104.01 16.57L103.95 16.51Q103.96 14.99 102.88 14.38L102.80 14.31L102.74 14.28L102.83 14.37Q102.68 14.19 102.62 14.19L102.73 14.30L102.75 14.32Q102.47 13.50 101.48 12.95Z"/><path fill="#dddd59" d="M26.38 27.09L26.45 27.16L26.49 27.19Q29.18 26.80 32.04 26.90L32.08 26.94L32.04 26.90Q31.89 24.51 31.89 22.37L32.07 22.54L31.94 22.42Q31.91 20.17 32.08 17.89L32.13 17.95L32.18 18.00Q30.98 19.42 26.32 27.03ZM35.28 33.71L35.24 33.67L35.20 33.63Q33.82 33.47 32.22 33.40L32.09 33.27L32.14 33.33Q31.99 31.24 31.89 29.03L31.86 29.00L31.96 29.10Q27.03 28.76 22.82 30.02L22.91 30.11L22.97 30.17Q22.94 29.60 23.11 28.71L23.13 28.72L23.25 28.85Q24.74 25.93 27.94 20.32L27.90 20.28L27.95 20.32Q30.51 15.95 33.57 12.49L33.62 12.53L33.61 12.53Q34.41 12.38 35.91 12.14L35.80 12.03L35.94 12.17Q34.09 17.77 34.09 24.06L34.10 24.07L34.14 24.10Q34.27 25.56 34.33 26.88L34.16 26.70L35.44 26.93L35.36 26.85Q35.90 26.88 36.44 26.98L36.40 26.95L36.59 27.13Q36.63 27.95 36.87 29.69L36.87 29.69L36.88 29.70Q35.77 29.44 34.45 29.27L34.40 29.23L34.44 29.26Q34.64 31.07 35.26 33.68ZM36.79 26.75L36.76 26.72L36.78 26.75Q36.55 26.62 36.38 26.62L36.43 26.67L35.95 26.53L36.09 26.67Q35.92 25.28 35.92 24.02L35.94 24.03L35.98 24.07Q35.95 18.33 37.78 12.96L37.79 12.97L37.77 12.95Q37.19 13.28 35.90 13.62L35.86 13.58L35.77 13.50Q36.03 12.88 36.44 11.62L36.37 11.55L36.49 11.67Q35.22 11.89 33.38 12.09L33.44 12.15L33.44 12.15Q29.89 15.98 25.24 24.35L25.22 24.33L27.16 21.14L27.19 21.16Q26.82 22.09 26.58 22.60L26.46 22.48L22.61 30.66L22.63 30.68Q23.14 30.47 24.16 30.13L24.16 30.13L23.94 30.26L23.95 30.27Q23.87 30.90 23.60 32.02L23.59 32.01L23.66 32.09Q27.22 30.78 31.54 30.95L31.67 31.08L31.73 31.14Q31.61 31.84 31.78 33.61L31.76 33.58L31.84 33.67Q32.77 33.65 33.73 33.75L33.76 33.79L33.76 33.78Q33.80 34.30 34.03 35.52L34.15 35.64L34.21 35.70Q35.90 35.89 38.58 36.70L38.45 36.57L38.54 36.66Q37.65 34.75 36.83 31.83L36.83 31.82L38.17 32.28L38.05 32.16Q38.71 32.42 39.33 32.72L39.33 32.73L39.39 32.79Q38.53 30.40 38.39 28.90L38.41 28.92L38.37 28.87Q37.95 28.84 36.93 28.63L37.03 28.73L36.85 28.55Q36.70 27.44 36.70 26.66ZM29.60 26.57L29.58 26.55L29.60 26.56Q30.21 25.34 31.61 23.07L31.76 23.22L31.57 23.03Q31.60 23.91 31.56 24.76L31.73 24.92L31.62 24.82Q31.64 25.71 31.67 26.56L31.60 26.50L31.61 26.51Q31.08 26.44 30.57 26.44L30.75 26.62L30.66 26.54Q30.22 26.64 29.67 26.64Z"/></svg>',
  })
  data: string;
}

/**
 * @description: 国际化层级对象
 */
export class LocalesResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '国际化层级对象',
    default: {
      'zh-CN': {
        system: {
          updateTitle: '系统版本更新通知',
          title: 'Xmw Admin',
        },
      },
      'en-US': {
        system: {
          updateTitle: 'System version update notification',
          title: 'Xmw Admin',
        },
      },
      'ja-JP': {
        system: {
          updateTitle: 'システム更新のお知らせです',
          title: 'Xmw Admin',
        },
      },
      'zh-TW': {
        system: {
          updateTitle: '系統版本更新通知',
          title: 'Xmw Admin',
        },
      },
    },
  })
  data: Record<string, any>;
}

/**
 * @description: 掘金文章列表
 */
export class JuejinResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '掘金文章列表',
    default: {
      list: [
        {
          article_id: '7402248792285675554',
          article_info: {
            article_id: '7402248792285675554',
            user_id: '1917147257534279',
            category_id: '6809637767543259144',
            tag_ids: [6809641149037445000],
            visible_level: 0,
            link_url: '',
            cover_image:
              'https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/16602a5ecc494bc89dc1b07dab500224~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg55m96Zu-6Iyr6Iyr5Li2:q75.awebp?rk3s=f64ab15b&x-expires=1724744728&x-signature=NRk%2FVF8kQ6pXTfy6MqqwKHRwja8%3D',
            is_gfw: 0,
            title: 'Nest.js 实战 (九)：使用拦截器记录用户 CURD 操作日志',
            brief_content:
              '这篇文章介绍了在Nest.js中如何实现记录用户CURD操作的需求。通过创建Prisma模型，添加Log模型，并通过编写LoggerInterceptor拦截器，实现了记录用户操作的功能。',
            is_english: 0,
            is_original: 1,
            user_index: 0,
            original_type: 0,
            original_author: '',
            content: '',
            ctime: '1723534979',
            mtime: '1723534990',
            rtime: '1723534989',
            draft_id: '7402170596690575375',
            view_count: 62,
            collect_count: 1,
            digg_count: 0,
            comment_count: 0,
            hot_index: 3,
            is_hot: 0,
            rank_index: 0.00391559,
            status: 2,
            verify_status: 1,
            audit_status: 2,
            mark_content: '',
            display_count: 0,
            is_markdown: 1,
            app_html_content: '',
            version: 1,
            web_html_content: null,
            meta_info: null,
            catalog: null,
            homepage_top_time: -62135596800,
            homepage_top_status: 0,
            content_count: 789,
            read_time: '3分钟',
            pics_expire_time: 1724744728,
          },
          author_user_info: {
            user_id: '1917147257534279',
            user_name: '白雾茫茫丶',
            company: '元宇宙',
            job_title: '全栈工程师',
            avatar_large:
              'https://p26-passport.byteacctimg.com/img/user-avatar/e20ed5698289a9126dc1665ae1dde55e~300x300.image',
            level: 4,
            description: '身后没有灯火、身前白雾茫茫',
            followee_count: 2,
            follower_count: 133,
            post_article_count: 60,
            digg_article_count: 31,
            got_digg_count: 285,
            got_view_count: 46356,
            post_shortmsg_count: 99,
            digg_shortmsg_count: 2,
            isfollowed: false,
            favorable_author: 0,
            power: 2406,
            study_point: 0,
            university: {
              university_id: '0',
              name: '',
              logo: '',
            },
            major: {
              major_id: '0',
              parent_id: '0',
              name: '',
            },
            student_status: 0,
            select_event_count: 0,
            select_online_course_count: 0,
            identity: 0,
            is_select_annual: false,
            select_annual_rank: 0,
            annual_list_type: 0,
            extraMap: {},
            is_logout: 0,
            annual_info: [],
            account_amount: 0,
            user_growth_info: {
              user_id: 1917147257534279,
              jpower: 2406,
              jscore: 1974.8,
              jpower_level: 4,
              jscore_level: 5,
              jscore_title: '先锋掘友',
              author_achievement_list: [],
              vip_level: 0,
              vip_title: '',
              jscore_next_level_score: 2000,
              jscore_this_level_mini_score: 500,
              vip_score: 0,
            },
            is_vip: false,
            become_author_days: 0,
            collection_set_article_count: 0,
            recommend_article_count_daily: 0,
            article_collect_count_daily: 0,
            user_priv_info: {
              administrator: 0,
              builder: 0,
              favorable_author: 0,
              book_author: 0,
              forbidden_words: 0,
              can_tag_cnt: 0,
              auto_recommend: 0,
              signed_author: 0,
              popular_author: 0,
              can_add_video: 0,
            },
          },
          category: {
            category_id: '6809637767543259144',
            category_name: '前端',
            category_url: 'frontend',
            rank: 2,
            back_ground: 'https://lc-mhke0kuv.cn-n1.lcfile.com/8c95587526f346c0.png',
            icon: 'https://lc-mhke0kuv.cn-n1.lcfile.com/1c40f5eaba561e32.png',
            ctime: 1457483942,
            mtime: 1432503190,
            show_type: 3,
            item_type: 2,
            promote_tag_cap: 4,
            promote_priority: 2,
          },
          tags: [
            {
              id: 2547062,
              tag_id: '6809641149037445133',
              tag_name: 'NestJS',
              color: '',
              icon: 'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/1544153812581dd3f4c7af78e7b3189d8d05d518ab909.jpg~tplv-t2oaga2asx-image.image',
              back_ground: '',
              show_navi: 0,
              ctime: 1544079631,
              mtime: 1724135583,
              id_type: 9,
              tag_alias: '',
              post_article_count: 1392,
              concern_user_count: 5377,
            },
          ],
          user_interact: {
            id: 7402248792285676000,
            omitempty: 2,
            user_id: 0,
            is_digg: false,
            is_follow: false,
            is_collect: false,
            collect_set_count: 0,
          },
          org: {
            is_followed: false,
          },
          req_id: '2024082015452895906A2965644600DEF8',
          status: {
            push_status: 0,
          },
          theme_list: [],
          extra: {
            extra: '',
          },
        },
      ],
      total: 60,
    },
  })
  data: {
    list: any[];
    total: number;
  };
}

/**
 * @description: 获取常量路由
 */
export class ConstantRoutesResponseDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '获取常量路由',
    default: [
      {
        name: 'login',
        path: '/login',
        component: 'layout.blank$view.login',
        meta: {
          order: 0,
          title: 'login',
          i18nKey: 'route.login',
          constant: true,
          multiTab: false,
          keepAlive: false,
          hideInMenu: true,
        },
      },
      {
        name: '403',
        path: '/403',
        component: 'layout.blank$view.403',
        meta: {
          order: 0,
          title: '403',
          i18nKey: 'route.403',
          constant: true,
          multiTab: false,
          keepAlive: false,
          hideInMenu: true,
        },
      },
      {
        name: '404',
        path: '/404',
        component: 'view.404',
        meta: {
          order: 0,
          title: '404',
          i18nKey: 'route.404',
          constant: true,
          multiTab: false,
          keepAlive: false,
          hideInMenu: true,
        },
      },
      {
        name: '500',
        path: '/500',
        component: 'layout.blank$view.500',
        meta: {
          order: 0,
          title: '500',
          i18nKey: 'route.500',
          constant: true,
          multiTab: false,
          keepAlive: false,
          hideInMenu: true,
        },
      },
      {
        name: 'iframe-page',
        path: '/iframe-page/:url',
        component: 'layout.base$view.iframe-page',
        meta: {
          order: 0,
          title: 'iframe-page',
          i18nKey: 'route.iframe-page',
          constant: true,
          multiTab: false,
          keepAlive: true,
          hideInMenu: true,
        },
      },
    ],
  })
  data: Pick<Menu, 'name' | 'path' | 'component' | 'meta'>[];
}

/**
 * @description: 获取用户路由
 */
export class UserRoutesResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '获取用户路由',
    default: {
      home: 'home',
      routes: [
        {
          id: '8f16a2cd-b613-4419-bfa5-996f16beaa6a',
          parentId: null,
          name: 'home',
          path: '/home',
          component: 'layout.base$view.home',
          meta: {
            icon: 'mdi:monitor-dashboard',
            order: 1,
            title: 'home',
            i18nKey: 'route.home',
            constant: false,
            multiTab: false,
            keepAlive: true,
            hideInMenu: false,
          },
        },
        {
          id: '03404a66-50aa-4b21-8c93-9dcddaeffdb7',
          parentId: null,
          name: 'administrative',
          path: '/administrative',
          component: 'view.administrative',
          meta: {
            icon: 'ri:quill-pen-line',
            order: 2,
            title: 'administrative',
            i18nKey: 'route.administrative',
            constant: false,
            multiTab: false,
            keepAlive: true,
            hideInMenu: false,
          },
          children: [
            {
              id: 'dea4e038-592f-4532-ac86-c7de25a3416c',
              parentId: '03404a66-50aa-4b21-8c93-9dcddaeffdb7',
              name: 'administrative_organization',
              path: '/administrative/organization',
              component: 'view.administrative_organization',
              meta: {
                icon: 'ri:exchange-2-line',
                order: 0,
                title: 'administrative_organization',
                i18nKey: 'route.administrative_organization',
                constant: false,
                multiTab: false,
                keepAlive: true,
                hideInMenu: false,
              },
            },
            {
              id: '5dc9be35-dfad-493e-99c4-fdca4ddff1f5',
              parentId: '03404a66-50aa-4b21-8c93-9dcddaeffdb7',
              name: 'administrative_post-manage',
              path: '/administrative/post-manage',
              component: 'view.administrative_post-manage',
              meta: {
                icon: 'ri:contacts-book-3-line',
                order: 0,
                title: 'administrative_post-manage',
                i18nKey: 'route.administrative_post-manage',
                constant: false,
                multiTab: false,
                keepAlive: false,
                hideInMenu: false,
              },
            },
          ],
        },
        {
          id: '572c5097-d28f-48b4-899d-3aaf46b8d668',
          parentId: null,
          name: 'system-manage',
          path: '/system-manage',
          component: 'view.system-manage',
          meta: {
            icon: 'ri:settings-2-line',
            order: 3,
            title: 'system-manage',
            i18nKey: 'route.system-manage',
            constant: false,
            multiTab: false,
            keepAlive: false,
            hideInMenu: false,
          },
          children: [
            {
              id: '1ee566d9-d5ef-456a-8009-d67bb026b4b0',
              parentId: '572c5097-d28f-48b4-899d-3aaf46b8d668',
              name: 'system-manage_user-manage',
              path: '/system-manage/user-manage',
              component: 'view.system-manage_user-manage',
              meta: {
                icon: 'ri:user-settings-line',
                order: 0,
                title: 'system-manage_user-manage',
                i18nKey: 'route.system-manage_user-manage',
                constant: false,
                multiTab: false,
                keepAlive: false,
                hideInMenu: false,
              },
            },
            {
              id: '28a745e9-ff3a-49c2-bebc-e269146652e6',
              parentId: '572c5097-d28f-48b4-899d-3aaf46b8d668',
              name: 'system-manage_menu-manage',
              path: '/system-manage/menu-manage',
              component: 'view.system-manage_menu-manage',
              meta: {
                icon: 'ri:route-fill',
                order: 0,
                title: 'system-manage_menu-manage',
                i18nKey: 'route.system-manage_menu-manage',
                constant: false,
                multiTab: false,
                keepAlive: false,
                hideInMenu: false,
              },
            },
            {
              id: 'aaf9caab-e4cc-491c-bf9c-d5fe81b9d867',
              parentId: '572c5097-d28f-48b4-899d-3aaf46b8d668',
              name: 'system-manage_internalization',
              path: '/system-manage/internalization',
              component: 'view.system-manage_internalization',
              meta: {
                icon: 'ri:global-line',
                order: 0,
                title: 'system-manage_internalization',
                i18nKey: 'route.system-manage_internalization',
                constant: false,
                multiTab: false,
                keepAlive: false,
                hideInMenu: false,
              },
            },
            {
              id: '596eba6b-6b80-495a-bf9d-f90fdfb9e49d',
              parentId: '572c5097-d28f-48b4-899d-3aaf46b8d668',
              name: 'system-manage_operation-log',
              path: '/system-manage/operation-log',
              component: 'view.system-manage_operation-log',
              meta: {
                icon: 'ri:draft-line',
                order: 0,
                title: 'system-manage_operation-log',
                i18nKey: 'route.system-manage_operation-log',
                constant: false,
                multiTab: false,
                keepAlive: false,
                hideInMenu: false,
              },
            },
          ],
        },
        {
          id: '4d238c00-d8c0-4ed2-a803-41caf772820e',
          parentId: null,
          name: 'about',
          path: '/about',
          component: 'layout.base$view.about',
          meta: {
            icon: 'fluent:book-information-24-regular',
            order: 0,
            title: 'about',
            i18nKey: 'route.about',
            constant: false,
            multiTab: false,
            keepAlive: false,
            hideInMenu: false,
          },
        },
      ],
    },
  })
  data: {
    home: string;
    routes: Pick<Menu, 'name' | 'path' | 'component' | 'meta'>[];
  };
}

/**
 * @description: 判断路由名称是否存在
 */
export class RouteExistResponseDto extends ResponseDto {
  @ApiProperty({
    type: Boolean,
    description: '路由名称是否存在',
    default: true,
  })
  data: boolean;
}
