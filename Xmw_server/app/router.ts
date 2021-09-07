import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    //   系统设置模块接口
    router.post('/login', controller.system.userManagement.login); // 用户登录
    router.get('/logout', controller.system.userManagement.logout); // 用户注销
    router.get('/getPermCode', controller.system.userManagement.getPermCode); // 获取按钮权限key
    router.get('/getUserInfo', controller.system.userManagement.getUserInfo); // 获取用户信息
    router.get('/generateVerifCode', controller.system.userManagement.generateVerifCode); // 生成验证码
    // 系统设置-用户管理
    router.get('/system/getUserList', controller.system.userManagement.getUserList); // 获取用户列表
    router.post('/system/userSave', controller.system.userManagement.userSave); // 新增和更新用户
    router.post('/system/userDel', controller.system.userManagement.userDel); // 删除用户
    // 系统设置-菜单管理
    router.get('/system/getMenuTree', controller.system.menuManagement.getMenuTree); // 获取菜单树结构
    router.post('/system/menuSave', controller.system.menuManagement.menuSave); // 新增和更新菜单
    router.post('/system/menuDel', controller.system.menuManagement.menuDel); // 删除菜单
    router.get('/system/getMenuList', controller.system.menuManagement.getMenuList); // 获取路由菜单
    // 系统设置-角色管理
    router.get('/system/getRoleList', controller.system.roleManagement.getRoleList); // 获取角色列表
    router.post('/system/roleSave', controller.system.roleManagement.roleSave); // 新增和更新角色
    router.post('/system/setRoleStatus', controller.system.roleManagement.setRoleStatus); // 更改角色状态
    router.post('/system/roleDel', controller.system.roleManagement.roleDel); // 删除角色
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
    // 系统设置-操作日志
    router.get('/system/getLogList', controller.system.operationLogs.getLogList); // 获取日志列表
    // 系统设置-国际化
    router.get('/system/getInternationalList', controller.system.internationalManagement.getInternationalList); // 获取国际化列表
    router.get('/system/getInternationalLang', controller.system.internationalManagement.getInternationalLang); // 获取国际化语言
    router.post('/system/internationaSave', controller.system.internationalManagement.internationaSave); // 新增和更新国际化
    router.post('/system/internationalDel', controller.system.internationalManagement.internationalDel); // 删除国际化字段

    // 个人中心
    router.post('/personal/changeUserTag', controller.personal.personal.changeUserTag); // 修改用户标签
    router.post('/personal/changeUserPassword', controller.personal.personal.changeUserPassword); // 修改用户密码
    router.post('/personal/changeUserAvatar', controller.personal.personal.changeUserAvatar); // 修改用户头像

    // 综合组件-新闻公告
    router.get('/integrated/getNewsList', controller.integrated.news.getNewsList); // 获取新闻公告列表
    router.post('/integrated/newsSave', controller.integrated.news.newsSave); // 新增和更新新闻公告
    router.post('/integrated/newsDel', controller.integrated.news.newsDel); // 删除新闻公告
    router.post('/integrated/setNewsPlacedTop', controller.integrated.news.setNewsPlacedTop); // 更改置顶状态
    router.post('/integrated/saveAlreadyNews', controller.integrated.news.saveAlreadyNews); // 存储已读user_id
    router.get('/integrated/getNewsUnreadyCount', controller.integrated.news.getNewsUnreadyCount); // 查询未读数量
};
