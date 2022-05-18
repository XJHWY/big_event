$(function() {
    //定义昵称规则
    let form = layui.form;
    let layer = layui.layer
    form.verify({
        nickname:function(value) {
            if(value.length>6) return "昵称长度必须在1-6个字符之间"
        }
    })
    getUserInfo()
    //发送请求
    function getUserInfo(){
    $.ajax({
        method: 'GET',
        url:'/my/userinfo',
        success: res => {
            if(res.status!==0)return layer.msg('请求失败')
            form.val('formUserInfo',res.data)
            // console.log(res.data)
        }
    })
    }
    //重置按钮实现
    $('#resetbtn').on('click',function(e){
        e.preventDefault();
        getUserInfo()
    })
    // 实现数据提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success: res => {
                if(res.status !== 0) return layer.msg('修改失败')
                layer.msg('修改成功 ')
                window.parent.getuserinfo()
            }
        })
    })
})