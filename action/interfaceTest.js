/**
 * Created by dt on 2016/10/18.
 */
var utils = require('../tinyTool/utils.js');
var date = require('../tinyTool/date.js');
var http = require('http');
var urlParse = require('url').parse;
var querystring = require('querystring');

var interfaceTestData = {
    data_URL : [],
    data_UserId : [],
    data_FunctionId : [],
    data_key : []
}


//接口测试页面
defineAction("interfaceTest",function(req,res){
    res.myRender("interfaceTest.html",{"haha":"hahahahahahaha.....","title":"我是hehe"})
});

//接口测试页面按钮点击
defineAction("interfaceTestClick",function(req,res){
    var data=req.myBody;
    var id = data.id;
    var arr_id = "data_"+id;
    var arr = interfaceTestData[arr_id];
    res.mySend(arr);
});


defineAction("InterfaceTestApi",function(req,res){
    var data = req.myBody;
    var method = data.method_type;
    var url = data.URL;
    var UserId = data.UserId;
    var FunctionId = data.FunctionId;
    var key = data.key.toString();
    var isMD5 = data.MD5;
    var postData ;
    try{
        postData = JSON.parse(data.postData);
    }catch (e){
        res.mySend("[测试工具错误]JSON.parse解析错误：" + e);return
    }

    if(!(method &&url&&UserId&&FunctionId&&key&&postData)){
        res.mySend("[测试工具错误]参数缺失");return
    }
    console.log(111)
    insertData("data_URL",url);
    insertData("data_UserId",UserId);
    insertData("data_FunctionId",FunctionId);
    insertData("data_key",key);

    console.log(interfaceTestData)
    //是否再加密
    if(isMD5 ===true || isMD5 === "true"){
        key = utils.toMD5(key);
    }
    var time = date.getFormatDate('yyyyMMddhhmmss');
    var sign = utils.toMD5(UserId.toString() + key + FunctionId + time);

    var _postData = {
        "UserId": UserId,
        "FunctionId": FunctionId,
        "Time": time,
        "RequestData":postData,
        "Sign": sign
    };

    //var postData = querystring.stringify({
    //    "UserId": UserId,
    //    "FunctionId": FunctionId,
    //    "Time": time,
    //    "RequestData":postData,
    //    "Sign": sign
    //});
    //console.log()
    var post_task_data = { "j": JSON.stringify(_postData) };
    var post_data = querystring.stringify(post_task_data);

    var opts = urlParse(url);
    var options = {
        hostname: opts.hostname,
        port: opts.port,
        path: opts.pathname,
        method:method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    var req = http.request(options, function(_res) {
        _res.setEncoding('utf8');
        var data = "";
        _res.on('data', function (chunk) {
            data += chunk;
        });
        _res.on('end', function() {
            console.log(data);
            res.mySend(data);
        })
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(post_data);

});



function insertData(arr_name,arr_data){
    var bol = interfaceTestData[arr_name].indexOf(arr_data);
    if(bol== -1){
        interfaceTestData[arr_name].push(arr_data)
    }
    var l = interfaceTestData[arr_name].length;
    if(l>10){
        interfaceTestData[arr_name].shift();
    }
}