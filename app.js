/**
 * Created by frank on 2016/8/15.
 */

/*
 * app
 * author:frank.
 * email:1262445244@qq.com
 */

var app = require('connect')();
var bodyParser = require('./middleware/bodyParser');
var staticHandle = require('./middleware/staticHandle');
var sessionParser = require('./middleware/sessionParser');
var cookieParser = require('./middleware/cookieParser');
var ipFilter = require('./middleware/ipcheck').ipFilter;
var path = require('path');

var handleHttp = require('./module/handleHttp/index');
//var index = require('./routes/index');

//global
global.ROOT_DIR = __dirname || process.cwd();
global.STATIC_DIR = path.normalize(ROOT_DIR + '/static/');
global.TEMPLATE_DIR = path.normalize(ROOT_DIR+'/app/view/');

//middleware
app.use(ipFilter({"checkType":1,"frequencyLimit":100}));  // checkType =1 为黑名单检查    =2 为白名单检查  默认为1
                                                               // frequencyLimit为false 则不作频率限制  为数值则为每10分钟的限制次数  默认1000 超过频率将加入黑名单
app.use(staticHandle);               //处理静态文件
app.use(bodyParser);                 //解析url请求参数 及绑定一些方法
app.use(cookieParser);               //cookie解析
app.use(sessionParser);              //session 解析

//routes  本打算模仿express写的 不是很明白 也和其他设计有些冲突 换种写法   【根目录routes文件夹暂时没用】
//app.use('/',index);

//handle  处理路径 不能区分get，post请求  若要区分 请在action方法体里写
app.use(handleHttp);


app.use(function(req,res,next){

    res.myRender(req.myUrl,{"username":"test","title":"我是测试标题"})

});

app.listen(3000);




