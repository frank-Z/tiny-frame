/**
 * Created by frank-z on 2016/9/8.
 * email : 1262445244@qq.com
 */
var fs = require('fs');

var ACCESS_CASH = {};

module.exports.config = config;
module.exports.doAction = doAction;


function config() {

    global.defineAction = function (name, fn) {
        if (ACCESS_CASH[name]) {
            ACCESS_CASH[name] = fn;
            console.log("[module][access]重载方法 [" + name + "] 成功")
        } else {
            ACCESS_CASH[name] = fn;
            console.log("[module][access]加载方法 [" + name + "] 成功");
        }
    };

    var path = APP_DIR || path.normalize(process.cwd() + '/app/action/');

    var files = fs.readdirSync(path);

    console.log(files);

    files.forEach(function (filename) {

        require(path + filename);

    });
    console.log(ACCESS_CASH)
}


function doAction(name) {
    var _handle = ACCESS_CASH[name] || defaultAction;

    return _handle;
}


function defaultAction(req, res) {
    res.writeHead(404, { "Content-Type": "text/html" });

    res.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>访问不存在</h1>");
}


