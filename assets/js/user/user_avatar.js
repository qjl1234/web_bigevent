$(function(){
  var layer=layui.layer
     // 1.1 获取裁剪区域的 DOM 元素
 var $image = $('#image')
 // 1.2 配置选项
 const options = {
   // 纵横比
   aspectRatio: 1,
   // 指定预览区域
   preview: '.img-preview'
 }

 // 1.3 创建裁剪区域
 $image.cropper(options)

 $('#btnchoose').on('click',function(){
     $('#file').click()
 })
//  为文件框绑定change事件
 $('#file').on('change',function(e){
  //  获取用户选择的文件
   var filelist=e.target.files
   if(filelist===0){
     return layer.msg('请选择一张图片')
   }
  //  1拿到用户选择的文件
  var file=e.target.files[0]
  // 2 将文件转化为路径
  var imgurl=URL.createObjectURL(file)
  // 3 重新初始化裁剪区域
  $image.cropper('destroy') //销毁旧的裁剪区域
  .attr('src',imgurl) //重新设置图片路径
  .cropper(options) //重新初始化裁剪区域
 })
//  为确定按钮绑定事件
 $('#btnUpload').on('click',function(){
  // 1拿到用户裁剪之后的头像
  console.log('woshi ')
  var dataURL=$image
  .cropper('getCroppedCanvas',{
    width:100,
    height:100
  })
  .toDataURL('image/png')
  console.log(dataURL)
  $.ajax({
    method:'POST',
    url:'/my/update/avatar',
    data:{
      avatar:dataURL
    },
    success:function(res){
      if(res.status!==0){
        return layer.msg('更换头像失败')
      }
      layer.msg('更换头像成功')
      window.parent. getuserinfo()
    }
  })
 })
}
)
