$(function() {
    // 点击去注册显示注册页面
    $('#link_reg').on('click', function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登陆显示登陆页面
    $('#link_login').on('click', function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
})  