# tiny-frame
  a tiny nodejs frame to practice my nodejs api

# preface
  Just getting started, if there is a mistake, do not blame, My QQ:1262445244, welcome to the mail me.
  
  Framework briefly process as follow:
  
  App file entry, when the request comes in, an app instances generated through a connect, first in turn by middleware /filter. By matching the path, divided into different router file, to match the route to find the corresponding action, and finally the implementation of action.

# middleware or filter

ipFilter
> ipFilter,顾名思义,是用来检查请求IP的;用法如下：
>>   app.use(ipFilter({"checkType":1,"frequencyLimit":10}));  
> 其接受1个对象,共2个参数.checkType为检查类型,1为黑名单检查（即只有黑名单中的ip不能访问）,2为白名单检查,默认为1;
> frequencyLimit为单位时间访问数限制,false为不限制,数组则为每10分钟的访问次数限制（包括静态文件的访问，若只想限制网页的访问，请将staticHandle放于ipFilter之前）,默认次数1000.


staticHandle

bodyParser

cookieParser

> ## 这是一个标题。
> 
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     return shell_exec("echo $input | $markdown_script");
sessionParser


# route
<h3>未完待续...</h3>
