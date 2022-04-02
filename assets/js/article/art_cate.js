$(function(){
    var layer=layui.layer
    var form=layui.form
    initArtCateList()
    console.log('233')
    // 获取文章分类列表
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
        var htmlstr= template('tpi-table',res)
         $('tbody').html(htmlstr)
            }
        })
    }
    var indexadd=null
    // 未添加点击事件
    $('#btnAddCate').on('click',function(){
        indexadd=   layer.open({
            type:1,
            area:['500px','250px'],
            title:'添加文章分类',
            content: $('#dialog-add').html()
        })
        $('body').on('submit','#form-add',function(e){
            e.preventDefault();
            $.ajax({
                method:'POST',
                url:'/my/article/addcates',
                data:$(this).serialize(),
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('新增分类失败')
                    }
                    initArtCateList()
                    layer.msg('新增分类成功')
                    // 根据索引关闭弹出层
                    layer.close(indexadd)
                }
            })
        })
        var  indexEdit=null
    })
    // 通过代理的形式 为btn-edit绑定点击事件
    $('tbody').on('click','.btn-edit',function(){
        // 弹出修改文章分类的层
        indexEdit= layer.open({
            type:1,
            area:['500px','250px'],
            title:'修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id=$(this).attr('data-id')
        // 发起请求获取对应数据
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
    form.val('form-edit',res.data)
            }
        })
    })
    // 通过代理的方式绑定submit
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新分类失败')
                }
                layer.msg('更新分类成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    $('tbody').on('click','.btn-delete',function(){
        var id=$(this).attr('data-id')
        layer.confirm('确认删除？',{icon:3,title:'提示' },function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除数据失败')
                    }
                    layer.msg('删除数据成功')
                    layer.close(index)
                    initArtCateList()
                }
            })
            
        })
    })

})