const sqlStart = require('./lib/sqlStart')
module.exports = app => {
    // 开始前执行

    app.beforeStart(async () => {
        await sqlStart(app);
    });

    app.ready(async () => {
        app.loader.getLoadUnits();
    });

    // 关闭前执行
    app.beforeClose(async () => {

    });
}