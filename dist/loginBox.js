define("moe/seedit.loginBox/0.0.2/loginBox",["moe/dialog/0.0.1/dialog","moe/API/0.0.3/API","arale/events/1.1.0/events"],function(a,b,c){var d=jQuery;a("moe/dialog/0.0.1/dialog"),a.async(["moe/alert/0.0.1/alert.css","./loginBox.css"]);var e,f=a("moe/API/0.0.3/API"),g=a("moe/seedit.user/0.0.2/seedit.user"),h=a("arale/events/1.1.0/events"),i=0,j="",k=g.getLastLoginInfo(),l=k.username||"";j+='<div class="loginBox">',j+='    <form action="" id="JS_lb_form">',j+="        <h3>播种网帐号登录</h3>",j+="        <ul>",j+="            <li>",j+='                <label for="lb_username">用户名:</label>',j+='                <input type="text" id="lb_username" tabindex="1">',j+='                <a href="http://account.seedit.com/register/index" class="lb_signup" tabindex="4">新用户注册</a>',j+="            </li>",j+="             <li>",j+='                <label for="lb_password">密码:</label>',j+='                <input type="password" id="lb_password" tabindex="2">  ',j+='                <a href="http://account.seedit.com/register/findpwd" class="lb_findpwd" tabindex="5">',j+='                    <i class="lb-tip-icon">&#13545</i>忘记密码',j+="                </a>",j+="            </li>",j+="        </ul>",j+="       ",j+='        <button id="lb_signin" type="submit" class="x-btn x-btn-danger x-btn-small pull-right" tabindex="3">登  录</button>',j+='        <div class="alert alert-error" id="JS_lb_alert">',j+='           <i class="lb-tip-icon">&#13544</i>',j+="           <span>登录失败了，请重试</span>",j+="        </div>",j+="    </form>",j+="",j+='    <div class="lb_bottom">',j+='         <div class="lb_social">',j+="        <h4>快捷登录：</h4>",j+='        <a href="http://account.seedit.com/oauth/qq" class="lb_qq" title="使用QQ帐号登录" tabindex="6">QQ登录</a>',j+='        <a href="http://account.seedit.com/oauth/sina" class="lb_weibo" title="使用微博帐号登录" tabindex="7">微博</a>',j+="    </div>",j+="    </div>",j+="</div>",d("body").on("keydown","#JS_lb_form input,#JS_lb_form select,#JS_lb_form textarea",function(a){var b,c,e=d(this),f=e.parents("form:eq(0)");return 13==a.keyCode?(b=f.find("input,select,textarea").filter(":visible"),c=b.eq(b.index(this)+1),c.length?c.focus():f.submit(),!1):void 0});var m=function(a){a=a||{};var b={};return d.extend(b,a),this.o=function(){return b}(),this.on("submitStart",function(){d("#lb_signin").prop("diabled",!0).text("提交中")}),this.on("submitDone",function(){d("#lb_signin").prop("diabled",!1).text("登录")}),this.on("authError",function(a,b){e.find("span").text(a.error_message).closest(".alert").show(),5===b&&e.find("span").html('亲是忘记密码了么，<button class="x-btn x-btn-danger x-btn-sm x-btn-small pull-right" type="button">点我去找回</button>')}),this.on("userinfoGotSuccess",function(a){g.setLastLoginInfo(a.username,a.uid)}),this.init(b)};m.prototype={init:function(a){var b,c=this,g=function(a){a.preventDefault();var b=d("#lb_username"),e=d("#lb_password"),g=function(){d(this).val()&&d(this).removeClass("lb_error")};return b.on("blur",g),e.on("blur",g),d.trim(b.val())?d.trim(e.val())?(c.trigger("submitStart"),f.post("ucenter/login",{username:b.val(),password:e.val()},function(a){c.trigger("submitDone","success"),c.trigger("authSuccess",a.data.uid),f.get("bbs/common_member",function(a){c.trigger("userinfoGotSuccess",a)},function(a){c.trigger("userinfoGotError",a)})},function(a){i++,c.trigger("submitDone","error"),c.trigger("authError",a,i)}),void 0):(e.addClass("lb_error").focus(),void 0):(b.addClass("lb_error").focus(),void 0)},h=function(){b=d.dialog(j,{title:!1,closebtn:!0,border:!1,drag:!0,onshow:function(){c.trigger("open"),e=d("#JS_lb_alert"),l?(d("#lb_username").val(l),setTimeout(function(){d("#lb_password").focus()},0)):setTimeout(function(){d("#lb_username").focus()},0),d("#lb_signin").click(g),d("#JS_lb_form").submit(g)},onclose:function(){c.trigger("close")}})};return a.trigger?d(a.trigger).on("click.loginBox",h):h(),this},beforeunload:function(){return this},close:function(){d.dialog.hide()}},h.mixTo(m),c.exports=m});
