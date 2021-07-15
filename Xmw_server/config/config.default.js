/*
 * @Description: egg.js配置文件
 * @Version: 3.30
 * @Autor: Xie Mingwei
 * @Date: 2021-07-15 10:48:35
 * @LastEditors: Xie Mingwei
 * @LastEditTime: 2021-07-15 10:56:26
 */
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {
        Db: {
            xmw: {
                dialect: "mysql",
                database: 'xmw_vue3_egg',
                host: "127.0.0.1",
                username: 'root',
                password: '123456',
                dialectOptions: {
                    dateStrings: true,
                    typeCast: true
                },
                timezone: '+08:00', // 保存为本地时区
                port: 3306,
                dialectOptions: {
                    dateStrings: true,
                    typeCast(field, next) {
                        if (field.type === "DATETIME") {
                            return field.string();
                        }
                        return next();
                    }
                }
            }
        }
    };
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1626317297628_4474';
    // 配置需要的中间件，数组顺序即为中间件的加载顺序
    config.middleware = ['params']
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
            port: 7001,
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
    return {
        ...config
    };
};
