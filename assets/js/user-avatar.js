$(function () {
  let layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 点击上传文件功能
  $("#postBtn").on("click", () => {
    $("#files").click();
  });

  // 更换文件
  $("#files").on("change", (e) => {
    // 讲更改的文件获取
    let fileArr = e.target.files;
    // console.log(fileArr)
    if (fileArr.length === 0) layer.msg("上传头像失败");
    // 给新图片添加url地址
    let newFile = fileArr[0];
    let imgUrl = URL.createObjectURL(newFile);
    // 摧毁当前图片 更改src属性 重新渲染图片
    $image.cropper("destroy").attr("src", imgUrl).cropper(options);
  });

  // 上传头像到服务器
  $("#uploadBtn").on("click", function () {
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      $.ajax({
          method: "POST",
          url:'/my/update/avatar',
          data:{avatar:dataURL},
          success: res => {
              if(res.status !== 0) return res.msg
              console.log(res)
              console.log('上传头像成功');
              // 先获取信息再渲染头像
              window.parent.getuserinfo()
          }
      })
  });
});
