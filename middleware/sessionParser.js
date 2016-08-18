/**
 * Created by frank on 2016/8/15.
 */
/*
 * sessionParse
 * author:frank.
 * email:1262445244@qq.com
 */

/**
 * Module exports.
 * @public
 */

module.exports =sessionParser;

/**
 * Create a middleware.sessionParser
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @public
 */

function sessionParser(req,res,next){

    console.log("sessionParser begin-------------------------");

    var _cookies = req.myCookies || {};
    var _session = {};

    if(_cookies && _cookies.toString() != '{}'){

        for(var key in _cookies){

            var _isSession = key.toString().indexOf('session') === -1 ? false : true;

            if(_isSession){

                _session[key] = _cookies[key];

            }
        }
    }

    req.mySession = _session;

    //console.log(req.mySession)

    console.log("sessionParser end-------------------------");

    next();
}