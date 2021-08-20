'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');
class RawClass {
    sequelize: any;
    app: any;
    dataBaseType: any;

    constructor(config, app) {
        let setting = Object.assign({}, config);
        this.sequelize = new Sequelize(setting.database, setting.username, setting.password, setting);
        this.app = app;
        this.dataBaseType = this.sequelize.dialect.name;
    }

    get_amending(data) {
        if (this.dataBaseType == "mssql") {
            for (const key in data) {
                var val = data[key];
                if (Date.prototype.isPrototypeOf(val)) {
                    data[key] = moment(moment(val).utcOffset(0).format("YYYY-MM-DD HH:mm:ss")).toDate();
                }
            }
        }
    }

    save_amending(data) {
        for (const key in data) {
            var val = data[key];
            if (val === undefined || val === '') data[key] = null;
            // else if (Date.prototype.isPrototypeOf(val) || (isNaN(val) && !isNaN(Date.parse(val)) && !val.includes('&#'))) {
            //     console.log(data[key])
            //     data[key] = moment(val).format("YYYY-MM-DD HH:mm:ss");
            // }
            // else{
            //   if(data[key] && data[key] !="" && typeof(data[key])=='string') data[key] =data[key].replace(/T/g," ").replace(/Z/g,"")
            // }
        }
    }

    //执行一条SQL语句，返回影响行。
    async Execute(sql, opts) {
        let {
            sequelize
        } = this;
        let _opts = Object.assign({}, opts);
        //// 结果将是一个空数组,元数据将包含受影响的行数.
        const [metadata] = await sequelize.query(sql, _opts);
        return metadata
    }

    async Query(sql, opts) {
        let { sequelize } = this;

        let _opt = opts || {};
        _opt.plain = true;
        _opt.type = sequelize.QueryTypes.SELECT;

        var data = await sequelize.query(sql, _opt);
        this.get_amending(data);
        return data;
    }

    async QueryList(sql, opts) {
        let { sequelize } = this;

        let _opt = opts || {};
        _opt.plain = false;
        _opt.type = sequelize.QueryTypes.SELECT;

        var arr = await sequelize.query(sql, _opt);
        arr.forEach(element => {
            this.get_amending(element);
        });
        return arr;
    }

    async QueryPageList(sql, current, pageSize, opts) {
        let { sequelize } = this;
        let _opt = opts || {};
        let start = (Number(current) - 1) * pageSize
        sql = sql + ` limit ${start},pageSize`
        _opt.plain = false;
        _opt.type = sequelize.QueryTypes.SELECT;
        var arr = await sequelize.query(sql, _opt);
        arr.forEach(element => {
            this.get_amending(element);
        });
        return arr;
    }

    async QueryPageData(sql, current, pageSize, opts) {
        let { sequelize } = this;
        let _opt = opts || {};
        let start = (Number(current) - 1) * pageSize
        let sql2 = sql + ` limit ${start},${pageSize}`
        _opt.plain = false;
        _opt.type = sequelize.QueryTypes.SELECT;
        var arr = await sequelize.query(sql, _opt);
        var arr2 = await sequelize.query(sql2, _opt);
        arr2.forEach(element => {
            this.get_amending(element);
        });
        return { totalNum: arr.length, records: arr2, totalPage: Math.ceil(arr.length / pageSize) };
    }

    async Update(tablename, updateobj, opts) {
        let self = this;
        let { sequelize } = this;
        let rowData = { ...updateobj };
        self.save_amending(rowData);
        let fieldstr = Object.keys(rowData).map(key => `${key}=:${key}`).join(",");
        let wherestr = opts.wherestr || "";
        let sql = `UPDATE ${tablename} SET ${fieldstr} ${wherestr}`;

        let res = await sequelize.query(sql, {
            replacements: Object.assign({}, rowData, opts.replacements),
            type: sequelize.QueryTypes.UPDATE
        });
        return res[1];
    }

    async Insert(tablename, insertobj, opts) {
        var self = this;
        let { sequelize } = this;
        var rowData = { ...insertobj };
        self.save_amending(rowData);
        var str1 = Object.keys(rowData).join(",");
        var str2 = Object.keys(rowData).map(key => `:${key}`).join(",");
        var sql = `insert into ${tablename} (${str1}) values (${str2})`;
        let _opts = Object.assign({}, { type: sequelize.QueryTypes.INSERT }, opts);
        _opts.replacements = Object.assign({}, rowData, _opts.replacements);
        var res = await sequelize.query(sql, _opts);
        return res[1];
    }

    async InsertList(tablename, lst, opts) {
        if (!Array.isArray(lst)) return 0;
        if (lst.length == 0) return 0;
        let { sequelize } = this;

        for (const item of lst) {
            this.save_amending(item);
        }
        await sequelize.queryInterface.bulkInsert(tablename, lst, opts);
    }

    async UpdateOrInsert(tablename, Obj, opts) {

        var self = this;

        let result = await self.Query(`select count(1) as 'c' from ${tablename} ${opts.wherestr}`, {
            replacements: Obj,
            transaction: opts.transaction
        })

        if (result.c == 0) {
            return await self.Insert(tablename, Obj, opts);
        } else {
            return await self.Update(tablename, Obj, opts);
        }
    }

    async Delete(tablename, opts) {
        let { sequelize } = this;
        var sql = `delete from ${tablename} ${opts.wherestr}`;

        let _opts = Object.assign({}, { type: sequelize.QueryTypes.DELETE }, opts);

        return await sequelize.query(sql, _opts);
    }


    async Transaction(invokefunc) {

        const sequelize = this.sequelize;
        return sequelize.transaction({
        }, function (t) {
            return invokefunc(t);
        }).then(function (result) {
            // Transaction 会自动提交
            // result 是事务回调中使用promise链中执行结果
            return result;
        }).catch(function (err) {
            // Transaction 会自动回滚
            // err 是事务回调中使用promise链中的异常结果
            throw err;
        });

    }

}

module.exports = RawClass;