/**
 * Created by dt on 2016/9/1.
 */
var Layer = require('./layer');
var url = require('url');

function Router(path){
   this.stack  = [];
}

var pro = Router.prototype;

pro.get = function(path,fn){

    var _layer = new Layer(path , "get", fn);

    this.stack.push(_layer);

};

pro.post = function(path,fn){

    var _layer = new Layer(path , "post", fn);

    this.stack.push(_layer);

};

pro.handle = function(req,res,next){
    var self = this;
    var arr = self.stack;
    var i = 0;
    var method = req.method.toLowerCase();
    var path = req.myUrl || url.parse(req.url).pathname;

    function getFn(){
         if(i >= arr.length){
             next();
         };
        if(arr[i].match(path,method)){
            return arr[i].handle(req,res,next);
        }
        getFn()
    }

    getFn();
};