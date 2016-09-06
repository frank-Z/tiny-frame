/**
 * Created by dt on 2016/9/6.
 */
/*
 * handleHttp
 * author:frank.
 * email:1262445244@qq.com
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */
var doAction = require('./config');

/**
 * Module exports.
 * @public
 */

module.exports = handlerHttp;

/**
 * Create a Http handler method
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @public
 */

function handlerHttp(req, res, next) {

    var fn_Name = doAction.getActionName(req.myUrl) || "defaultAction";


    fn(req,res,next);

    function fn(req,res,next){
        var _fn = DEFINE_ACTION_ARRAY[fn_Name];
    }

}