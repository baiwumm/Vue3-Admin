/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-20 14:06:23
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 15:11:49
 * @Description:角色管理API接口
 */
import { Controller } from 'egg';
import { resResultModel } from '../../public/resModel'
export default class RoleManagementController extends Controller {
    /**
     * @description: 获取角色列表
     * @param {*} role_name:角色名称,status:状态,current:页码,pageSize:条数
     * @return {*}
     */
    public async getRoleList(): Promise<resResultModel> {
        const { ctx } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { role_name, status, current, pageSize } = ctx.params;
            // 根据条件拼接筛选
            let conditions: string = 'where 1 = 1'
            if (role_name) conditions += ` and role_name like '%${role_name}%'`
            if (status) conditions += ` and status = ${status}`
            let result = await Raw.QueryPageData(`select * from xmw_role ${conditions} order by create_time asc `, current, pageSize);
            // 判断是否有数据，返回菜单权限
            if (result.records.length) {
                // 请求角色菜单权限，根据role_id匹配
                let permission_data = await Raw.QueryList(`select role_id,menu_id from xmw_permission`)
                for (let i = 0; i < result.records.length; i++) {
                    let menu_ids: string[] = []
                    // 过滤当前角色的权限
                    let permission_filter = permission_data.filter((v: { role_id: any; }) => {
                        return result.records[i].role_id == v.role_id
                    })
                    // 拿到当前角色菜单id集合
                    permission_filter.map((a: { menu_id: string; }) => {
                        menu_ids.push(a.menu_id);
                    })
                    // 请求当前角色的菜单生成tree结构
                    let menu_data = await Raw.QueryList(`select * from xmw_menu where menu_id in (${menu_ids}) order by sort desc,create_time asc `);
                    result.records[i].menu_role = ctx.helper.initializeTree(menu_data, 'menu_id', 'parent_id', 'children')
                }
            }
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: result }
        } catch (error) {
            ctx.logger.info('getRoleList方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 更改角色状态
     * @param {*} role_id:权限id,status:状态
     * @return {*}
     */
    public async setRoleStatus(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { role_id, status, role_name } = ctx.params;
            const options = {
                wherestr: `where role_id=${role_id}`
            };
            await Raw.Update('xmw_role', { status: status }, options);
            await service.logs.saveLogs(`更改角色状态:${role_name}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('setRoleStatus方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 新增和更新角色
     * @param {*} params:表单数据
     * @return {*}
     */
    public async roleSave(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            // 从session获取用户id
            let { user_id } = ctx.session.userInfo
            let { role_id, menu_role, ...params } = ctx.params
            // 判断角色名称是否已存在
            let conditions: string = `where role_name = '${params.role_name}'`
            if (role_id) conditions += ` and role_id != '${role_id}'`
            const exist = await Raw.Query(`select count(1) as total from xmw_role ${conditions}`);
            if (exist.total) {
                return ctx.body = { resCode: -1, resMsg: '角色名称已存在!', response: {} }
            }
            // 参数role_id判断是新增还是编辑
            if (!role_id) {
                const snowflake_role_id = ctx.helper.snowflakeId()
                params.role_id = snowflake_role_id
                params.create_time = new Date()
                params.founder = user_id
                await Raw.Insert('xmw_role', params);
                // 如果是新增，直接把权限数据塞到xmw_permission
                let permission_arr = menu_role.split(',')
                const snowflake = ctx.helper.snowflakeId(true);
                let permission_data = permission_arr.map((el: any) => {
                    return {
                        permission_id: snowflake.nextId().toString(),
                        role_id: snowflake_role_id,
                        menu_id: el,
                        create_time: new Date()
                    }
                })
                await Raw.InsertList('xmw_permission', permission_data)
            } else { // 编辑角色
                params.update_last_time = new Date()
                const options = {
                    wherestr: `where role_id = ${role_id}`
                };
                await Raw.Update('xmw_role', params, options);
                // 删除xmw_permission的权限
                await Raw.Delete("xmw_permission", {
                    wherestr: `where role_id = ${role_id}`
                });
                // 然后再执行插入
                let permission_arr = menu_role.split(',')
                const snowflake = ctx.helper.snowflakeId(true);
                let permission_data = permission_arr.map((el: any) => {
                    return {
                        permission_id: snowflake.nextId().toString(),
                        role_id: role_id,
                        menu_id: el,
                        create_time: new Date()
                    }
                })
                await Raw.InsertList('xmw_permission', permission_data)
            }
            await service.logs.saveLogs(`${role_id ? '编辑' : '新增'}角色:${params.role_name}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('roleSave方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
    * @description: 删除角色
    * @param {*} ids:id集合,用,分隔
    * @return {*}
    */
    public async roleDel(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { ids, role_name } = ctx.params
            // 先删除角色列表的数据
            await Raw.Delete("xmw_role", {
                wherestr: `where role_id in (${ids})`
            });
            // 再删除权限表相关的数据
            await Raw.Delete("xmw_permission", {
                wherestr: `where role_id in (${ids})`
            });
            await service.logs.saveLogs(`删除角色:${role_name}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('roleDel方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
