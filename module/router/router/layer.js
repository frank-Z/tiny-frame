/**
 * Created by dt on 2016/9/1.
 */
var utils = require('../../../app/tinyTool/utils');

/**
 * Layer
 *
 * @param {String} path
 * @param {String} type      post,get,all
 * @param {Function} fn
 *
 * @public
 */


function Layer(path, type, fn) {
    this.path = path || '/';
    this.type = type.toLowerCase() || 'all';
    this.handle = fn;
}

var pro = Layer.prototype;

pro.match = function (path, type) {
    type = type.toLowerCase();

    if (path && utils.isString(path) && type && utils.isString(path)) {   //参数检查

        if (path == this.path) {    //路径检查

            if (this.type == 'all' || this.type == type) {   //all类型能匹配get和post请求
                return true;
            }
        }
    }
    return false;
};

pro.handle = function (req, res, next) {
    var fn = this.handle;

    if (fn && utils.isFunction(fn)) {
        fn(req, res, next)
    }
};
