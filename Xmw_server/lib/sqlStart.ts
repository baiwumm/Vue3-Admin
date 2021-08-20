'use strict';
const setSql = require('./setSql');

module.exports = app => {
    const db = {};
    const databases = Object.keys(app.config.Db);
    for (let i = 0; i < databases.length; ++i) {
        let database = databases[i];
        let raw = new setSql(app.config.Db[database], app);
        let { sequelize } = raw;
        db[database] = {
            sequelize: sequelize,
            Raw: raw,
            transaction: sequelize.transaction
        }
        if (!app["Db"]) app["Db"] = {};
        app["Db"][database] = db[database];
    }
}