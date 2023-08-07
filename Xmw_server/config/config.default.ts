/*
 * @Author: Xie Mingwei
 * @Date: 2021-08-19 18:02:52
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-07 17:42:46
 * @Description: egg.js配置文件
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;
    // 数据库配置
    config.Db = {
        xmw: {
            dialect: "mysql",
            database: 'vue3_baiwumm_com',
            host: "127.0.0.1",
            username: 'root',
            password: '123456',
            timezone: '+08:00', // 保存为本地时区
            port: 3306,
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            }
        }
    }
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1629367306448_5070';

    config.proxy = true;

    // 配置需要的中间件，数组顺序即为中间件的加载顺序
    config.middleware = ['tokenAuthentication', 'params']
    config.expiresIn = 3 * 24 * 60 * 60;// token过期时间 单位秒，默认3天
    config.privateKey = 'Xmingwei'; // token密钥，生成解析token
    config.session = {
        key: 'SESSION_ID',  //eggjs默认session的key
        maxAge: 3 * 24 * 3600 * 1000,  // 3 day
        httpOnly: true,
        encrypt: true,
        signed: true,
        renew: true  //每次访问页面都会给session会话延长时间
    };
    // redis客户端
    config.redis = {
        client: {
            port: 6379, // Redis port
            host: '127.0.0.1', // Redis host
            password: '',
            db: 0,
        },
    }
    config.cluster = {
        listen: {
            port: 7003,
            hostname: "127.0.0.1",
            // path: '/var/run/egg.sock',
        },
    }
    // 取消安全证书验证
    config.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: ["*"], // 白名单
    }
    config.cors = {
        origin: "*", // 跨任何域
        allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS", // 被允许的请求方式
        credentials: true // 支持cookie跨域
    };
    // 文件上传
    config.multipart = {
        fileSize: "2mb",
        mode: "stream",
        whitelist: ['.jpg', '.jpeg', '.png', '.xlsx', '.xls', '.jfif', '.gif']
    };

    // 用户默认头像
    config.avatar = {
        male: 'https://cdn.baiwumm.com/project/vue3-admin/avatar/boy.svg',
        female: 'https://cdn.baiwumm.com/project/vue3-admin/avatar/girl.svg'
    }

    // the return config will combines to EggAppConfig
    return {
        ...config,
    };
};
