# loginBox

---

[![Build Status](https://secure.travis-ci.org/airyland/seedit.ui.loginBox.png)](https://travis-ci.org/seedit/loginBox)
[![Coverage Status](https://coveralls.io/repos/airyland/seedit.ui.loginBox/badge.png?branch=master)](https://coveralls.io/r/seedit/loginBox)


网站统一登录弹窗

---

## 使用说明
该模块为全站统一弹窗，依赖于 `dialog`及`API`组件

## API

### 参数
+ `trigger` 触发元素
+ `successSignin` 成功登录，参数为API返回的用户信息
+ `errorSignin` 登录失败，参数为服务器错误信息
+ `initialize` 弹窗打开时
+ `beforeunload` 弹窗关闭时
+ `dataAppend` 发送请求前修改参数




dataAppend参数有两种形式：

```javascript
    // 当为对象时，视为直接添加参数，如果key相同，将会覆盖原来的参数
    dataAppend:{
        isIframe:'true'
    }
    // 当为函数时，可以添加或者修改发送前的参数
    dataAppend:function(data){
        data.isIframe = 'true';
        return data;
    }
```

### 完整示例

``` javascript    
    var $loginBox = new loginBox({
        trigger:'#login',
        successSignin:function(user){
            // 成功登录回调
        },
        errorSignin:function(err){
            // 失败登录回调
        },
        initialize:function(){
            // 弹窗打开时执行
        },
        beforeunload:function(){
            // 关闭时执行
        }
    });
```