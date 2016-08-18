/**
 * Created by frank on 2016/8/15.
 */
/*
 * staticHandle
 * author:frank.
 * email:1262445244@qq.com
 */
'use strict';

/**
 * Module dependencies.
 * @private
 */

var fs = require('fs');
var path = require('path');
var urlParse = require('url').parse;
var mime = require('../app/tinyTool/mime');
var normalize = path.normalize;


/**
 * Inner const variables
 * @private
 */

var CACHE_TIME = 24*60*60*1000*30;  //one month

/**
 * Module exports.
 * @public
 */

module.exports = staticHandle;


/**
 * Create a middleware.staticHandle
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @public
 */

function staticHandle(req,res,next){

    if(req.url !== "/favicon.ico") {

        console.log("staticHandle begin-------------------------");

        var _urlParse = urlParse(req.url, true);

        if (!req.myUrl) {
            req.myUrl = _urlParse.pathname;   //纯净url
        }
        var _extname = path.extname(req.myUrl.toString());

        //若请求为静态文件  静态文件访问路径格式  /assets/..../a.js
        if(mime.isStaticFile(_extname)){
            //若是以 "/assets/" 开头
            if(req.myUrl.toString().slice(0,8) === "/assets/"){

                var _static_root = STATIC_DIR || normalize(process.cwd() + '/static/');

                var _realPath = normalize(_static_root + req.myUrl.toString().slice(8));  //本地静态文件储存路径

                fs.exists(_realPath,function(exist){    //静态文件是否存在

                    if(!exist){  //若静态文件不存在

                        res.writeHead(404,{"Content-Type":"text/html"});

                        res.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>访问静态资源不存在</h1>");

                    }
                    else{   //若静态文件存在

                        fs.stat(_realPath,function(err,state){     //  读取静态文件  获取其最近修改时间mtime

                            if(err) {

                                console.log("[middleware][staticHandle]" + "get file state wrong");

                                res.writeHead(500,{"Content-Type":"text/html"});

                                res.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>系统繁忙</h1>");

                            }
                            else{

                                var serverLastModify = state.ctime.toUTCString(),    //S端静态文件最近修改时间
                                    clientLastModify = req.headers["if-modified-since"] || null; //C端储存的静态文件修改时间

                                var expires = new Date();
                                expires.setTime(expires.valueOf() + CACHE_TIME);

                                res.setHeader("Expires",expires.toUTCString() );
                                res.setHeader("Cache-Control","max-age="+CACHE_TIME); //设缓存时间

                                if(clientLastModify&& clientLastModify === serverLastModify){ //相同 提示读缓存

                                    res.writeHead(304,"Not Modify");

                                    console.log("staticHandle end---------------------------");

                                    res.end();

                                }
                                else{

                                    fs.readFile(_realPath,function(err,data){   //读文件
                                        if(err){

                                            console.log("[middleware][staticHandle]" + "read static file wrong");

                                            res.writeHead(500,{"Content-Type":"text/html"});

                                            res.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>系统繁忙</h1>");

                                        }
                                        else{

                                            res.setHeader("Last-Modified" , serverLastModify);

                                            res.writeHead(200,{"Content-Type":mime.lookupExtension(_extname)});

                                            console.log("staticHandle end---------------------------");

                                            res.end(data);

                                        }
                                    })
                                }
                            }
                        });
                    }
                })
            }
            else{

                res.writeHead(404,{"Content-Type":"text/html"});

                res.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>访问静态资源请以/assets/开头</h1>");

            }
        }
        else{

            console.log("staticHandle end---------------------------");

            next();

        }
    }
}