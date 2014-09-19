# 演示文档

---

````iframe:600
<script>
seajs.use(['index','jquery','arale-dialog/1.4.1/src/dialog.css','src/loginBox.css'], function(loginBox,$){
    var box = new loginBox({trigger:'#trigger'});
    console.log(box);
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
    // 打开调试工具查看输出 
    console.log('event::',name);
});
console.log(box);
});
</script>


<a href="javascript:" id="trigger" class="btn btn-danger">点我登录</a>

打开浏览器调试窗口查看输出


````