English | [简体中文](./README.md)

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

## Project Description

[Vue3 Admin](https://vue3.baiwumm.com/) is a background management system solutions, The back-end is based on [Egg.js](https://github.com/eggjs/egg/) and [Sequelize](https://github.com/sequelize/sequelize/). Egg.js was born for enterprise-level frameworks and applications, and we hope that more upper-layer frameworks will emerge from egg.js to help development teams and developers reduce development and maintenance costs.

- 😝 Online Preview: https://vue3.baiwumm.com

- 🔗 Front Gate：[Xmw_web](../Xmw_web)

- ❤️ star：**If possible, please give me a STAR to show my encouragement to the author. Thank you very much!**

## Environment and Dependencies

- node
- yarn

> The [YARN](https://yarnpkg.com/) package management tool is recommended for this project

## Project Running

- Pull the project code
```bash
git clone https://github.com/baiwumm/Vue3-Admin.git
cd Vue3-Admin
cd Xmw_server
```

- Install dependencies
```
yarn install
```

- Development mode running
```
yarn run dev
```

## The Directory Structure

```
├── app/
    ├── controller(Used to parse the user's input)
    ├── extend(Extensions to the framework)
    ├── io(Egg-Socket. IO framework configuration)
    ├── middleware( Used to write middleware)
    ├── public(Used to place static resources)
    ├── service(Used to write the business logic layer)
    ├── router.js(Used to configure URL routing rules)
├── config/
    ├── config.{env}.js(Used to write configuration files)
    ├── plugin.js(Used to configure the plug-in that needs to be loaded)
```


## Special Thanks（Thanks to the giant）

| Project                                                          |
| ---------------------------------------------------------------- |
| [egg.js Designed for enterprise-class frameworks and applications](https://github.com/eggjs/egg)                              |
| [egg-socket.io enables real-time, bidirectional and event-based communication between the browser and the server](https://github.com/eggjs/egg-socket.io)     |
| [jsonwebtoken A solution to implement Token technology](https://github.com/auth0/node-jsonwebtoken) |
| [sequelize Orm framework](https://github.com/sequelize/sequelize)                          |
