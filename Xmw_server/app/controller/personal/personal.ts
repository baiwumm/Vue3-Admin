/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-20 14:13:55
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-08-20 14:16:00
 * @Description:个人中心模块接口
 */
import { Controller } from 'egg';
import { resResultModel } from '../../public/resModel'
let OSS = require('ali-oss');
// 阿里云对象存储配置
let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'z3o5JqYZOqzRcOBe47jAwInWcKqhEi9tuZ94PRHCZCg=',
    accessKeySecret: 'WWLrY4wZhLjVE+wux0TNhad2DXgU5w5PdOX86b1SotY=',
    bucket: 'xmwpro',
});
export default class PersonalManagementController extends Controller {
    /**
     * @description: 修改用户标签
     * @param {*}tags:标签集合
     * @return {*}
     */
    public async changeUserTag(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_id } = ctx.session.userInfo
            let { tags } = ctx.params
            let options = {
                wherestr: `where user_id=${user_id}`
            };
            await Raw.Update('xmw_user', { tag: tags }, options);
            await service.logs.saveLogs(`修改标签:${tags}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
        } catch (error) {
            ctx.logger.info('changeUserTag方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 修改用户密码
     * @param {*}passwordOld:原密码,passwordNew:新密码
     * @return {*}
     */
    public async changeUserPassword(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_id } = ctx.session.userInfo
            const { passwordOld, passwordNew } = ctx.params
            let result = await Raw.Query(`select password from xmw_user where user_id=${user_id}`)
            if (passwordOld === result.password) {
                let row = { password: passwordNew };
                let options = {
                    wherestr: `where user_id=${user_id}`
                };
                await Raw.Update('xmw_user', row, options);
                await service.logs.saveLogs(`修改用户密码`)
                return ctx.body = { resCode: 200, resMsg: '操作成功!', response: {} }
            } else {
                return ctx.body = { resCode: -1, resMsg: '原密码不正确!', response: {} }
            }
        } catch (error) {
            ctx.logger.info('changeUserPassword方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }

    /**
     * @description: 修改用户头像
     * @param {*}
     * @return {*}
     */
    public async changeUserAvatar(): Promise<resResultModel> {
        const { ctx, service } = this;
        const { Raw } = ctx.app['Db'].xmw;
        try {
            let { user_id } = ctx.session.userInfo
            let stream = await this.ctx.getFileStream();
            let result = await client.putStream(stream.filename, stream);
            let avatarInfo = {
                name: result.name,
                fullPath: result.url
            }
            // 更新数据库头像字段
            let row = { avatar: avatarInfo.fullPath };
            let options = {
                wherestr: `where user_id=${user_id}`
            };
            await Raw.Update('xmw_user', row, options);
            await service.logs.saveLogs(`更换用户头像:${avatarInfo.fullPath}`)
            return ctx.body = { resCode: 200, resMsg: '操作成功!', response: avatarInfo }
        } catch (error) {
            ctx.logger.info('changeUserAvatar方法报错：' + error)
            return ctx.body = { resCode: 400, resMsg: '操作失败!', response: error }
        }
    }
}
