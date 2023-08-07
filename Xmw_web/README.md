简体中文 | [English](./README.en-US.md)

<p align="center"><img width="100" src="https://cdn.baiwumm.com/project/vue3-admin/logo.png!baiwu" alt="Vue3 Admin Logo"></p>

<h1 align="center">Vue3 Admin</h1>

<p align="center">
  <a href="https://github.com/vuejs/core/" target="_blank">
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/vue.svg" alt="vue">
  </a>
  <a href="https://github.com/vueComponent/ant-design-vue/" target="_blank">
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/antd.svg" alt="Ant Design of Vue">
  </a>
  <a href="https://github.com/eggjs/egg/" target="_blank">
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/egg.svg" alt="egg">
  </a>
  <a>
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/build.svg">
  </a>
</p>

## 项目简介

[Vue3 Admin](http://vue3.baiwumm.com/) 是一个后台管理系统解决方案，它基于 [Vue3.0](https://github.com/vuejs/core/) 和 [Vben Admin](https://github.com/anncwb/vue-vben-admin/)实现，它使用了全新的技术栈：Vue3、Vite、TypeScript等，提供了完善的前后端权限管理方案，丰富的主题配置及黑暗主题适配，对日常使用频率较高的组件二次封装,满足基础工作需求，希望本项目可以帮助到您。

- 😝 线上预览: https://vue3.baiwumm.com

- 🔑 用户名：**admin**，密码：**123456**

- 🔗 后端传送门：[Xmw_server](../Xmw_server)

- ❤️ star：**如果可以的话，请顺手给个star，表示对作者的鼓励，万分感谢！**

- 😝 Vue2版本： [Vue2 Admin](https://github.com/baiwumm/Vue2-Admin/)

## 环境和依赖

- node (Node.js 版本要求12.x以上，且不能为13.x版本，这里推荐 14.x 及以上)
- yarn (必须使用Yarn1.x，否则依赖可能安装不上)
- vite
- @vue/cli

> 推荐本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具

## 项目运行

- 拉取项目代码
```bash
git clone https://github.com/baiwumm/Vue3-Admin.git
cd Vue3-Admin
cd Xmw_web
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn run serve
```

- 编译项目
```
yarn run build
```

## 目录结构

```
├── build # 打包脚本相关
│   ├── config # 配置文件
│   ├── generate # 生成器
│   ├── script # 脚本
│   └── vite # vite配置
├── mock # mock文件夹
├── public # 公共静态资源目录
├── src # 主目录
│   ├── api # 接口文件
│   ├── assets # 资源文件
│   │   ├── icons # icon sprite 图标文件夹
│   │   ├── images # 项目存放图片的文件夹
│   │   └── svg # 项目存放svg图片的文件夹
│   ├── components # 公共组件
│   ├── design # 样式文件
│   ├── directives # 指令
│   ├── enums # 枚举/常量
│   ├── hooks # hook
│   │   ├── component # 组件相关hook
│   │   ├── core # 基础hook
│   │   ├── event # 事件相关hook
│   │   ├── setting # 配置相关hook
│   │   └── web # web相关hook
│   ├── layouts # 布局文件
│   │   ├── default # 默认布局
│   │   ├── iframe # iframe布局
│   │   └── page # 页面布局
│   ├── locales # 多语言
│   ├── logics # 逻辑
│   ├── main.ts # 主入口
│   ├── router # 路由配置
│   ├── settings # 项目配置
│   │   ├── componentSetting.ts # 组件配置
│   │   ├── designSetting.ts # 样式配置
│   │   ├── encryptionSetting.ts # 加密配置
│   │   ├── localeSetting.ts # 多语言配置
│   │   ├── projectSetting.ts # 项目配置
│   │   └── siteSetting.ts # 站点配置
│   ├── store # 数据仓库
│   ├── utils # 工具类
│   └── views # 页面
├── test # 测试
│   └── server # 测试用到的服务
│       ├── api # 测试服务器
│       ├── upload # 测试上传服务器
│       └── websocket # 测试ws服务器
├── types # 类型文件
├── vite.config.ts # vite配置文件
└── windi.config.ts # windcss配置文件

```

## 功能模块

```
- 登录 / 注销

- 工作台

- 综合组件
  - 组织架构
  - 新闻公告

- 个人中心

- 系统设置
  - 用户管理
  - 菜单管理
  - 角色管理
  - 组织管理
  - 岗位管理
  - 操作日志
  - 字典管理
  - 国际化

- 功能页
  - 引导页
  - 图像识别
  - 自定义指令
  - 多级菜单
  - 二维码
  - 瀑布流
  - 懒加载
  - 虚拟滚动
  - 验证码

```

## 演示图

| ![](https://cdn.baiwumm.com/project/vue3-admin/demo/login.jpg!baiwu) | ![](https://cdn.baiwumm.com/project/vue3-admin/demo/workbench.jpg!baiwu) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://cdn.baiwumm.com/project/vue3-admin/demo/personal.jpg!baiwu) | ![](https://cdn.baiwumm.com/project/vue3-admin/demo/menuManagement.jpg!baiwu) |
| ![](https://cdn.baiwumm.com/project/vue3-admin/demo/customDirective.jpg!baiwu) | ![](https://cdn.baiwumm.com/project/vue3-admin/demo/qrcode.jpg!baiwu) |
| ![](https://cdn.baiwumm.com/project/vue3-admin/demo/captcha.jpg!baiwu) | ![](https://cdn.baiwumm.com/project/vue3-admin/demo/lazyLoad.png!baiwu) |

## 特别鸣谢（感谢巨人）

| 项目                                                          |
| ---------------------------------------------------------------- |
| [Vue3.0 构建用户界面的渐进式框架](https://github.com/vuejs/core/)                              |
| [Vben Admin一个开箱即用的前端框架](https://github.com/anncwb/vue-vben-admin/)     |
| [Ant Design Vue-开箱即用的高质量Vue组件](https://github.com/vueComponent/ant-design-vue/) |
| [TypeScript是JavaScript类型的超集，它可以编译成纯JavaScript](https://github.com/microsoft/TypeScript/) |
| [Axios 基于 promise 的 HTTP 库](https://github.com/axios/axios)                          |
