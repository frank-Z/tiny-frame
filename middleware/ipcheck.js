/**
 * Created by frank on 2016/8/16.
 */
/*
 * ipCheck
 * author:frank.
 * email:1262445244@qq.com
 */

/**
 * Inner const variables
 * @private
 */

var _whiteList = [];   //白名单
var _blackList = [];   //黑名单
var ipContainer = {};  //储存请求IP，ip为键  单位请求次数为值
var ipContainerFreshTime = 10 * 60 * 1000;  // 刷新时间  10分钟

/**
 * Module exports.
 * @public
 */

module.exports.ipFilter = ipCheck;
//module.exports.getBlackList = getBlackList; //TODO
//module.exports.getWhiteList = getWhiteList; //TODO

/**
 * Create a filter ipCheck
 *
 * @param {Object} obj
 *   {"checkType":1,"frequencyLimit":false/[number]}
 *   checkType =1 为黑名单检查    =2 为白名单检查  默认为1
 *   frequencyLimit为false 则不作频率限制  为数值则为每10分钟的限制次数  默认1000
 * @public
 */

function ipCheck(obj){

        var _checkType = obj.checkType || 1,
            _frequencyLimit = obj.hasOwnProperty('frequencyLimit') ? obj.frequencyLimit : 1000 ;

        var _ipHandle,_frequencyHandle;

        _ipHandle = _checkType !== 1 ? ipWhiteCheck : ipBlackCheck ;

        if(_frequencyHandle !== false){

            _frequencyHandle = frequencyCheck(_frequencyLimit);

        }

        return function innerCheck(req,res,next){

            if(req.url !== "/favicon.ico") {
                console.log("ipCheck begin------------------------------------");

                var ip = req.headers['x-forwarded-for']
                    ||req.connection.remoteAddress
                    ||req.socket.remoteAddress
                    ||req.connection.socket.remoteAddress;

                ip = ip.split(':').slice(-1).join('');

                //console.log("ip : "+ ip)

                req.myIp = ip;

                if(_ipHandle(ip)&&(!_frequencyHandle||_frequencyHandle(ip,res))){

                    console.log("ipCheck end--------------------------------------");

                    next();

                }else{

                    res.writeHead(500,{"Content-Type":"text/html"});

                    res.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>IP无访问权限，请联系管理员</h1>");

                }
            }
        }
}

/**
 * white ip check
 *
 * @param {String} ip
 * @return {Boolean}
 * @private
 */

function ipWhiteCheck(ip){

    return _whiteList.indexOf(ip)=== -1 ? false : true;

}

/**
 * black ip check
 *
 * @param {String} ip
 * @return {Boolean}
 * @private
 */

function ipBlackCheck(ip){

    return _blackList.indexOf(ip)=== -1 ? true : false;

}

/**
 * ip request limit check
 *
 * @param {Number} num      ip request limited number per 10 minutes
 * @return {Function}
 * @private
 */

function frequencyCheck(num){

    return function(ip,res){

        ip = ip.toString();

        if(ipContainer.hasOwnProperty(ip)){

            var _num = ipContainer[ip.toString()];

            if(_num < num){

                ipContainer[ip.toString()]++;

                return true;

            }else{

                _blackList.push(ip);

                res.writeHead(500,{"Content-Type":"text/html"});

                res.end("<meta charset='UTF-8'><h1 style='color:red;margin: 5%'>请求过于频繁，已被加入黑名单，请联系管理员</h1>");

            }
        }
        else{

            ipContainer[ip.toString()] = 1;

            return true;

        }
    }
}


/**
 * set request ip records loop
 *
 * @private
 */

setInterval(function(){

    ipContainer = {};  //ip容器清空

    //_blackList.length = 0;  //黑名单清空

},ipContainerFreshTime);