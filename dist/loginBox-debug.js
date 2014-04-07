define("moe/seedit.loginBox/0.0.1/loginBox-debug", [ "moe/dialog/0.0.1/dialog-debug", "moe/API/0.0.3/API-debug", "arale/events/1.1.0/events-debug" ], function(require, exports, module) {
    // @todo 支持读取最近登录用户名
    var $ = jQuery;
    // dialog
    require("moe/dialog/0.0.1/dialog-debug");
    // async require styles
    require.async([ "moe/alert/0.0.1/alert.css", "./loginBox.css" ]);
    // COMMON API support
    var API = require("moe/API/0.0.3/API-debug");
    // event emitter
    var Events = require("arale/events/1.1.0/events-debug");
    // fail times
    var authFailNo = 0;
    // login template
    var loginHTML = "";
    var $alert;
    loginHTML += '<div class="loginBox">';
    loginHTML += '    <form action="" id="JS_lb_form">';
    loginHTML += "        <h3>播种网帐号登录</h3>";
    loginHTML += "        <ul>";
    loginHTML += "            <li>";
    loginHTML += '                <label for="lb_username">用户名:</label>';
    loginHTML += '                <input type="text" id="lb_username" tabindex="1">';
    loginHTML += '                <a href="http://account.seedit.com/register/index" class="lb_signup" tabindex="4">新用户注册</a>';
    loginHTML += "            </li>";
    loginHTML += "             <li>";
    loginHTML += '                <label for="lb_password">密码:</label>';
    loginHTML += '                <input type="password" id="lb_password" tabindex="2">  ';
    loginHTML += '                <a href="http://account.seedit.com/register/findpwd" class="lb_findpwd" tabindex="5">';
    loginHTML += '                    <i class="lb-tip-icon">&#13545</i>忘记密码';
    loginHTML += "                </a>";
    loginHTML += "            </li>";
    loginHTML += "        </ul>";
    loginHTML += "       ";
    loginHTML += '        <button id="lb_signin" type="submit" class="x-btn x-btn-danger x-btn-small pull-right" tabindex="3">登  录</button>';
    loginHTML += '        <div class="alert alert-error" id="JS_lb_alert">';
    loginHTML += '           <i class="lb-tip-icon">&#13544</i>';
    loginHTML += "           <span>登录失败了，请重试</span>";
    loginHTML += "        </div>";
    loginHTML += "    </form>";
    loginHTML += "";
    loginHTML += '    <div class="lb_bottom">';
    loginHTML += '         <div class="lb_social">';
    loginHTML += "        <h4>快捷登录：</h4>";
    loginHTML += '        <a href="http://account.seedit.com/oauth/qq" class="lb_qq" title="使用QQ帐号登录" tabindex="6">QQ登录</a>';
    loginHTML += '        <a href="http://account.seedit.com/oauth/sina" class="lb_weibo" title="使用微博帐号登录" tabindex="7">微博</a>';
    loginHTML += "    </div>";
    loginHTML += "    </div>";
    loginHTML += "</div>";
    $("body").on("keydown", "#JS_lb_form input,#JS_lb_form select,#JS_lb_form textarea", function(e) {
        var self = $(this), form = self.parents("form:eq(0)"), focusable, next;
        if (e.keyCode == 13) {
            focusable = form.find("input,select,textarea").filter(":visible");
            next = focusable.eq(focusable.index(this) + 1);
            if (next.length) {
                next.focus();
            } else {
                form.submit();
            }
            return false;
        }
    });
    var loginBox = function(option) {
        option = option || {};
        var o = {};
        $.extend(o, option);
        this.o = function() {
            return o;
        }();
        /* 交互 */
        //点击登录，按钮disable,如果有出错消息进行清除
        this.on("submitStart", function() {
            $("#lb_signin").prop("diabled", true).text("提交中");
        });
        // 登录结束，按钮enable
        this.on("submitDone", function() {
            $("#lb_signin").prop("diabled", false).text("登录");
        });
        // 登录失败，显示错误
        // 登录失败超过5次，提示找回密码
        this.on("authError", function(error, times) {
            $alert.find("span").text(error.error_message).closest(".alert").show();
            if (times === 5) {
                $alert.find("span").html('亲是忘记密码了么，<button class="x-btn x-btn-danger x-btn-sm x-btn-small pull-right" type="button">点我去找回</button>');
            }
        });
        return this.init(o);
    };
    loginBox.prototype = {
        // initialize
        init: function(option) {
            var _this = this;
            var dialog;
            var submitHandler = function(e) {
                e.preventDefault();
                // validator
                var $username = $("#lb_username"), $pwd = $("#lb_password");
                // remove error class when blur
                var errorRemover = function() {
                    if ($(this).val()) $(this).removeClass("lb_error");
                };
                $username.on("blur", errorRemover);
                $pwd.on("blur", errorRemover);
                if (!$.trim($username.val())) {
                    $username.addClass("lb_error").focus();
                    return;
                }
                if (!$.trim($pwd.val())) {
                    $pwd.addClass("lb_error").focus();
                    return;
                }
                // validate pass, submit the form
                _this.trigger("submitStart");
                API.post("ucenter/login", {
                    username: $username.val(),
                    password: $pwd.val()
                }, function(data) {
                    _this.trigger("submitDone", "success");
                    _this.trigger("authSuccess", data.data.uid);
                    API.get("bbs/common_member", function(data) {
                        _this.trigger("userinfoGotSuccess", data);
                    }, function(error) {
                        _this.trigger("userinfoGotError", error);
                    });
                }, function(error) {
                    authFailNo++;
                    _this.trigger("submitDone", "error");
                    _this.trigger("authError", error, authFailNo);
                });
            };
            var showDialog = function() {
                dialog = $.dialog(loginHTML, {
                    title: false,
                    closebtn: true,
                    border: false,
                    drag: true,
                    onshow: function() {
                        _this.trigger("open");
                        $alert = $("#JS_lb_alert");
                        setTimeout(function() {
                            $("#lb_username").focus();
                        }, 0);
                        // 登录行为
                        $("#lb_signin").click(submitHandler);
                        $("#JS_lb_form").submit(submitHandler);
                    },
                    onclose: function() {
                        _this.trigger("close");
                    }
                });
            };
            // 没有trigger，自动弹出
            if (option.trigger) {
                $(option.trigger).on("click.loginBox", showDialog);
            } else {
                showDialog();
            }
            return this;
        },
        beforeunload: function() {
            return this;
        },
        close: function() {
            $.dialog.hide();
        }
    };
    Events.mixTo(loginBox);
    module.exports = loginBox;
});
