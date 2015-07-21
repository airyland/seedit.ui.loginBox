var $ = require('jquery'),
    // Config 
    Config = require('seedit-config'),
    // dialog
    Dialog = require('arale-dialog'),
    // COMMON API support
    API = require('seedit-api'),
    // BBS API
    bbsAPI = API.scope('bbs');
// user module
User = require('seedit-user'),
// event emitter
Events = require('eventor'),
// fail times
authFailNo = 0,
// cahce document
$doc = $(document);

var lastLoginInfo = User.getLastLoginInfo(),
    lastLoginName = lastLoginInfo['username'] || '',

    // html模板，account地址解析为当前环境地址
    loginHTML = require('./loginbox.tpl').replace(/{{account}}/g, Config.getSiteUrl('account').replace(/:\d+$/, ''));



var loginBox = function(option) {
    option = option || {};
    var o = {};
    $.extend(o, option);
    this.o = (function() {
        return o;
    })();
    // token
    this.token = window.login_token || '';
    this.prepare();

    // 找到验证码相关
    this.$tokenBox = this.$box.find('.login-code-box').eq(0);
    this.$token = this.$box.find('.login-token-input').eq(0);
    this.$code = this.$box.find('.login-code-input').eq(0);
    this.$captcha = this.$box.find('.login-captcha').eq(0);
    this.shouldValidate = false;
    return this.init(o);
};

// mixin
Events.mixTo(loginBox);

loginBox.prototype.bind = function() {
    var _this = this;

    var $username = _this.$box.find('.lb_username').eq(0),
        $pwd = _this.$box.find('.lb_password').eq(0),
        $signin = _this.$box.find('.lb_signin').eq(0),
        $form = _this.$box.find('.lb_form').eq(0),
        $alert = _this.$box.find('.lb_alert').eq(0);

    var submitHandler = function(e) {
        e.preventDefault();
        // validator
        $form.find('input,select,textarea').on('keydown', function() {
            var self = $(this),
                focusable, next;
            if (e.keyCode == 13) {
                focusable = $form.find('input,select,textarea').filter(':visible');
                next = focusable.eq(focusable.index(this) + 1);
                if (next.length) {
                    next.focus();
                } else {
                    $signin.click();
                }
                return false;
            }
        });


        // remove error class when blur
        var errorRemover = function() {
            if ($(this).val()) $(this).removeClass('lb_error');
        };

        $username.on('blur', errorRemover);
        $pwd.on('blur', errorRemover);

        if (!$.trim($username.val())) {
            $username.addClass('lb_error').focus();
            return;
        }
        if (!$.trim($pwd.val())) {
            $pwd.addClass('lb_error').focus();
            return;
        }

        // validate pass, submit the form
        _this.trigger('submitStart');

        //$('#login_code').val('');
        var data = {
            username: $username.val(),
            password: $pwd.val()
        };

        if (_this.token) {
            data.token = _this.token;
            data.code = _this.$code.val();
        }
        API.post('ucenter/login', data, function(data) {
            _this.trigger('submitDone', 'success');
            _this.trigger('authSuccess', data.data.uid);
            API.get('bbs/common_member', function(data) {
                _this.trigger('userinfoGotSuccess', data);
            }, function(error) {
                _this.trigger('userinfoGotError', error)
            });

            this.$tokenBox.hide();
            this.$code.val('');
        }, function(error) {
            if (error.error_code === 7001 || error.error_code === 7003) {
                _this.checkCode();
            }

            authFailNo++;
            _this.trigger('submitDone', 'error');
            _this.trigger('authError', error, authFailNo);
        })
    };

    // 有登录记录时，自动填写用户名，光标直接到密码输入框
    if (lastLoginName) {
        $username.val(lastLoginName);
        setTimeout(function() {
            $pwd.focus();
        }, 0);
    } else {
        setTimeout(function() {
            $username.focus();
        }, 0);
    }
    // 登录行为
    $signin.on('click', submitHandler);
    $form.on('submit', submitHandler);



    /* 交互 */
    //点击登录，按钮disable,如果有出错消息进行清除
    this.on('submitStart', function() {
        $signin.prop('diabled', true).text('提交中');
        // 隐藏错误信息
        $alert.is(':visible') && $alert.hide();
    });

    // 登录结束，按钮enable
    this.on('submitDone', function() {
        $signin.prop('diabled', false).text('登录');
    });

    // 登录失败，显示错误
    // 登录失败超过5次，提示找回密码
    this.on('authError', function(error, times) {
        $alert.find('span').text(error.error_message).closest('.alert').show();
        if (times === 5) {
            $alert.find('span').html('亲是忘记密码了么，<button class="x-btn x-btn-danger x-btn-sm x-btn-small pull-right" type="button">点我去找回</button>');
        }
    });

    // 获取用户信息成功时，保存到本地
    this.on('userinfoGotSuccess', function(data) {
        User.setLastLoginInfo(data.username, data.uid);
    });


};
loginBox.prototype.prepare = function() {
    var _this = this;
    var title = this.o.title || '播种网帐号登录';
    this.$dialog = new Dialog({
        width: 480,
        dialogClass: 'mk-login-box',
        content: loginHTML.replace('{{title}}', title),
        effect: 'fade'
    }).before('show', function() {
        _this.checkCode();
        _this.trigger('open');
    }).after('hide', function() {
        this.$tokenBox && this.$tokenBox.hide();
        this.$code && this.$code.val('');
        $('.lb_alert').hide();
        _this.trigger('hide');
    }).render();

    _this.$box = this.$dialog.element;
    _this.bind();
};
// initialize
loginBox.prototype.init = function(option) {
    if (window.showLoading === true) {
        window.showLoading = false;
    }

    var loading = document.getElementById('g-loader');
    if (loading) {
        loading.style.display = 'none';
    }

    var _this = this;
    // 没有trigger，自动弹出
    if (option.trigger) {
        $(option.trigger).on('click.loginBox', function() {
            _this.show();
        });
    }
    return this;
};

