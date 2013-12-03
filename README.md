# loginBox

---

[![Build Status](https://secure.travis-ci.org/airyland/seedit.ui.loginBox.png)](https://travis-ci.org/airyland/seedit.ui.loginBox)
[![Coverage Status](https://coveralls.io/repos/airyland/seedit.ui.loginBox/badge.png?branch=master)](https://coveralls.io/r/airyland/seedit.ui.loginBox)


网站统一登录弹窗

---

## 使用说明
该模块为全站统一弹窗，依赖于 `dialog`及`API`组件

## 配置说明


###  trigger *String*

触发元素,请填写`选择器`


### setData *function or Object*

发送请求前修改参数，同 `Dialog.setData()`


## API接口

### Dialog.close()

关闭弹窗

### Dialog.setData(key,val)
同选项 `dataAppend`

### Dialog.shake()

`未支持..` 振动窗口，一般用于登录失败的时候提醒

### Dialog.on(event,callback)
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
    var $loginBox = new loginBox({
        trigger:'#login',
        beforeunload:function(){
            // 关闭时执行
        }
    });
```

`setData`参数可为对象或者函数

```javascript
    // 当为对象时，视为直接添加参数，如果key相同，将会覆盖原来的参数
    setData:{
        isIframe:'true'
    }
    // 当为函数时，可以添加或者修改发送前的参数
    setData:function(data){
        data.isIframe = 'true';
        return data;
    }
```