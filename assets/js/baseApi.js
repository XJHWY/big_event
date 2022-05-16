$.ajaxPrefilter(function(options){
    // url
    options.url = 'http://www.liulongbin.top:3007'+options.url;
    // headers设置
    if(options.url.indexOf('/my/')!==-1)
    {options.headers = {Authorization: localStorage.getItem("token")}}
      // 如果不能正常访问就阻止登录并跳转到登陆页面
    options.complete = function(res){
        if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败'){
            //如果程序员写一个假token
            localStorage.removeItem('token')
            location.href ='./login.html'
        }
    }
})