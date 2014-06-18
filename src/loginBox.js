// @todo 支持读取最近登录用户名
var $ = require('jquery');
// dialog
var Dialog = require('dialoger');
// async require styles
require.async([ /*'moe/alert/0.0.1/alert.css',*/ './loginBox.css']);
// COMMON API support
var API = require('seedit-api').scope('common');
// user module
var User = require('seedit-user');
// event emitter
var Events = require('eventor');
// fail times
var authFailNo = 0;
// cahce document
var $doc = $(document);

var lastLoginInfo = User.getLastLoginInfo();
var lastLoginName = lastLoginInfo['username'] || '';

// login template
var loginHTML = require('./loginbox.tpl');

$doc.on('keydown', '#JS_lb_form input,#JS_lb_form select,#JS_lb_form textarea', function (e) {
    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next;
    if (e.keyCode == 13) {
        focusable = form.find('input,select,textarea').filter(':visible');
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }
});

var loginBox = function (option) {
    option = option || {};
    var o = {};
    $.extend(o, option);
    this.o = (function () {
        return o;
    })();
    this.prepare();
    return this.init(o);
};

// mixin
Events.mixTo(loginBox);

loginBox.prototype.bind = function () {
    var _this = this;
    var submitHandler = function (e) {
        e.preventDefault();
        // validator
        var $username = $('#lb_username'),
            $pwd = $('#lb_password');
        // remove error class when blur
        var errorRemover = function () {
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
        }, function (data) {
            _this.trigger('submitDone', 'success');
            _this.trigger('authSuccess', data.data.uid);
            API.get('bbs/common_member', function (data) {
                _this.trigger('userinfoGotSuccess', data);
            }, function (error) {
                _this.trigger('userinfoGotError', error)
            })
        }, function (error) {
            authFailNo++;
            _this.trigger('submitDone', 'error');
            _this.trigger('authError', error, authFailNo);
        })
    };

    // 有登录记录时，自动填写用户名，光标直接到密码输入框
    if (lastLoginName) {
        $('#lb_username').val(lastLoginName);
        setTimeout(function () {
            $('#lb_password').focus();
        }, 0);
    } else {
        setTimeout(function () {
            $('#lb_username').focus();
        }, 0);
    }
    // 登录行为
    $doc.on('click', '#lb_signin', submitHandler);
    $doc.on('submit', '#JS_lb_form', submitHandler);


    /* 交互 */
    //点击登录，按钮disable,如果有出错消息进行清除
    this.on('submitStart', function () {
        $('#lb_signin').prop('diabled', true).text('提交中');
    });

    // 登录结束，按钮enable
    this.on('submitDone', function () {
        $('#lb_signin').prop('diabled', false).text('登录');
    });

    // 登录失败，显示错误
    // 登录失败超过5次，提示找回密码
    this.on('authError', function (error, times) {
        $('#JS_lb_alert').find('span').text(error.error_message).closest('.alert').show();
        if (times === 5) {
            $('#JS_lb_alert').find('span').html('亲是忘记密码了么，<button class="x-btn x-btn-danger x-btn-sm x-btn-small pull-right" type="button">点我去找回</button>');
        }
    });

    // 获取用户信息成功时，保存到本地
    this.on('userinfoGotSuccess', function (data) {
        User.setLastLoginInfo(data.username, data.uid);
    });


};
loginBox.prototype.prepare = function () {
    var _this = this;
    this.$dialog = new Dialog({
        content: loginHTML,
        effect: 'fade'
    }).before('show',function () {
            _this.trigger('open');
        }).after('hide',function () {
            _this.trigger('hide');
        }).render();
    _this.bind();
};
// initialize
loginBox.prototype.init = function (option) {
    var _this = this;
    // 没有trigger，自动弹出
    if (option.trigger) {
        $(option.trigger).on('click.loginBox', function () {
            _this.show();
        });
    }
    return this;
};

loginBox.prototype.hide = function () {
    this.$dialog.hide();
    return this;
};

loginBox.prototype.show = function () {
    this.$dialog.show();
    return this;
};

module.exports = loginBox;