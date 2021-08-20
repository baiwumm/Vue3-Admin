import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    cors: {
        enable: true,
        package: 'egg-cors'
    },
    io: {
        enable: true,
        package: 'egg-socket.io'
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    }
};
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
};
export default plugin;
