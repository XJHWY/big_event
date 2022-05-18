$(function () {
  //获取信息
  getuserinfo();
  //退出登录
  $("#logout").on("click", () => {
    //提示用户是否确认
    layer.confirm("你真的要退出吗?", { icon: 3, title: "提示" }, function (index) {
    // 清空本地数据
    localStorage.removeItem('token')
    // 跳转
    location.href = "./login.html";
    layer.close(index);
    });
  });
});
// 获取个人信息
function getuserinfo() {
  $.ajax({
    method: "GET",
    url:"/my/userinfo",
    success: (res) => {
      // console.log(JSON.stringify(res));
      if (res.status !== 0) return 
      // 渲染头像
      renderAvatar(res.data);
    },
  
  });
}
// 渲染头像函数
renderAvatar = function (user) {
  // 获取name属性
  let name = user.nickname || user.username;
  // 设置欢迎文本  
  $("#welcome").html("欢迎&nbsp;&nbsp" + name);
  // 按需渲染头像
  if (user.user_pic!== null) {
    $(".layui-nav-img").attr('src',user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    let first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
};
