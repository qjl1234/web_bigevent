$(function(){
    getuserinfo()
    var layer=layui.layer
    $('#btnLogout').on('click',function(){
        // 提示用户是否退出
        layer.confirm('确定要下我号吗？',{icon:3,title:'提示'},function(index){
            // 1 清空本地存储的token
            localStorage.removeItem('token')
            // 2 跳转到登录页面
            location.href='/login.html'
            layer.close(index)
           
        })
    })
})
function getuserinfo(){
 
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
         success:function(res){
           
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
                
            }
           
            renderAvatar(res.data)
         },
        //  不管成更还是失败 最终都会调用complete回调函数
       
    })
}
function  renderAvatar(user){
    var name=user.nickname||user.username
    console.log(name)
    $('#welcome').html('欢迎&nbsp;'+name)
    if(user.user_pic!==null){
 $('.layui-nav-img').attr('src',user.user_pic).show()
   $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}