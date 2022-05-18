$(function () {
  let layer = layui.layer;
  let form = layui.form;
  form.verify({
    // 电话号码
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
    samePwd: (value) => {
      if (value === $("[name=oldPwd]").val()) return "新旧密码不能相同";
    },
    rePwd: (value) => {
      if (value !== $("[name=newPwd]").val()) return "两次输入不一致";
    },
  });
  getPassWord();
  //修改密码
  function getPassWord() {
    $(".layui-form").on("submit", function (e) {
      e.preventDefault();
      $.ajax({
        method: "POST",
        url: "/my/updatepwd",
        data: $(".layui-form").serialize(),
        success: (res) => {
          if (res.status !== 0) return layer.msg("修改失败");
          layer.msg("修改成功");
        //   console.log(res);
        },
      });
    });
  }
});
