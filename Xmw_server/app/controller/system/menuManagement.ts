/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-20 13:43:28
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 15:10:48
 * @Description:菜单管理模块接口
 */
import { Controller } from 'egg';
import { resResultModel, MenuListItem } from '../../public/resModel'

export default class MenuManagementController extends Controller {
    /**
     * @description: 获取菜单树结构
     * @param {*} title:菜单名称,status:状态,current:页码,pageSize:条数
     * @return {*}
     */
    public async getMenuTree(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { title, status } = ctx.params;
            // 根据条件拼接筛选
            let conditions: string = 'where 1 = 1'
            if (title) conditions += ` and title like '%${title}%'`
            if (status) conditions += ` and status = ${status}`
            let menu_data = await Raw.QueryList(`select u.*,i.zh_CN as lang from xmw_menu u left join xmw_international i on u.title = i.internation_name ${conditions} order by sort desc,create_time asc `);
            const result = ctx.helper.initializeTree(menu_data, 'menu_id', 'parent_id', 'children')
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
        } catch (error) {
            ctx.logger.info('getMenuTree方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
    * @description: 获取路由菜单
    * @param {*} 
    * @return {*}
    */
    public async getMenuList(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            // 从session获取用户id
            let { user_id } = ctx.session.userInfo
            // 只查询目录或者菜单类型的数据
            let sqlData = await Raw.QueryList(`select * from xmw_menu 
            where menu_type != 'button' and 
            menu_id in (select menu_id from xmw_permission
            where  FIND_IN_SET(role_id,(select role_id from xmw_user where user_id=${user_id})))
            order by sort desc,create_time asc`);
            // 组装路由数据格式
            let menuData = sqlData.map((v: MenuListItem) => {
                let menuItem = {
                    menu_id: v.menu_id, //路由id
                    path: v.path, // 路由地址
                    name: v.path.replace(/\//g, ''), // 路由name不能重复
                    component: v.component, // 模板路径
                    redirect: v.redirect, // 重定向地址
                    parent_id: v.parent_id, // 父级id
                    meta: {
                        title: v.title, // 路由标题
                        ignoreKeepAlive: v.ignore_keep_alive == '1', // 是否忽略KeepAlive缓存
                        affix: v.affix == '1', // 是否固定标签
                        icon: v.icon, // 图标，也是菜单图标,
                        frameSrc: v.frame_src || '', // 内嵌iframe的地址
                        transitionName: v.transition_name, // 指定该路由切换的动画名
                        hideChildrenInMenu: v.hide_childrenIn_menu == '1', // 隐藏所有子菜单
                        hideTab: v.hide_tab == '1', // 当前路由不再标签页显示
                        hideMenu: v.hide_menu == '1', // 当前路由不再菜单显示
                    }
                }
                return menuItem
            })
            const result = ctx.helper.initializeTree(menuData, 'menu_id', 'parent_id', 'children')
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
        } catch (error) {
            ctx.logger.info('getMenuList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
    * @description: 新增和更新菜单
    * @param {*} params:表单数据
    * @return {*}
    */
    public async menuSave(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            // 从session获取用户id
            let { user_id } = ctx.session.userInfo
            let { menu_id, ...params } = ctx.params
            // 判断父级不能是自己
            if (params.parent_id == menu_id && menu_id) {
                return ctx.body = { resCode: -1, resMsg: '父级不能是自己!', response: {} }
            }
            // 判断菜单名称是否已存在
            let conditions = `where title = '${params.title}' and menu_type != 'button'`
            if (menu_id) conditions += ` and menu_id != '${menu_id}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_menu ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '菜单名称已存在!', response: {} }
            }
            // 参数menu_id判断是新增还是编辑
            if (!menu_id) {
                params.menu_id = ctx.helper.snowflakeId()
                params.create_time = new Date()
                params.founder = user_id
                await Raw.Insert('xmw_menu', params);
            } else { // 编辑菜单
                params.update_last_time = new Date()
                const options = {
                    wherestr: `where menu_id = ${menu_id}`
                };
                await Raw.Update('xmw_menu', params, options);
            }
            await service.logs.saveLogs(`${menu_id ? '编辑' : '新增'}菜单 权限标识:${params.permission}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('menuSave方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 删除菜单
     * @param {*} ids:id集合,用,分隔
     * @return {*}
     */
    public async menuDel(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { ids, permission } = ctx.params
            // 判断当前菜单是否存在子级
            let conditions: string = `where parent_id = '${ids}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_menu ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '当前菜单是否存在子级,不能删除!', response: {} }
            }
            await Raw.Delete("xmw_menu", {
                wherestr: `where menu_id in (${ids})`
            });
            await service.logs.saveLogs(`删除菜单 权限标识:${permission}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('menuDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
