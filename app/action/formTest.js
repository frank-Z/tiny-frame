/**
 * Created by frank-Z on 2016/9/18.
 */
var FileDB = require('../../module/db/fileDB');

defineAction("formTest",function(req,res){
    //get 页面渲染
    if(req.myMethod === "get"){
        res.myRender("formTest",{"title":"表单提交"})
    }
    //post请求接收
    else if(req.myMethod === "post"){
        var file = new FileDB('formTest');
        file.save(req.myBody,function(err,data){
            if(err){

            }else{
                res.mySend(req.myBody);
            }
        })

    }
});

defineAction("getFormTest",function(req,res){
    var file = new FileDB('formTest');
    file.get(req.myBody,function(err,data){
        if(err){
            res.mySend("err")
        }else{
            //console.log("data : "+data)
            res.mySend(data);
        }
    })
});