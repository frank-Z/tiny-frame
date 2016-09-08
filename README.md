# tiny-frame
  a tiny nodejs frame to practice my nodejs api

# preface
  Just getting started, if there is a mistake, do not blame, My QQ:1262445244, welcome to the mail me.
  
  Framework briefly process as follow:
  
  App file entry, when the request comes in, an app instances generated through a connect, first in turn by middleware /filter. By matching the path, divided into different router file, to match the route to find the corresponding action, and finally the implementation of action.

# middleware or filter

ipFilter：顾名思义,是用来检查请求IP的;用法如下：
> app.use(ipFilter({"checkType":1,"frequencyLimit":10}));  
> 其接受1个对象,共2个参数.checkType为检查类型,1为黑名单检查（即只有黑名单中的ip不能访问）,2为白名单检查,默认为1;
> frequencyLimit为单位时间访问数限制,false为不限制,数组则为每10分钟的访问次数限制（包括静态文件的访问，若只想限制网页的访问，请将staticHandle放于ipFilter之前）,默认次数1000.


staticHandle：是用来处理静态文件的：
> app.use(staticHandle);   

> 将所有静态文件的请求收集,判别，然后返回给客户端;

> 只有非静态文件才能通过此中间件;

bodyParser：解析请求所可能带的参数：
> app.use(bodyParser);      

> 暂时只支持数据量小的普通get和post请求,功能待完善;

> 将请求参数绑到req.myBody上面，其他参数待完善;

> 打算将一些方法也托管到res或req对象上面,暂时有res.myRender方法;

cookieParser：解析cookie
> app.use(cookieParser); 

> 暂时只支持普通字符串类的cookie解析,解析后产生的对象绑到了req.myCookies上;

> 其他待完善

sessionParser：获取session
> app.use(sessionParser);   

> 将myCookies上带session标识的赋值到req.mySession上;

> 其他待完善


# route
<h3>暂时废弃...</h3>

# handleHttp
<h3>业务处理</h3>

# 使用方法
1.在app/config/httpConfig 里面配置路径和方法名  如/test路径执行名称为的test函数,在对象中添加
> "/test":"test"

2.方法在app/action 里面定义 暂时不要在app下面再设文件夹 定义方法如下
> defineAction("test",function(req,res){
>   res.myRender('test.html',{"username":"test","title":"我是测试标题"})
>})

3.模板渲染函数res.myRender  一个参数接受html相对（app/view）路径名,第二个参数为一个对象,app/view存放模板页面，采用ejs模板


