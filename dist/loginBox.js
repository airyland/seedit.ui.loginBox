define("moe/seedit-loginBox/0.0.4/loginBox",["moe/dialog/0.0.2/dialog","moe/API/0.0.3/API","moe/seedit-user/0.0.4/seedit-user","arale/events/1.1.0/events"],function(a,b,c){var d=jQuery,e=a("moe/dialog/0.0.2/dialog");a.async(["moe/alert/0.0.1/alert.css","./loginBox.css"]);var f,g=a("moe/API/0.0.3/API"),h=a("moe/seedit-user/0.0.4/seedit-user"),i=a("arale/events/1.1.0/events"),j=0,k="",l=h.getLastLoginInfo(),m=l.username||"";k+='<div class="loginBox">',k+='    <form action="" id="JS_lb_form">',k+="        <h3>播种网帐号登录</h3>",k+="        <ul>",k+="            <li>",k+='                <label for="lb_username">用户名:</label>',k+='                <input type="text" id="lb_username" tabindex="1">',k+='                <a href="http://account.seedit.com/register/index" class="lb_signup" tabindex="4">新用户注册</a>',k+="            </li>",k+="             <li>",k+='                <label for="lb_password">密码:</label>',k+='                <input type="password" id="lb_password" tabindex="2">  ',k+='                <a href="http://account.seedit.com/register/findpwd" class="lb_findpwd" tabindex="5">',k+='                    <i class="lb-tip-icon">&#13545</i>忘记密码',k+="                </a>",k+="            </li>",k+="        </ul>",k+="       ",k+='        <button id="lb_signin" type="submit" class="x-btn x-btn-danger x-btn-small pull-right" tabindex="3">登  录</button>',k+='        <div class="alert alert-error" id="JS_lb_alert">',k+='           <i class="lb-tip-icon">&#13544</i>',k+="           <span>登录失败了，请重试</span>",k+="        </div>",k+="    </form>",k+="",k+='    <div class="lb_bottom">',k+='         <div class="lb_social">',k+="        <h4>快捷登录：</h4>",k+='        <a href="http://account.seedit.com/oauth/qq" class="lb_qq" title="使用QQ帐号登录" tabindex="6">QQ登录</a>',k+='        <a href="http://account.seedit.com/oauth/sina" class="lb_weibo" title="使用微博帐号登录" tabindex="7">微博</a>',k+="    </div>",k+="    </div>",k+="</div>",d("body").on("keydown","#JS_lb_form input,#JS_lb_form select,#JS_lb_form textarea",function(a){var b,c,e=d(this),f=e.parents("form:eq(0)");return 13==a.keyCode?(b=f.find("input,select,textarea").filter(":visible"),c=b.eq(b.index(this)+1),c.length?c.focus():f.submit(),!1):void 0});var n=function(a){a=a||{};var b={};return d.extend(b,a),this.o=function(){return b}(),this.on("submitStart",function(){d("#lb_signin").prop("diabled",!0).text("提交中")}),this.on("submitDone",function(){d("#lb_signin").prop("diabled",!1).text("登录")}),this.on("authError",function(a,b){f.find("span").text(a.error_message).closest(".alert").show(),5===b&&f.find("span").html('亲是忘记密码了么，<button class="x-btn x-btn-danger x-btn-sm x-btn-small pull-right" type="button">点我去找回</button>')}),this.on("userinfoGotSuccess",function(a){h.setLastLoginInfo(a.username,a.uid)}),this.init(b)};n.prototype={init:function(a){var b,c=this,h=function(a){a.preventDefault();var b=d("#lb_username"),e=d("#lb_password"),f=function(){d(this).val()&&d(this).removeClass("lb_error")};return b.on("blur",f),e.on("blur",f),d.trim(b.val())?d.trim(e.val())?(c.trigger("submitStart"),g.post("ucenter/login",{username:b.val(),password:e.val()},function(a){c.trigger("submitDone","success"),c.trigger("authSuccess",a.data.uid),g.get("bbs/common_member",function(a){c.trigger("userinfoGotSuccess",a)},function(a){c.trigger("userinfoGotError",a)})},function(a){j++,c.trigger("submitDone","error"),c.trigger("authError",a,j)}),void 0):(e.addClass("lb_error").focus(),void 0):(b.addClass("lb_error").focus(),void 0)},i=function(){b=e.dialog(k,{title:!1,closebtn:!0,border:!1,drag:!0,onshow:function(){c.trigger("open"),f=d("#JS_lb_alert"),m?(d("#lb_username").val(m),setTimeout(function(){d("#lb_password").focus()},0)):setTimeout(function(){d("#lb_username").focus()},0),d("#lb_signin").click(h),d("#JS_lb_form").submit(h)},onclose:function(){c.trigger("close")}})};return a.trigger?d(a.trigger).on("click.loginBox",i):i(),this},beforeunload:function(){return this},close:function(){d.dialog.hide()}},i.mixTo(n),c.exports=n});
