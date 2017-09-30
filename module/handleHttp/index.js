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
var doActionName = require('./config');
var doAction = require('../access/index').doAction;

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

    var fn_Name = doActionName.getActionName(req.myUrl) || "defaultAction";

    console.log("fn_Name: " + fn_Name);

    var fn = doAction(fn_Name);

    fn(req, res, next);

}