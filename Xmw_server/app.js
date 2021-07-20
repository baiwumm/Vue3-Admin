//const Sequelize = require('sequelize');
const sqlStart = require('./lib/sqlStart') 
module.exports = app => {
    // 开始前执行
  
    app.beforeStart(async () => {
      await sqlStart(app);
    });

    app.ready(async () => {
      const loadUnits = app.loader.getLoadUnits();
      // const db = {}; 
      // const databases = Object.keys(app.config.Dbs); 
      // for(let i = 0; i < databases.length; ++i) { 
      //     let database = databases[i]; 
      //     const sequelize=new Sequelize(app.config.Dbs[database].database, app.config.Dbs[database].username, app.config.Dbs[database].password, {
      //       host: app.config.Dbs[database].host,
      //       dialect: app.config.Dbs[database].dialect,
      //       pool: {
      //           max: 5,
      //           min: 0,
      //           idle: 30000
      //       }
      //    });
      //    db[database] = {
      //      Raw:sequelize,
      //      transaction:sequelize.transaction
      //    }
      //   if(!app["Dbs"]) app["Dbs"]={};
      //   app["Dbs"][database]=db[database];
      // } 
    });

    // 关闭前执行
    app.beforeClose(async () => {

    });
}