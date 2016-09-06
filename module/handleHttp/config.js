/**
 * Created by dt on 2016/9/6.
 */
module.exports = {
    getActionName:function(url){
       return _HTTP_CONFIG[url];
    }

};


var _HTTP_CONFIG = {
   "index":"indexAction"
};