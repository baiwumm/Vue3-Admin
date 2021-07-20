/*
 * @Description: 后台路由管理
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 10:48:35
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-19 17:49:57
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    //   系统设置模块接口
    router.get('/system/getUserList', controller.system.userManagement.getUserList); // 获取用户列表
    router.get('/system/getDictionaryList', controller.system.dictionaryManagement.getDictionaryList); // 获取字典列表
    router.post('/system/dictionarySave', controller.system.dictionaryManagement.dictionarySave); // 新增和更新字典
    router.post('/system/dictionaryDel', controller.system.dictionaryManagement.dictionaryDel); // 删除字典
    router.get('/system/dictionaryModel', controller.system.dictionaryManagement.dictionaryModel); // 查询字典键值集合
};
