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
    cloneObjectFuck : function(old){
        var latest = JSON.parse(JSON.stringify(old));
        return latest;
    },
    //MD5
    toMD5 :function(content){
        return crypto.createHash('md5').update(content).digest('hex');
    }
};