简体中文 | [English](./README.en-US.md)

<p align="center"><img width="100" src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue-admin-xmw-pro/logo.svg" alt="Vue3-Admin-Xmw-Pro Logo"></p>

<h1 align="center">Vue3-Admin-Xmw-Pro</h1>

<p align="center">
  <a href="https://github.com/vuejs/vue/" target="_blank">
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/vue.svg" alt="vue">
  </a>
  <a href="https://github.com/vueComponent/ant-design-vue/" target="_blank">
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/antd.svg" alt="Ant Design of Vue">
  </a>
  <a href="https://github.com/eggjs/egg/" target="_blank">
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/egg.svg" alt="egg">
  </a>
  <a>
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/build.svg">
  </a>
</p>

## 项目简介

  [vue3-admin-xmw-pro](http://vue3.xmwpro.com/) 基于 [Vben Admin](https://github.com/anncwb/vue-vben-admin/) 二次开发，它使用了全新的技术栈：Vue3、Vite、TypeScript等，提供了完善的前后端权限管理方案，丰富的主题配置及黑暗主题适配，对日常使用频率较高的组件二次封装,满足基础工作需求，希望本项目可以帮助到您。

- 🎯 前端技术栈： [vue.js](https://github.com/vuejs/vue/)、[ant-design-vue](https://github.com/vueComponent/ant-design-vue/)、[vite](https://github.com/vitejs/vite/)、[TypeScript](https://github.com/microsoft/TypeScript)

- 🔗 前端传送门： [Xmw_web](./Xmw_web)

- 🎯 后端技术栈： [egg.js](https://github.com/eggjs/egg/)、[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken/)、[sequelize](https://github.com/sequelize/sequelize/)、[redis](https://github.com/redis/redis/)

- 🔗 后端传送门： [Xmw_server](./Xmw_server)

- 😝 线上预览： http://vue3.xmwpro.com

- 🔑 用户名：**admin**，密码：**123456**

- [🚀 github 仓库地址](https://github.com/FollowTrend/vue3-xmw-admin-pro/)

- [🚀 码云仓库地址](https://gitee.com/xmwjackey/vue3-admin-xmw-pro/)

- 📄 文档地址：**正在编写中！**

- ❤️ star：**如果可以的话，请顺手给个star，表示对作者的鼓励，万分感谢！**

- 😝 Vue2版本： [vue-admin-xmw-pro](https://gitee.com/xmwjackey/vue-admin-xmw-pro/)

## 环境和依赖

- node (Node.js 版本要求12.x以上，且不能为13.x版本，这里推荐 14.x 及以上)
- yarn (必须使用Yarn1.x，否则依赖可能安装不上)
- vite
- @vue/cli

> 推荐本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具

## 项目运行

- 拉取项目代码
```bash
git clone https://gitee.com/xmwjackey/vue3-admin-xmw-pro.git
cd vue3-admin-xmw-pro
// 进入前端
cd Xmw_web
// 进入后端
cd Xmw_server
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
// 前端启动
yarn run serve
// 后端启动
yarn run dev
```

- 编译项目
```
yarn run build
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

| ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/login.jpg) | ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/workbench.jpg) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/personal.jpg) | ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/menuManagement.jpg) |
| ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/customDirective.jpg) | ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/qrcode.jpg) |
| ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/captcha.jpg) | ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/lazyLoad.png) |

## 特别鸣谢（感谢巨人）

| 项目                                                          |
| ---------------------------------------------------------------- |
| [vue.js 构建用户界面的渐进式框架](https://github.com/vuejs/vue/)                              |
| [Vben Admin一个开箱即用的前端框架](https://github.com/anncwb/vue-vben-admin/)     |
| [Ant Design Vue-开箱即用的高质量Vue组件](https://github.com/vueComponent/ant-design-vue/) |
| [TypeScript是JavaScript类型的超集，它可以编译成纯JavaScript](https://github.com/microsoft/TypeScript/) |
| [axios 基于 promise 的 HTTP 库](https://github.com/axios/axios/)                          |
| [egg.js 为企业级框架和应用而生](https://github.com/eggjs/egg/)                              |
| [egg-socket.io 支持浏览器和服务器之间的实时、双向和基于事件的通信](https://github.com/eggjs/egg-socket.io/)     |
| [jsonwebtoken 实现token技术的一种解决方案](https://github.com/auth0/node-jsonwebtoken/) |
| [sequelize orm框架](https://github.com/sequelize/sequelize/)                          |
