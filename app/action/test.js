/**
 * Created by frank on 2016/8/18.
 */

defineAction("test",function(req,res){
    res.myRender('test',{"username":"test","title":"我是测试标题"})
})