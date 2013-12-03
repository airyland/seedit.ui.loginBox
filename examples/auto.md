# 自动弹出

---

<script>
    seajs.config({
        path:'http://dev02.seedit.com/ui/'
    })
</script>

<style>

/*btn*/
.btn {
    display: inline-block;
    *display: inline;
    padding: 4px 12px;
    margin-bottom: 0;
    *margin-left: .3em;
    font-size: 14px;
    line-height: 20px;
    color: #333;
    text-align: center;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
    vertical-align: middle;
    cursor: pointer;
    background-color: #f5f5f5;
    *background-color: #e6e6e6;
    background-image: -moz-linear-gradient(top, #fff, #e6e6e6);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#e6e6e6));
    background-image: -webkit-linear-gradient(top, #fff, #e6e6e6);
    background-image: -o-linear-gradient(top, #fff, #e6e6e6);
    background-image: linear-gradient(to bottom, #fff, #e6e6e6);
    background-repeat: repeat-x;
    border: 1px solid #ccc;
    *border: 0;
    border-color: #e6e6e6 #e6e6e6 #bfbfbf;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    border-bottom-color: #b3b3b3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
    *zoom: 1;
    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}
.btn:hover, .btn:focus, .btn:active, .btn.active, .btn.disabled, .btn[disabled] {
    color: #333;
    background-color: #e6e6e6;
    *background-color: #d9d9d9;
}
.btn:active, .btn.active {
    background-color: #ccc \9;
}
.btn:first-child {
    *margin-left: 0;
}
.btn:hover, .btn:focus {
    color: #333;
    text-decoration: none;
    background-position: 0 -15px;
    -webkit-transition: background-position .1s linear;
    -moz-transition: background-position .1s linear;
    -o-transition: background-position .1s linear;
    transition: background-position .1s linear;
}
.btn:focus {
    outline: thin dotted #333;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
}
.btn.active, .btn:active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
}
.btn.disabled, .btn[disabled] {
    cursor: default;
    background-image: none;
    opacity: .65;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
.btn-large {
    padding: 11px 19px;
    font-size: 17.5px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
}
.btn-large [class^="icon-"], .btn-large [class*=" icon-"] {
    margin-top: 4px;
}
.btn-small {
    padding: 2px 10px;
    font-size: 11.9px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
.btn-small [class^="icon-"], .btn-small [class*=" icon-"] {
    margin-top: 0;
}
.btn-mini [class^="icon-"], .btn-mini [class*=" icon-"] {
    margin-top: -1px;
}
.btn-mini {
    padding: 0 6px;
    font-size: 10.5px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
.btn-block {
    display: block;
    width: 100%;
    padding-right: 0;
    padding-left: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.btn-block+.btn-block {
    margin-top: 5px;
}
input[type="submit"].btn-block, input[type="reset"].btn-block, input[type="button"].btn-block {
    width: 100%}
.btn-primary.active, .btn-warning.active, .btn-danger.active, .btn-success.active, .btn-info.active, .btn-inverse.active {
    color: rgba(255, 255, 255, 0.75);
}
.btn-primary {
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    background-color: #006dcc;
    *background-color: #04c;
    background-image: -moz-linear-gradient(top, #08c, #04c);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#08c), to(#04c));
    background-image: -webkit-linear-gradient(top, #08c, #04c);
    background-image: -o-linear-gradient(top, #08c, #04c);
    background-image: linear-gradient(to bottom, #08c, #04c);
    background-repeat: repeat-x;
    border-color: #04c #04c #002a80;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0044cc', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}
.btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .btn-primary.disabled, .btn-primary[disabled] {
    color: #fff;
    background-color: #04c;
    *background-color: #003bb3;
}
.btn-primary:active, .btn-primary.active {
    background-color: #039 \9;
}
.btn-warning {
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    background-color: #faa732;
    *background-color: #f89406;
    background-image: -moz-linear-gradient(top, #fbb450, #f89406);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fbb450), to(#f89406));
    background-image: -webkit-linear-gradient(top, #fbb450, #f89406);
    background-image: -o-linear-gradient(top, #fbb450, #f89406);
    background-image: linear-gradient(to bottom, #fbb450, #f89406);
    background-repeat: repeat-x;
    border-color: #f89406 #f89406 #ad6704;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450', endColorstr='#fff89406', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}
.btn-warning:hover, .btn-warning:focus, .btn-warning:active, .btn-warning.active, .btn-warning.disabled, .btn-warning[disabled] {
    color: #fff;
    background-color: #f89406;
    *background-color: #df8505;
}
.btn-warning:active, .btn-warning.active {
    background-color: #c67605 \9;
}
.btn-danger {
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    background-color: #da4f49;
    *background-color: #bd362f;
    background-image: -moz-linear-gradient(top, #ee5f5b, #bd362f);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ee5f5b), to(#bd362f));
    background-image: -webkit-linear-gradient(top, #ee5f5b, #bd362f);
    background-image: -o-linear-gradient(top, #ee5f5b, #bd362f);
    background-image: linear-gradient(to bottom, #ee5f5b, #bd362f);
    background-repeat: repeat-x;
    border-color: #bd362f #bd362f #802420;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee5f5b', endColorstr='#ffbd362f', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}
.btn-danger:hover, .btn-danger:focus, .btn-danger:active, .btn-danger.active, .btn-danger.disabled, .btn-danger[disabled] {
    color: #fff;
    background-color: #bd362f;
    *background-color: #a9302a;
}
.btn-danger:active, .btn-danger.active {
    background-color: #942a25 \9;
}
.btn-success {
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    background-color: #5bb75b;
    *background-color: #51a351;
    background-image: -moz-linear-gradient(top, #62c462, #51a351);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#62c462), to(#51a351));
    background-image: -webkit-linear-gradient(top, #62c462, #51a351);
    background-image: -o-linear-gradient(top, #62c462, #51a351);
    background-image: linear-gradient(to bottom, #62c462, #51a351);
    background-repeat: repeat-x;
    border-color: #51a351 #51a351 #387038;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462', endColorstr='#ff51a351', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}
.btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .btn-success.disabled, .btn-success[disabled] {
    color: #fff;
    background-color: #51a351;
    *background-color: #499249;
}
.btn-success:active, .btn-success.active {
    background-color: #408140 \9;
}
.btn-info {
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    background-color: #49afcd;
    *background-color: #2f96b4;
    background-image: -moz-linear-gradient(top, #5bc0de, #2f96b4);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#5bc0de), to(#2f96b4));
    background-image: -webkit-linear-gradient(top, #5bc0de, #2f96b4);
    background-image: -o-linear-gradient(top, #5bc0de, #2f96b4);
    background-image: linear-gradient(to bottom, #5bc0de, #2f96b4);
    background-repeat: repeat-x;
    border-color: #2f96b4 #2f96b4 #1f6377;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de', endColorstr='#ff2f96b4', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}
.btn-info:hover, .btn-info:focus, .btn-info:active, .btn-info.active, .btn-info.disabled, .btn-info[disabled] {
    color: #fff;
    background-color: #2f96b4;
    *background-color: #2a85a0;
}
.btn-info:active, .btn-info.active {
    background-color: #24748c \9;
}
.btn-inverse {
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    background-color: #363636;
    *background-color: #222;
    background-image: -moz-linear-gradient(top, #444, #222);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#444), to(#222));
    background-image: -webkit-linear-gradient(top, #444, #222);
    background-image: -o-linear-gradient(top, #444, #222);
    background-image: linear-gradient(to bottom, #444, #222);
    background-repeat: repeat-x;
    border-color: #222 #222 #000;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff444444', endColorstr='#ff222222', GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}
.btn-inverse:hover, .btn-inverse:focus, .btn-inverse:active, .btn-inverse.active, .btn-inverse.disabled, .btn-inverse[disabled] {
    color: #fff;
    background-color: #222;
    *background-color: #151515;
}
.btn-inverse:active, .btn-inverse.active {
    background-color: #080808 \9;
}
button.btn, input[type="submit"].btn {
    *padding-top: 3px;
    *padding-bottom: 3px;
}
button.btn::-moz-focus-inner, input[type="submit"].btn::-moz-focus-inner {
    padding: 0;
    border: 0;
}
button.btn.btn-large, input[type="submit"].btn.btn-large {
    *padding-top: 7px;
    *padding-bottom: 7px;
}
button.btn.btn-small, input[type="submit"].btn.btn-small {
    *padding-top: 3px;
    *padding-bottom: 3px;
}
button.btn.btn-mini, input[type="submit"].btn.btn-mini {
    *padding-top: 1px;
    *padding-bottom: 1px;
}
.btn-link, .btn-link:active, .btn-link[disabled] {
    background-color: transparent;
    background-image: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
.btn-link {
    color: #08c;
    cursor: pointer;
    border-color: transparent;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
}
.btn-link:hover, .btn-link:focus {
    color: #005580;
    text-decoration: underline;
    background-color: transparent;
}
.btn-link[disabled]:hover, .btn-link[disabled]:focus {
    color: #333;
    text-decoration: none;
}

/*wrach*/


/* Buttons Overwride */
.btn {
    display: inline-block;
    *display: inline;
     padding: 9px 12px;
     padding-top:7px ;
    margin-bottom: 0;
    *margin-left: .3em;
    font-size: 14px;
    line-height: 20px;
    color: #5e5e5e;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-color: #d1dade;
    *border: 0;
    -webkit-border-radius: 3px;
     -webkit-border-radius: 3px;
     -webkit-border-radius: 3px; 
    background-image:none !important;
    border: none;
    text-shadow: none;
    box-shadow:none;    
    transition: all 0.12s linear 0s !important;
    font: 14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;    
}
.btn:focus{
    outline:none;
}
.btn:hover, .btn:focus, .btn:active, .btn.active, .btn.disabled, .btn[disabled] {
    background-color: #c1cace;
    *background-color: #c1cace;
}
.btn-cons{  
    margin-right: 5px;
    min-width: 120px;
    margin-bottom: 8px;
}
/* only for demonstration */
.btn-demo-space{
  margin-bottom: 8px;
}
.demo-placeholder{
    width:100%;
    height:250px;
}
/* */
.btn-social{
    font-size: 20px;
    margin: 10px;
    
}
.btn-social:hover, .btn-social:focus, .btn-social:active, .btn-social.active, .btn-social.disabled, .btn-social[disabled] {
    color:#2d8ebf;
    text-decoration:none;
}
.btn-primary{
    color: #fff;
    background-color: #0aa699;
}
.btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .btn-primary.disabled, .btn-primary[disabled] {
    background-color: #0b9c8f;
    *background-color: #0b9c8f;
}
.btn-success{
    color: #fff;
    background-color: #0090d9;
}
.btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .btn-success.disabled, .btn-success[disabled] {
    background-color: #1285d1;
    *background-color: #1285d1;
}
.btn-info{
    color: #fff;
    background-color: #1f3853;
}
.btn-info:hover, .btn-info:focus, .btn-info:active, .btn-info.active, .btn-info.disabled, .btn-info[disabled] {
    background-color: #152639;
    *background-color: #152639;
}
.btn-warning{
    color: #fff;
    background-color: #FBB05E;
}
.btn-warning:hover, .btn-warning:focus, .btn-warning:active, .btn-warning.active, .btn-warning.disabled, .btn-warning[disabled] {
    background-color: #f8a142;
    *background-color: #f8a142;
}

.btn-danger{
    color: #fff;
    background-color: #f35958;
}
.btn-danger:hover, .btn-danger:focus, .btn-danger:active, .btn-danger.active, .btn-danger.disabled, .btn-danger[disabled] {
    background-color: #e94847;
    *background-color: #e94847;
}

.btn-danger-dark{
    color: #fff;
    background-color: #b94141;
}
.btn-danger-dark:hover, .btn-danger-dark:focus, .btn-danger-dark:active, .btn-danger-dark.active, .btn-danger-dark.disabled, .btn-danger-dark[disabled] {
    background-color: #e94847;
    *background-color: #e94847;
    color: #fff;
}
.btn-dark{
    color: #fff;
    background-color: #333a49;
}
.btn-white{
    color: #5e5e5e;
    background-color: #fff;
    border:1px solid #e5e9ec;
}
.btn-white:hover, .btn-white:focus, .btn-white:active, .btn-white.active, .btn-white.disabled, .btn-white[disabled] {
    background-color: #fbfcfd;
    *background-color: #fbfcfd;
    border:1px solid #b4b9be;
}
.btn-link{
    color: #5e5e5e;
    background-color: transparent;
    border:none;
}
.btn-large {
    padding: 11px 19px;
    font-size: 16px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}

.btn-link:hover, .btn-link:focus, .btn-link:active, .btn-link.active, .btn-link.disabled, .btn-link[disabled] {
    background-color: transparent;
    *background-color: transparent;
}
.btn-large [class^="icon-"], .btn-large [class*=" icon-"] {
    margin-top: 4px;
}
.btn-small {
    padding:3px 12px;
    font-size: 11.9px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
.btn-small [class^="icon-"], .btn-small [class*=" icon-"] {
    margin-top: 0;
}
.btn-mini [class^="icon-"], .btn-mini [class*=" icon-"] {
    margin-top: -1px;
}
.btn-mini {
    padding:2px 9px;
    font-size: 10.5px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

.btn-group.open .btn.dropdown-toggle {
    background-color: #e6e6e6;
}
.btn-group.open .btn-primary.dropdown-toggle {
    background-color: #0b9c8f;
}
.btn-group.open .btn-warning.dropdown-toggle {
    background-color: #fbc01e;
}
.btn-group.open .btn-danger.dropdown-toggle {
    background-color: #e94847;
}
.btn-group.open .btn-success.dropdown-toggle {
    background-color: #0090d9;
}
.btn-group.open .btn-info.dropdown-toggle {
    background-color: #152639;
}
.btn-group.open .btn-inverse.dropdown-toggle {
    background-color: #222;
}

.btn-group.open .btn-white.dropdown-toggle {
    background-color: #fbfcfd;
}
.btn-group > .btn + .dropdown-toggle{
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    border-left:1px #f7f7f7 solid;
}
.btn-block + .btn-block {
    margin-top: 8px;
}
.btn .caret{
    margin-left: 3px;
}
.btn .caret.single{
    margin-left: 0px;
}
.btn-group > .dropdown-menu{
    font-size:13px;
}
.btn-group > .dropdown-menu li{
     padding-left: 0px;
}


.alert {font-size:12px;margin-left:20px;margin-right:30px;padding-top:5px;padding-bottom:5px;}


    .loginBox {overflow:hidden;width:480px;margin-top:-10px;}
    .loginBox form {overflow:hidden;padding-bottom:20px;}
    .loginBox ul{padding:0;padding:0 30px 0 15px;}
    .loginBox li{list-style:none;margin-bottom:15px;}
    .loginBox li input {width:240px;border:1px solid #ccc;border-radius:2px;padding:6px 5px;color:#666;}
    .loginBox li label {display:block;width:60px;text-align:right;float:left;color:#3f3f3f;margin-right:10px;line-height:32px;font-family:微软雅黑;}
    .lb_social {float:left;padding:0 25px 0 20px;}
    .lb_qq,.lb_weibo {display:inline-block;width:120px;height:24px;text-indent:-9999px;}
    .lb_qq {margin-right:4px;background:url(http://images.infzm.com/images/passport/snsicon/qq.png);margin-left:-3px;}
    .lb_weibo {background:url(http://images.infzm.com/images/passport/snsicon/sina.png);}
    .loginBox h3 {margin:0;font-family:微软雅黑;margin-left:18px;color:#e1261c;font-weight:normal;margin-bottom:10px;border-bottom:1px solid #ececec;padding-bottom:10px;margin-right:10px;}
    .loginBox h4 {margin:0;color:#e1261c;margin-bottom:10px;padding-bottom:10px;font-family:Arial,宋体;font-weight:normal;display:inline-block;line-height:24px;margin-bottom:0;font-size:12px;}

    .loginBox .alert{ display:none; margin:0;margin-top:15px;margin-left:23px;margin-right:25px;}

    /**图标样式**/
    @font-face {
      font-family: 'iconfont';
      src: url('http://at.alicdn.com/t/font_1385430008_3488915.eot'); /* IE9*/
      src: url('http://at.alicdn.com/t/font_1385430008_3488915.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('http://at.alicdn.com/t/font_1385430008_4134202.woff') format('woff'), /* chrome、firefox */
      url('http://at.alicdn.com/t/font_1385430008_0962706.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url('http://at.alicdn.com/t/font_1385430008_4370544.svg#svgFontName') format('svg'); /* iOS 4.1- */
    }
    .lb-tip-icon {font-family:"iconfont";font-size:16px;font-style:normal;}
    #lb_signin {padding:5px 112px;margin-left:85px;}
    .lb_signup {margin-left:7px;padding:5px 5px;color:#f35958;font-size:12px;}
    .lb_findpwd {margin-left:10px;font-size:12px;margin-right:30px;line-height:35px;color:#999;}
    .lb_findpwd:hover {color:#e94847;}
    .lb_findpwd i {font-size:12px;margin-right:4px;}
    .lb_bottom {clear:both;padding-top:15px;border-top:1px solid #ececec;}
    .lb_sub_tip {font-size:12px;color:#666;margin-left:15px;}

</style>

````javascript
seajs.use('loginBox', function(loginBox){
    var $ = jQuery;
    var box = new loginBox({});
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

<a href="javascript:" id="trigger" class="btn btn-danger">点我登录</a>

打开浏览器调试窗口查看输出


<script type="seedit/template" id="login-tpl">
<div class="loginBox">
    <form action="" id="JS_lb_form">
        <h3>播种网帐号登录</h3>
        <ul>
            <li>
                <label for="lb_username">用户名:</label>
                <input type="text" id="lb_username" tabindex="1">
                <a href="http://account.seedit.com/register/index" class="lb_signup" tabindex="4">新用户注册</a>
            </li>
             <li>
                <label for="lb_password">密码:</label>
                <input type="password" id="lb_password" tabindex="2">  
                <a href="http://account.seedit.com/register/findpwd" class="lb_findpwd" tabindex="5">
                    <i class="lb-tip-icon">&#13545</i>忘记密码
                </a>
            </li>
        </ul>
       
        <button id="lb_signin" type="submit" class="btn btn-danger btn-small pull-right" tabindex="3">登  录</button>
        <div class="alert alert-error" id="JS_lb_alert">
           <i class="lb-tip-icon">&#13544</i>
           <span>登录失败了，请重试</span>
        </div>
    </form>

   

    <div class="lb_bottom">
         <div class="lb_social">
        <h4>快捷登录：</h4>
        <a href="http://account.seedit.com/oauth/qq" class="lb_qq" title="使用QQ帐号登录" tabindex="6">QQ登录</a>
        <a href="http://account.seedit.com/oauth/sina" class="lb_weibo" title="使用微博帐号登录" tabindex="7">微博</a>
    </div>
    </div>
</div>
</script>