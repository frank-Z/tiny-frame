# tiny-frame
  a tiny nodejs frame to practice my nodejs api

# 前言
  刚刚入门,若有错误,勿怪,本人QQ：1262445244,欢迎邮箱交流
> Just getting started, if there is a mistake, do not blame, My QQ:1262445244, welcome to the mail me

# 项目结构概要
  app为入口文件,当请求进入时,会通过connect生成一个app实例,首先依次通过中间件/filter,通过路径（功能）匹配,分入不同得router文件中,继续匹配路由找到对应的action,最后执行action操作.
> App file entry, when the request comes in, an app instances generated through a connect, first in turn by middleware /filter. By matching the path (function), divided into different router file, to match the route to find the corresponding action, and finally the implementation of action.

# middleware or filter
<ol>
<li>ipFilter</li>
<li>staticHandle</li>
<li>bodyParser</li>
<li>cookieParser</li>
<li>sessionParser</li>
</ol>

# router
<h3>未完待续...</h3>
