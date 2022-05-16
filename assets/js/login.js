$(function () {
  // 点击去注册显示注册页面
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登陆显示登陆页面
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  //自定义表单验证规则
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    // 电话号码
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
    repwd: (value) => {
      let pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) return "两次密码不一致";
    },
  });
  // 注册表单
  const baseUrl = "http://www.liulongbin.top:3007";
  $("#form_reg").on("submit", (e) => {
    e.preventDefault();
    $.post(
      baseUrl + "/api/reguser",
      {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      (res) => {
          console.log(res)
        if (res.status !== 0) return layer.msg("只想弱弱提示注册失败");
        layer.msg("成功啦");
      }
    );
  });
  // 登录
  $('#form_login').on("submit", e => {
    e.preventDefault();
    $.ajax({
        url: baseUrl + "/api/login",
        method: "POST",
        data:$('#form_login').serialize(),
        success: res=>{
            console.log(res)
            if(res.status!==0) return layer.msg('登陆失败')
            layer.msg('登陆成功')
            localStorage.setItem('token',res.token)
            location.href ='./index.html'
        }
    })
  })
});
