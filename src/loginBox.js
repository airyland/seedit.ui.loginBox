// @todo 支持读取最近登录用户名
var $ = require('jquery');
// Config 
var Config = require('seedit-config'),
    // dialog
    Dialog = require('arale-dialog'),
    // COMMON API support
    API = require('seedit-api'),
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
    this.prepare();
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
        API.post('ucenter/login', {
            username: $username.val(),
            password: $pwd.val()
        }, function(data) {
            _this.trigger('submitDone', 'success');
            _this.trigger('authSuccess', data.data.uid);
            API.get('bbs/common_member', function(data) {
                _this.trigger('userinfoGotSuccess', data);
            }, function(error) {
                _this.trigger('userinfoGotError', error)
            })
        }, function(error) {
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
        _this.trigger('open');
    }).after('hide', function() {
        _this.trigger('hide');
    }).render();

    _this.$box = this.$dialog.element;
    _this.bind();
};
// initialize
loginBox.prototype.init = function(option) {
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

module.exports = loginBox;