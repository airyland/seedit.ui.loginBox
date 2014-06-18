# 自动弹出

---

<script>
    seajs.config({
        path:'http://dev02.seedit.com/ui/'
    })
</script>



````javascript
seajs.use(['index','jquery'], function(loginBox,$){
    var box = new loginBox({}).show();
    box.on('open',function(){
    console.log('open');
}).on('authSuccess',function(uid){
    console.log('登录成功啦',uid)
}).on('authError',function(error,times){
    console.log('登录失败啦',error.error_message,times);
}).on('userinfoGotSuccess',function(user){
    console.log('信息获取成功啦',user);
}).on('close',function(){
    console.log('close');
});
box.on('all',function(name){
    console.log('event::',name);
});
console.log(box);
});
````



