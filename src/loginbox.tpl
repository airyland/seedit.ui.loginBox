<div class="loginBox">
    <form method="POST" action="http://account.seedit.com/" id="JS_lb_form">
        <h3>{{title}}</h3>
        <ul>
            <li>
                <label for="lb_username">用户名:</label>
                <input type="text" id="lb_username" tabindex="1" name="account"> <a href="http://account.seedit.com/register/index" class="lb_signup" tabindex="4">新用户注册</a>
            </li>
            <li>
                <label for="lb_password">密码:</label>
                <input type="password" id="lb_password" tabindex="2" name="password">
                <a href="http://account.seedit.com/register/findpwd" class="lb_findpwd" tabindex="5"> <i class="lb-tip-icon">&#13545</i>忘记密码</a>
            </li>
        </ul>
        <button id="lb_signin" type="submit" class="x-btn x-btn-danger x-btn-small pull-right" tabindex="3">登 录</button>
        <div class="alert alert-error" id="JS_lb_alert"> <i class="lb-tip-icon">&#13544</i>
            <span>登录失败了，请重试</span>
        </div>
    </form>
    <div class="lb_bottom">
        <div class="lb_social">
            <h4>快捷登录：</h4> <a href="http://account.seedit.com/oauth/qq" class="lb_qq" title="使用QQ帐号登录" tabindex="6">QQ登录</a>  <a href="http://account.seedit.com/oauth/sina" class="lb_weibo" title="使用微博帐号登录" tabindex="7">微博</a>
        </div>
    </div>
</div>
