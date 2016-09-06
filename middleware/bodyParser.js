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
            }
            else if (_method === "post") {
                var data = "";
                req.on("data", function (chunk) {
                    data += chunk;
                });
                req.on("end", function () {
                    _params = querystring.parse(query);
                })
            }
            req.myBody = _params;    //url 参数
            //console.log("_params:  "+JSON.stringify(_params));
        }

        res.myRender = newEjs;

        console.log("bodyParser end---------------------------");
        next();

    }
};