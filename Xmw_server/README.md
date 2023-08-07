简体中文 | [English](./README.en-US.md)

<p align="center"><img width="100" src="https://cdn.baiwumm.com/project/vue3-admin/logo.png" alt="Vue3 Admin Logo"></p>

<h1 align="center">Vue3 Admin</h1>

<p align="center">
  <a href="https://github.com/eggjs/egg/" target="_blank">
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/egg.svg" alt="egg">
  </a>
  <a href="https://github.com/eggjs/egg-redis/" target="_blank">
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/egg-redis.svg" alt="egg-redis">
  </a>
  <a href="https://github.com/auth0/node-jsonwebtoken/" target="_blank">
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/jsonwebtoken.svg" alt="jsonwebtoken">
  </a>
  <a href="https://github.com/sequelize/sequelize/" target="_blank">
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/egg-sequelize.svg" alt="sequelize">
  </a>
  <a>
    <img src="https://cdn.baiwumm.com/project/vue3-admin/shield/build.svg">
  </a>
</p>

## 项目简介

[Vue3 Admin](https://vue3.baiwumm.com/) 是一个后台管理系统解决方案，后端基于 [Egg.js](https://github.com/eggjs/egg/) 和 [Sequelize](https://github.com/sequelize/sequelize/)实现。Egg.js 为企业级框架和应用而生，我们希望由 Egg.js 孕育出更多上层框架，帮助开发团队和开发人员降低开发和维护成本。

- 😝 线上预览: https://vue3.baiwumm.com

- 🔗 前端传送门：[Xmw_web](../Xmw_web)

- ❤️ star：**如果可以的话，请顺手给个star，表示对作者的鼓励，万分感谢！**

## 环境和依赖

- node
- yarn

> 推荐本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具

## 项目运行

- 拉取项目代码
```bash
git clone https://github.com/baiwumm/Vue3-Admin.git
cd Vue3-Admin
cd Xmw_server
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn run dev
```

## 目录结构

```
├── app/
    ├── controller(用于解析用户的输入)
    ├── extend(框架的扩展)
    ├── io(egg-socket.io框架配置)
    ├── middleware( 用于编写中间件)
    ├── public(用于放置静态资源)
    ├── service(用于编写业务逻辑层)
    ├── router.js(用于配置 URL 路由规则)
├── config/
    ├── config.{env}.js(用于编写配置文件)
    ├── plugin.js(用于配置需要加载的插件)
```

## 特别鸣谢（感谢巨人）

| 项目                                                          |
| ---------------------------------------------------------------- |
| [egg.js 为企业级框架和应用而生](https://github.com/eggjs/egg)                              |
| [egg-socket.io 支持浏览器和服务器之间的实时、双向和基于事件的通信](https://github.com/eggjs/egg-socket.io)     |
| [jsonwebtoken 实现token技术的一种解决方案](https://github.com/auth0/node-jsonwebtoken) |
| [sequelize orm框架](https://github.com/sequelize/sequelize)                          |
