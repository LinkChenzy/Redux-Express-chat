const crypto = require('crypto');

module.exports = {
    ResponseClient(res, httpCode = 500, code = 3, message = '服务端异常', data = {}) {
        let responseData = {};
        responseData.code = code;
        responseData.message = message;
        responseData.data = data;
        res.status(httpCode).json(responseData)
    },
    /**
     * MD5加密
     * @property MD5
     * @param {string} password 密码
     */
    MD5(password) {
        return crypto.createHash('md5').update(new Buffer(password)).digest('hex');
    },
    /**
     * 密码加密
     * @property GeneratePassword
     * @param {string} password 密码
     */
    GeneratePassword(password) {
        let pass = this.MD5(password);
        let left = pass.substring(0, 5);
        let right = pass.substring(27, 32);
        let str = this.MD5(left).substring(0, 6) + '%&hywd' + this.MD5(right).substring(28, 32);
        return this.MD5(str);
    }
}