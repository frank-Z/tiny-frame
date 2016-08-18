/**
 * Created by frank on 2016/8/18.
 */
/*
 * ejs module
 * author:frank.
 * email:1262445244@qq.com
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var ejs = require('ejs');
var normalize = require('path').normalize;
var fs = require('fs');

/**
 * Module exports.
 * @public
 */

module.exports = newEjs;

/**
 * Create a middleware.bodyParser
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @public
 */

function newEjs(path,obj){
    var _self = this;

    if(path.toString().indexOf('.') === -1){
        path = path + ".html";
    }

    var _template_root = TEMPLATE_DIR || normalize(process.cwd() + '/app/view/');

    var _realPath = normalize(_template_root+ path);

    console.log("_realPath : "+_realPath);

    fs.exists(_realPath,function(exist){
        if(!exist){

            _self.writeHead(404,{"Content-Type":"text/html"});

            _self.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>NOT FOUND</h1>");

        }
        else{

            ejs.renderFile(_realPath, obj,{delimiter: '?'}, function(err, str){

                if(err){

                    console.log("[module][ejs]" + "render file wrong");

                    _self.writeHead(200,{"Content-Type":"text/html"});

                    _self.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>系统繁忙</h1>");

                }
                else{

                    _self.writeHead(200,{"Content-Type":"text/html"});

                    _self.end(str);

                }
            });
        }
    })
}