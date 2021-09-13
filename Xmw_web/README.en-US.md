English | [简体中文](./README.md)

<p align="center"><img width="100" src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue-admin-xmw-pro/logo.svg" alt="Vue3-Admin-Xmw-Pro Logo"></p>

<h1 align="center">Vue-Admin-Xmw-Pro</h1>

<p align="center">
  <a href="https://github.com/vuejs/vue/" target="_blank">
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue-admin-xmw-pro/vue.svg" alt="vue">
  </a>
  <a href="https://github.com/vueComponent/ant-design-vue/" target="_blank">
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/antd.svg" alt="Ant Design of Vue">
  </a>
  <a href="https://github.com/vuejs/vue-router/" target="_blank">
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/vue-router.svg" alt="vue-router">
  </a>
  <a href="https://github.com/kazupon/vue-i18n/" target="_blank">
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/vue-i18n.svg" alt="vue-i18n">
  </a>
  <a>
    <img src="https://xmwpro.oss-cn-beijing.aliyuncs.com/vue-admin-xmw-pro/build.svg">
  </a>
</p>

## Project Description

[vue3-admin-xmw-pro] (http://vue3.xmwpro.com/) is a background management system solutions, It is based on [vue.Js] (https://github.com/vuejs/vue/) and [vben-admin] (https://github.com/anncwb/vue-vben-admin/). It uses a new technology stack: Vue3, Vite, TypeScript, etc., and provides a complete front and back end permission management scheme, rich theme configuration and dark theme adaptation, and secondary encapsulation of frequently used components to meet basic work requirements. I hope this project can help you.

- 😝 Online Preview: http://vue3.xmwpro.com

- 🔑 username：**admin**，password：**123456**

- 📄 Document Address：**In the works！**

- 🔗 Backend Portal：[Xmw_server](../Xmw_server)

- ❤️ star：**If possible, please give me a STAR to show my encouragement to the author. Thank you very much!**

- 😝 Vue3+Typescript Version： [vue-admin-xmw-pro](https://gitee.com/xmwjackey/vue-admin-xmw-pro/)

## Environment and Dependencies

- node (The node.js version must be 12.x or later, but not 13.x)
- yarn (Yarn1.x must be used, otherwise the dependency may not install)
- vite
- @vue/cli

> The [YARN](https://yarnpkg.com/) package management tool is recommended for this project

## Project Running

- Pull the project code
```bash
git clone https://github.com/FollowTrend/vue3-admin-xmw-pro.git
cd vue3-admin-xmw-pro
cd Xmw_web
```

- Install dependencies
```
yarn install
```

- Development mode running
```
yarn run serve
```

- Compile the project
```
yarn run build
```

## The Directory Structure

```
├── build # Package script correlation
│   ├── config # The configuration file
│   ├── generate # The generator
│   ├── script # The script
│   └── vite # Vite configuration
├── mock # The mock folder
├── public # Public static resource directory
├── src # Home directory
│   ├── api # Interface file
│   ├── assets # Resource file
│   │   ├── icons # icon sprite Icon folder
│   │   ├── images # The folder in which the project holds the images
│   │   └── svg # The folder where the project holds the SVG images
│   ├── components # Common components
│   ├── design # The style file
│   ├── directives # instruction
│   ├── enums # Enumeration/constant
│   ├── hooks # hook
│   │   ├── component # Component-dependent hook
│   │   ├── core # Based on the hooks
│   │   ├── event # Event-related hook
│   │   ├── setting # Configuring related hooks
│   │   └── web # Web related hook
│   ├── layouts # Layout file
│   │   ├── default # The default layout
│   │   ├── iframe # The iframe layout
│   │   └── page # The page layout
│   ├── locales # multilingual
│   ├── logics # logic
│   ├── main.ts # The main entrance
│   ├── router # The routing configuration
│   ├── settings # Project configuration
│   │   ├── componentSetting.ts # Component configuration
│   │   ├── designSetting.ts # Style configuration
│   │   ├── encryptionSetting.ts # The encryption configuration
│   │   ├── localeSetting.ts # Multilanguage configuration
│   │   ├── projectSetting.ts # Project configuration
│   │   └── siteSetting.ts # Site configuration
│   ├── store # The data warehouse
│   ├── utils # Utility class
│   └── views # page
├── test # Test
│   └── server # The service used for the test
│       ├── api # Test server
│       ├── upload # Testing the upload server
│       └── websocket # Testing the WS server
├── types # Type of file
├── vite.config.ts # Vite configuration file
└── windi.config.ts # Windcss configuration file

```

## Function Module

```
- Login / Logout

- Workbench

- Integrated Components
  - Organizational Structure
  - News Bulletin

- Personal Center

- System Settings
  - User Management
  - Menu Management
  - Role Management
  - Organization Management
  - Post Management
  - Operation Log
  - Dictionary Management
  - Internationalization

- Function Page
  - Guide Page
  - Image Recognition
  - Custom Instruction
  - Multilevel Menu
  - Qr Code
  - Waterfall Flow
  - Lazy Load
  - Virtual Rolling
  - Verification Code

```

## Demo Figure

| ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/login.jpg) | ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/workbench.jpg) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/personal.jpg) | ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/menuManagement.jpg) |
| ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/customDirective.jpg) | ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/qrcode.jpg) |
| ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/captcha.jpg) | ![](https://xmwpro.oss-cn-beijing.aliyuncs.com/vue3-admin-xmw-pro/lazyLoad.png) |

## Special Thanks（Thanks to the giant）

| Project                                                          |
| ---------------------------------------------------------------- |
| [vue.js Build an incremental framework for the user interface](https://github.com/vuejs/vue/)                              |
| [Vben Admin a front-end framework out of the box](https://github.com/anncwb/vue-vben-admin/)     |
| [Ant Design Vue-High quality VUE components right out of the box](https://github.com/vueComponent/ant-design-vue/) |
| [TypeScript is a superset of JavaScript types that can be compiled into pure JavaScript](https://github.com/microsoft/TypeScript/) |
| [axios Promise-based HTTP library](https://github.com/axios/axios)   |
