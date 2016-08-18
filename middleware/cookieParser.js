/**
 * Created by frank on 2016/8/15.
 */
/*
 * cookieParse
 * author:frank.
 * email:1262445244@qq.com
 */


/**
 * Inner const variables
 * @private
 */

//var cookie_reg = //;

/**
 * Module exports.
 * @public
 */

module.exports = cookieParser;

/**
 * Create a middleware.cookieParser
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @public
 */

function cookieParser(req,res,next){

    console.log("cookieParser begin-------------------------");

    var _cookieString = (req.headers["cookie"] || "").toString();

    var _cookies = {};

    if(_cookieString && _cookieString.trim() !==""){

        var arr = _cookieString.split(';');   //冒号分割

        arr.forEach(function(ele){

            var arrCookie = ele.split('=');  //等号分割

            if(arrCookie.length === 2){

                _cookies[arrCookie[0]] = arrCookie[1];

            }
        })
    }

    req.myCookies = _cookies;

    //console.log(req.myCookies);

    console.log("cookieParser end-------------------------");

    next();
}