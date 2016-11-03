/**
 * Created by dt on 2016/9/1.
 */
var crypto = require("crypto");

var toString = Object.prototype.toString;


module.exports = {
    /* --数据类型检查---------------------------*/
    isString: function (str) {
        if (toString.call(str) === "[object String]") {
            return true;
        }
        return false;
    },
    isFunction: function (fn) {
        if (toString.call(fn) === "[object Function]") {
            return true;
        }
        return false;
    },
    isObject: function (fn) {
        if (toString.call(fn) === "[object Object]") {
            return true;
        }
        return false;
    },
    isIp: function (ip) {
        // 211.222.11.*
        return /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))|\*)/.test(ip);
    },

    /* --数据操作--------------------------*/
    //深拷贝（完美）
    cloneObjectPerfect: function (obj) {
        if (typeof obj === "object") {
            if (util.isArray(obj)) {
                var newArr = [];
                for (var i = 0; i < obj.length; i++) newArr.push(obj[i]);
                return newArr;
            } else {
                var newObj = {};
                for (var key in obj) {
                    newObj[key] = this.cloneObject(obj[key]);
                }
                return newObj;
            }
        } else {
            return obj;
        }
    },
    //深拷贝（缺陷）
    cloneObjectFuck: function (old) {
        var latest = JSON.parse(JSON.stringify(old));
        return latest;
    },
    //MD5
    toMD5: function (content) {
        return crypto.createHash('md5').update(content).digest('hex');
    },
    //Sha1
    toSha1: function (text) {
        return crypto.createHash("sha1").update(text, "utf8").digest('hex');
    },
    //小数加法
    decAdd: function (a, b, precision) {
        var x = Math.pow(10, precision || 3);
        return (Math.round(a * x) + Math.round(b * x)) / x;
    },
    //小数减法
    decSub: function (a, b, precision) {
        var x = Math.pow(10, precision || 3);
        return (Math.round(a * x) - Math.round(b * x)) / x;
    },
    //小数乘法
    decMul: function (a, b, precision) {
        var x = Math.pow(10, precision || 3);
        return (Math.round(a * x) * Math.round(b * x)) / (x * x);
    },
    //小数除法
    decDiv: function (a, b, precision) {
        var x = Math.pow(10, precision || 3);
        return Math.round((Math.round(a * x) / Math.round(b * x)) * x) / x;
    },
    //随机数生成
    random: function (type, len) {    //type 类型有 string num mixture smMixture bgMixture easyMixture
        len = len || 32;
        var $chars;
        switch (type) {
            case 'string':
                $chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
                break;
            case 'num':
                $chars = '0123456789';
                break;
            case 'mixture':
                $chars = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
                break;
            case 'smMixture':
                $chars = '0123456789qwertyuiopasdfghjklzxcvbnm';
                break;
            case 'bgMixture':
                $chars = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
                break;
            /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            case 'easyMixture':
                $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                break;
            /****默认mixture****/
            default :
                $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                break;
        }

        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
};
