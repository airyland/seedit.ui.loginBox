# 演示文档

---

<script>
    seajs.config({
        path:'http://172.16.5.98:81/ui/'
    })
</script>

<style>
    .loginBox {overflow:hidden;}
    .loginBox form {float:left;overflow:hidden;border-right:1px solid #ddd;}
    .loginBox ul{padding:0;padding:0 30px 0 15px;}
    .loginBox li{list-style:none;margin-bottom:15px;}
    .loginBox li input {width:180px;border:1px solid #ccc;border-radius:2px;padding:5px 3px;}
    .loginBox li label {display:block;width:60px;text-align:right;float:left;color:#666;margin-right:10px;}
    .lb_social {float:left;padding:25px 25px 25px 35px;}
    .lb_qq,.lb_weibo {display:block;width:120px;height:24px;text-indent:-9999px;}
    .lb_qq {background:url(http://images.infzm.com/images/passport/snsicon/qq.png);margin-bottom:15px;}
    .lb_weibo {background:url(http://images.infzm.com/images/passport/snsicon/sina.png);}
</style>

````javascript
seajs.use('loginBox', function(loginBox){
    var $ = jQuery;
    var box = new loginBox({trigger:'#trigger'});
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

console.log(box);
});
````

<a href="javascript:" id="trigger">点我登录</a>

打开浏览器调试窗口查看输出


<script type="seedit/template" id="login-tpl">
    <div class="loginBox">
    <form action="">
        <ul>
            <li>
                <label for="lb_username">用户名:</label>
                <input type="text" id="lb_username">
            </li>
             <li>
                <label for="lb_password">密码:</label>
                <input type="password" id="lb_password">
            </li>
        </ul>
        <button id="lb_signin">登录</button>
    </form>

    <div class="lb_social">
        <a href="" class="lb_qq" title="使用QQ帐号登录">QQ登录</a>
        <a href="" class="lb_weibo" title="使用微博帐号登录">微博</a>
    </div>



</div>
</script>