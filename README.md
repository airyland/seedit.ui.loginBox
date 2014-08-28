# loginBox

---

[![Build Status](https://secure.travis-ci.org/airyland/seedit.ui.loginBox.png)](https://travis-ci.org/airyland/seedit.ui.loginBox)
[![Coverage Status](https://coveralls.io/repos/airyland/seedit.ui.loginBox/badge.png?branch=master)](https://coveralls.io/r/airyland/seedit.ui.loginBox)


网站统一登录弹窗

---

## 使用说明
该模块为全站统一弹窗，依赖于 `dialog`及`API`组件

## 配置说明

+ title 默认为`播种网帐号登录`


###  trigger *String*

触发元素,请填写`选择器`
为空时，直接弹出登录框




## API接口



### box.on(event,callback)
见下面接口事件说明。

## 接口事件说明

+ `open` 弹窗打开
+ `close` 弹窗关闭
+ `submitStart` 点击提交按钮
+ `submitDone` 提交结束，回调参数为 `success`或者`error`
+ `authSuccess` 登录成功，回调参数为 uid
+ `authError`   登录失败，回调参数为 {error_code:1001,error_message:'出错消息'}, 失败次数
+ `userinfoGotSuccess` 用户信息获取成功，回调参数为用户信息
+ `userinfoGotError` 用户信息获取失败，回调参数为出错信息

## 示例

``` javascript    
seajs.use('loginBox', function(loginBox) {
    var $ = jQuery;
    var box = new loginBox({});
    box.on('open', function() {
        console.log('open');
    }).on('authSuccess', function(uid) {
        console.log('登录成功啦', uid)
    }).on('authError', function(error, times) {
        console.log('登录失败啦', error.error_message, times);
    }).on('userinfoGotSuccess', function(user) {
        console.log('信息获取成功啦', user);
    }).on('close', function() {
        console.log('close');
    });
    box.on('all', function(name) {
        // 打开调试工具查看输出
        console.log('event::', name);
    });
});
```