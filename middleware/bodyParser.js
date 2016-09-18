/**
 * Created by frank on 2016/8/15.
 */


/*
 * bodyParse
 * author:frank.
 * email:1262445244@qq.com
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var querystring = require('querystring');
var urlParse = require('url').parse;
var ext = require('path').extname;
var newEjs = require('../module/ejs/ejs');
var utils = require('../app/tinyTool/utils');
/**
 * Module exports.
 * @public
 */

module.exports = bodyParser;

/**
 * Create a middleware.bodyParser
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @public
 */

function bodyParser(req, res, next) {

    if (req.url !== "/favicon.ico") {

        console.log("bodyParser begin-------------------------");

        _requestParser(req);
        _responseParser(res);

        var _urlParse = urlParse(req.url, true);
        //console.log(_urlParse);

        if (!req.myUrl) {
            req.myUrl = _urlParse.pathname;   //纯净url
        }

        var extname = ext(req.myUrl.toString());

        //js，png等格式直接跳过...
        if (extname === "" || extname === "." || extname === '.html' || extname === '.htm') {

            var _params;
            var _method = req.method.toString().toLowerCase();

            if (_method === "get") {
                _params = _urlParse.query;
                req.myBody = _params;    //url 参数
                //console.log("_params:  "+JSON.stringify(_params));

                console.log("bodyParser end---------------------------");
                next();
            }
            else if (_method === "post") {
                var data = "";
                req.on("data", function (chunk) {
                    data += chunk;
                });
                req.on("end", function () {
                    //console.log("data:  "+data);
                    _params = querystring.parse(data);

                    req.myBody = _params;    //url 参数
                    //console.log("_params:  "+JSON.stringify(_params));

                    console.log("bodyParser end---------------------------");
                    next();
                })
            }
        }

    }
}

function _requestParser(req){
    //methods
    req.myMethod = (req.method || "").toString().toLowerCase();
}


function _responseParser(res){
    //methods
    res.myRender = newEjs;
    res.mySend = function(opt){
        opt = opt || "";
        var postData;
        if (utils.isString(opt)){
            postData = opt;
        }else if(utils.isObject(opt)){
            postData = JSON.stringify(opt)
        }else{
            postData = JSON.stringify(opt);
        }

        res.end(postData);
    };

    //settings
    res.writeHead("200",{"content-Type":"text/html"})
}