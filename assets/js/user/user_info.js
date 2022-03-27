$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1-6个字符长度之间'
            }
        }
    })
    initUserInfo()
    // 初始化用户基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)
                // 调用form.val可以快速给表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }
    $('#btnReset').on('click',function(e){
        // 阻止表单的默认重置行为
         e.preventDefault();
         initUserInfo()
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            syccess:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法 重新渲染用户的头像和用户的资料
                window.parent.getuserinfo()
            }
        })
    })
})