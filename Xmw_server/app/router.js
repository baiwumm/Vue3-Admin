/*
 * @Description: 后台路由管理
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 10:48:35
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-22 11:44:06
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    //   系统设置模块接口
    router.get('/system/getUserList', controller.system.userManagement.getUserList); // 获取用户列表
    // 系统设置-菜单管理
    router.get('/system/getMenuTree', controller.system.menuManagement.getMenuTree); // 获取菜单树结构
    router.post('/system/menuSave', controller.system.menuManagement.menuSave); // 新增和更新菜单
    router.post('/system/menuDel', controller.system.menuManagement.menuDel); // 删除菜单
    // 系统设置-组织管理
    router.get('/system/getOrganizationTree', controller.system.organizationManagement.getOrganizationTree); // 获取组织树结构
    router.post('/system/organizationSave', controller.system.organizationManagement.organizationSave); // 新增和更新组织
    router.post('/system/organizationDel', controller.system.organizationManagement.organizationDel); // 删除组织
    // 系统设置-岗位管理
    router.get('/system/getPostTree', controller.system.postManagement.getPostTree); // 获取岗位树结构
    router.post('/system/postSave', controller.system.postManagement.postSave); // 新增和更新岗位
    router.post('/system/postDel', controller.system.postManagement.postDel); // 删除岗位
    // 系统设置-字典管理
    router.get('/system/getDictionaryList', controller.system.dictionaryManagement.getDictionaryList); // 获取字典列表
    router.post('/system/dictionarySave', controller.system.dictionaryManagement.dictionarySave); // 新增和更新字典
    router.post('/system/dictionaryDel', controller.system.dictionaryManagement.dictionaryDel); // 删除字典
    router.get('/system/dictionaryModel', controller.system.dictionaryManagement.dictionaryModel); // 查询字典键值集合
};
