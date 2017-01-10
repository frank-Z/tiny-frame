/**
 * Created by frank-Z on 2017/1/10.
 * email ：1262445244
 */
var http = require('http');
var urlParser = require("url").parse;

module.exports = Connect;

function Connect() {
    return new APP();
}

function APP() {
    this._stack = [];
}

var proto = APP.prototype;

proto.listen = function (port) {
    var self = this;
    http.createServer(function (req, res) {
        self.handle(req, res);
    }).listen(port,function () {
        console.log("listen " +　port+ " port");
    });
};

/**
 *  中间件函数收集
 * @param route
 * @param fn
 */
proto.use = function (route,fn) {
    var self = this;

    if(route && !fn){
        fn = route;
        route = "/";
    }

    if (!(fn && typeof fn == "function")) {
        throw new Error("中间件必须为函数");
    }

    self._stack.push({route:route,fn:fn});
};

/**
 *  接收请求 拉取数组内函数
 * @param req
 * @param res
 */
proto.handle = function (req, res) {
    var self = this;
    var index = 0;
    var ori_url = urlParser(req.url).pathname;

    function next() {
        var _handle = self._stack[index];
        if(_handle && _handle.fn){
            index ++ ;
            if(stringMatch(_handle.route,ori_url)){
                _handle.fn(req,res,next);
            }else {
                next();
            }
        }
    }
    next();
};

/**
 *  路由模板匹配  todo.. 暂时为强制匹配  stringMatch("/a",'/ae') == true
 * @param tlp  模板
 * @param target  路由
 */
function stringMatch(tlp,target) {
    return tlp === target.slice(0,tlp.length)
}
