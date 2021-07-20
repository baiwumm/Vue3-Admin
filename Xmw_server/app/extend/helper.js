module.exports = {
    // 格式化时间
    dataFormat(value, fmt) {
        if (!value || value == "") return value;
        if (typeof value == "string" && value.indexOf(".") > -1)
            value = value.split(".")[0]; //时间格式带小数点则需把小数点后面的尾数去掉
        let getDate = new Date(value);
        let o = {
            "M+": getDate.getMonth() + 1,
            "d+": getDate.getDate(),
            "h+": getDate.getHours(),
            "m+": getDate.getMinutes(),
            "s+": getDate.getSeconds(),
            "q+": Math.floor((getDate.getMonth() + 3) / 3),
            S: getDate.getMilliseconds(),
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1
                        ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length)
                );
            }
        }
        return fmt;
    },
    // 雪花算法生成随机Id
    snowflakeId() {
        const Snowflake = /** @class */ (function () {
            function Snowflake(_workerId, _dataCenterId, _sequence) {
                this.twepoch = 1288834974657n;
                //this.twepoch = 0n;
                this.workerIdBits = 5n;
                this.dataCenterIdBits = 5n;
                this.maxWrokerId = -1n ^ (-1n << this.workerIdBits); // 值为：31
                this.maxDataCenterId = -1n ^ (-1n << this.dataCenterIdBits); // 值为：31
                this.sequenceBits = 12n;
                this.workerIdShift = this.sequenceBits; // 值为：12
                this.dataCenterIdShift = this.sequenceBits + this.workerIdBits; // 值为：17
                this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits; // 值为：22
                this.sequenceMask = -1n ^ (-1n << this.sequenceBits); // 值为：4095
                this.lastTimestamp = -1n;
                //设置默认值,从环境变量取
                this.workerId = 1n;
                this.dataCenterId = 1n;
                this.sequence = 0n;
                if (this.workerId > this.maxWrokerId || this.workerId < 0) {
                    throw new Error('_workerId must max tha n 0 and small than maxWrokerId-[' + this.maxWrokerId + ']');
                }
                if (this.dataCenterId > this.maxDataCenterId || this.dataCenterId < 0) {
                    throw new Error('_dataCenterId must max than 0 and small than maxDataCenterId-[' + this.maxDataCenterId + ']');
                }

                this.workerId = BigInt(_workerId);
                this.dataCenterId = BigInt(_dataCenterId);
                this.sequence = BigInt(_sequence);
            }
            Snowflake.prototype.tilNextMillis = function (lastTimestamp) {
                var timestamp = this.timeGen();
                while (timestamp <= lastTimestamp) {
                    timestamp = this.timeGen();
                }
                return BigInt(timestamp);
            };
            Snowflake.prototype.timeGen = function () {
                return BigInt(Date.now());
            };
            Snowflake.prototype.nextId = function () {
                var timestamp = this.timeGen();
                if (timestamp < this.lastTimestamp) {
                    throw new Error('Clock moved backwards. Refusing to generate id for ' +
                        (this.lastTimestamp - timestamp));
                }
                if (this.lastTimestamp === timestamp) {
                    this.sequence = (this.sequence + 1n) & this.sequenceMask;
                    if (this.sequence === 0n) {
                        timestamp = this.tilNextMillis(this.lastTimestamp);
                    }
                } else {
                    this.sequence = 0n;
                }
                this.lastTimestamp = timestamp;
                return ((timestamp - this.twepoch) << this.timestampLeftShift) |
                    (this.dataCenterId << this.dataCenterIdShift) |
                    (this.workerId << this.workerIdShift) |
                    this.sequence;
            };
            return Snowflake;
        })();
        return new Snowflake(1n, 1n, 0n).nextId().toString()
    }
};
