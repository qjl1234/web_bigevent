$(function(){
  // 点击“去注册账号”的链接
  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击“去登录”的链接
  $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 从 layui中获取form对象
  var form =layui.form
  var layer=layui.layer
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位'],
    repwd:function(value){
      var pwd =$('.reg-box [name=password]').val()
      if(pwd!==value){
        return '两次密码不一致'
      }
    }
  })
  $('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
      if(res.status!==0){
       return layer.msg(res.message)
      }
      layer.msg(res.message) 
      $('#link_login').click()
    })
  })
  $('#form_login').submit(function(e){
    // 阻止默认行为
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登陆失败！')
        }
        layer.msg('登陆成功！')
        // 将登陆成功得到的token字符串保存到localstorage中
        // 跳转到后台主页
        localStorage.setItem('token',res.token)
        location.href='/index.html'
      }

    })
  })
})