loginBox.prototype.hide = function() {
    this.$dialog.hide();
    return this;
};

loginBox.prototype.show = function() {
    this.$dialog.show();
    return this;
};

loginBox.prototype.checkCode = function() {
    var _this = this;

    // 刷新验证码
    _this.$captcha.off('click').on('click', function() {
        $(this).attr('src', 'http://bbs.' + Config.getMainDomain() + '/restful/misc/captcha.json?token=' + _this.token + '&timestamp=' + (new Date().getTime()));
    });

    // 已经有token
    if (_this.token !== '') {
    
        _this.$tokenBox.show();
        var img = buildUrl(_this.token);
        this.$captcha.attr('src', img);
        return;
    }else{
        (function(_this) {
        setTimeout(function() {
            // 检查是否需要验证码
            API.put('ucenter/login', function(data) {
                if (data.data && data.data.need_code === 1) {
                    // 需要验证码
                    _this.shouldValidate = true;
                    // 显示验证码输入
                    _this.$tokenBox.show();

                    // 如果已经有token
                    if (_this.token !== '') {
                        var img = buildUrl(_this.token);
                        _this.$captcha.attr('src', img);
                    } else {
                        // 获取token
                        API.get('http://bbs.' + Config.getMainDomain() + '/restful/misc/token.jsonp', {
                            type: 'member_login'
                        }, function(data) {
                            if (data.data && data.data.token === '') {

                            } else {
                                _this.token = data.data.token;
                                window.login_token = data.data.token;
                                // 拼出图片地址
                                var img = buildUrl(_this.token);
                                _this.$token.val(data.data.token);
                                _this.$captcha.attr('src', img);
                            }
                        }, function(error) {});
                    }
                }
            }, function(error) {});
        }, 0);
    })(_this);
    }

    
};

function buildUrl(token) {
    return 'http://bbs.' + Config.getMainDomain() + '/restful/misc/captcha.json?token=' + token + '&timestamp=' + (new Date().getTime());
};

if (window.showLoader === true) {
    new loginBox().on('authSuccess', function() {
        document.location.reload();
    }).show();
    document.getElementById('g-loader').style.display = 'none';
    window.showLoader = false;
}

module.exports = loginBox;