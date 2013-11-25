define(function(require, exports, module) {
    var $ = require('jquery');
    // dialog
    require('http://172.16.5.98:81/ui/dialog/src/dialog');
    // COMMON API support
    var API = require('http://172.16.5.98:81/ui/API/src/API');
    // event emitter
    var Events = require('arale/events/1.1.0/events');
    var authFailNo = 0;
    var loginHTML = $('#login-tpl').html();
    var loginBox = function(option) {
        option = option || {};
        var o = {

        };
        $.extend(o, option);
        this.o = (function() {
            return o;
        })();
        return this.init(o);
    };

    loginBox.prototype = {
        // initialize
        init: function(option) {
            var _this = this;
            if (!option.trigger) throw 'no trigger element specified';
            $(option.trigger).on('click.loginBox', function() {
                $.dialog(loginHTML, {
                    title: false,
                    closeBtn: true,
                    onshow: function() {
                        _this.trigger('open');
                        setTimeout(function() {
                            $('#lb_username').focus();
                        }, 0);
                        // 登录行为
                        $('#lb_signin').click(function(e) {
                            e.preventDefault();
                            _this.trigger('submitStart');
                            API.post('ucenter/login', {
                                username: $('#lb_username').val(),
                                password: $('#lb_password').val()
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
                                _this.trigger('authError', error,authFailNo);
                            })
                        })
                    },
                    onclose: function() {
                        _this.trigger('close');
                    }
                });
            });

            return this;
        },
        beforeunload: function() {
            return this;
        }
    }

    Events.mixTo(loginBox);

    module.exports = loginBox;
});