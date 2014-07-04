# 演示文档

---

 <script src="http://scdn.bozhong.com/source/common/js/jquery.min.js" type="text/javascript"></script>

````javascript
seajs.use(['index','jquery'], function(loginBox,$){
    var box = new loginBox({trigger:'#trigger'});
    console.log(box);
    box.on('open',function(){
    console.log('open');
}).on('authSuccess',function(uid){
    console.log('登录成功啦',uid)
}).on('authError',function(error,times){
    console.log('登录失败啦',error.error_message,times);
}).on('userinfoGotSuccess',function(user){
    console.log('信息获取成功啦',user);
}).on('close',function(){
    console.log('close');
});
box.on('all',function(name){
    // 打开调试工具查看输出 
    console.log('event::',name);
});
console.log(box);
});
````

<a href="javascript:" id="trigger" class="btn btn-danger">点我登录</a>

打开浏览器调试窗口查看输出


<script type="seedit/template" id="login-tpl">
<div class="loginBox">
    <form action="" id="JS_lb_form">
        <h3>播种网帐号登录</h3>
        <ul>
            <li>
                <label for="lb_username">用户名:</label>
                <input type="text" id="lb_username" tabindex="1">
                <a href="http://account.seedit.com/register/index" class="lb_signup" tabindex="4">新用户注册</a>
            </li>
             <li>
                <label for="lb_password">密码:</label>
                <input type="password" id="lb_password" tabindex="2">  
                <a href="http://account.seedit.com/register/findpwd" class="lb_findpwd" tabindex="5">
                    <i class="lb-tip-icon">&#13545</i>忘记密码
                </a>
            </li>
        </ul>
       
        <button id="lb_signin" type="submit" class="btn btn-danger btn-small pull-right" tabindex="3">登  录</button>
        <div class="alert alert-error" id="JS_lb_alert">
           <i class="lb-tip-icon">&#13544</i>
           <span>登录失败了，请重试</span>
        </div>
    </form>

    <div class="lb_bottom">
         <div class="lb_social">
        <h4>快捷登录：</h4>
        <a href="http://account.seedit.com/oauth/qq" class="lb_qq" title="使用QQ帐号登录" tabindex="6">QQ登录</a>
        <a href="http://account.seedit.com/oauth/sina" class="lb_weibo" title="使用微博帐号登录" tabindex="7">微博</a>
    </div>
    </div>
</div>
</script>