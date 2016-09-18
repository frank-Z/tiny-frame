/**
 * Created by dt on 2016/9/1.
 */
var toString = Object.prototype.toString;

module.exports = {
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
    cloneObjectFuck : function(old){
        var latest = JSON.parse(JSON.stringify(old));
        return latest;
    }

};