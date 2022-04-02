$(function(){
    var layer=layui.layer
    
    // 定义加载文章分类的方法
    initCate()
    initEditor()
    function initCate(){
        $.ajax({
     method:'GET',
     url:'/my/article/cates',
     success:function(res){
         if(res!==0){
             return layer.msg('获取文章分类失败')
         }
        //  调用模板引擎
        var htmlstr=template('tpl-cate')
        $('[name=cate_id]').html(htmlstr)
        // 让layui重新渲染
        form.render()
         layer.msg('获取文章分类成功')
     }
        })
    }
     // 1. 初始化图片裁剪器
     var $image = $('#image')
     
     // 2. 裁剪选项
     var options = {
       aspectRatio: 400 / 280,
       preview: '.img-preview'
     }
     
     // 3. 初始化裁剪区域
     $image.cropper(options)
     $('#btnchooseimage').on('click',function(){
         $('#coverFile').click()
     })
     $('#coverFile').on('change',function(e){
        var files=e.target.files
        // 判断用户是否选择了文件
        if(files.length===0){
            return
        }
        var newimgurl=url.createObjectURL(file[0])
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
     })
    //  定义文章的发布状态
    var art_state='已发布'
    $('#btnsave2').on('click',function(){
        art_state='草稿'
    })
    // 为表单绑定提交事件
    $('#form-pub').on('submit',function(e){
        e.preventDefault()
        var fd=new FormData($(this)[0])
        fd.append('state',art_state)
        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
          width: 400,
          height: 280
        })
        .toBlob(function(blob) {      
             // 将 Canvas 画布上的内容，转化为文件对象
          // 得到文件对象后，进行后续的操作
        //   将文件对象存储到fd中
        fd.append('cover_img',blob)
        publishart(fd)
        })

    })
    function publishart(fd){
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd,
            // 如果提交dataform 必须加上两个配置项
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status!==0){
                    return  layer.msg('发布文章失败')
                }
                layer.msg('发布文章成功')
                location.href='/article/art_list.html'
            }
        })
    }
})