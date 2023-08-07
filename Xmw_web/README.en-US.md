English | [简体中文](./README.md)

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

## Project Description

[Vue3 Admin](https://vue3.baiwumm.com/) is a background management system solutions, It is based on [Vue3.0](https://github.com/vuejs/core/) and [Vben Admin](https://github.com/anncwb/vue-vben-admin/). It uses a new technology stack: Vue3, Vite, TypeScript, etc., and provides a complete front and back end permission management scheme, rich theme configuration and dark theme adaptation, and secondary encapsulation of frequently used components to meet basic work requirements. I hope this project can help you.

- 😝 Online Preview: http://vue3.baiwumm.com

- 🔑 username：**admin**，password：**123456**

- 🔗 Backend Portal：[Xmw_server](../Xmw_server)

- ❤️ star：**If possible, please give me a STAR to show my encouragement to the author. Thank you very much!**

- 😝 Vue2： [Vue2 Admin](https://github.com/baiwumm/Vue2-Admin/)

## Environment and Dependencies

- node (The node.js version must be 12.x or later, but not 13.x)
- yarn (Yarn1.x must be used, otherwise the dependency may not install)
- vite
- @vue/cli

> The [YARN](https://yarnpkg.com/) package management tool is recommended for this project

## Project Running

- Pull the project code
```bash
git clone https://github.com/baiwumm/Vue3-Admin.git
cd Vue3-Admin
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

| ![](https://cdn.baiwumm.com/project/vue3-admin/demo/login.jpg!baiwu) | ![](https://cdn.baiwumm.com/project/vue3-admin/demo/workbench.jpg!baiwu) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://cdn.baiwumm.com/project/vue3-admin/demo/personal.jpg!baiwu) | ![](https://cdn.baiwumm.com/project/vue3-admin/demo/menuManagement.jpg!baiwu) |
| ![](https://cdn.baiwumm.com/project/vue3-admin/demo/customDirective.jpg!baiwu) | ![](https://cdn.baiwumm.com/project/vue3-admin/demo/qrcode.jpg!baiwu) |
| ![](https://cdn.baiwumm.com/project/vue3-admin/demo/captcha.jpg!baiwu) | ![](https://cdn.baiwumm.com/project/vue3-admin/demo/lazyLoad.png!baiwu) |

## Special Thanks（Thanks to the giant）

| Project                                                          |
| ---------------------------------------------------------------- |
| [Vue3.0 Build an incremental framework for the user interface](https://github.com/vuejs/core/)                              |
| [Vben Admin a front-end framework out of the box](https://github.com/anncwb/vue-vben-admin/)     |
| [Ant Design Vue-High quality VUE components right out of the box](https://github.com/vueComponent/ant-design-vue/) |
| [TypeScript is a superset of JavaScript types that can be compiled into pure JavaScript](https://github.com/microsoft/TypeScript/) |
| [Axios Promise-based HTTP library](https://github.com/axios/axios)   |
