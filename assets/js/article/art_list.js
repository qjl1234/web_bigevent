$(function(){

    var layer=layui.layer
    var form=layui.form
    var laypage=layui.laypage
    // 定义美化时间的过滤器
    template.defaults.imports.dateFormat=function(date){
        const dt=new Date(date)
        var y=dt.getFullYear()
        var  m=zero(dt.getMonth()+1)
        var d=zero(dt.getDate())
        var hh=zero(dt.getHours)
        var mm=zero(dt.getMinutes)
        var ss=zero(dt.getSeconds)
        return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss
    }
    function zero(n){
        return n>9?n:'0'+n
    }
    // 定义查询的参数对象 将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    var q={
        pagenum:1, //页码值，默认请求第一页的数据
        pagesize:2,//每页显示几条数据，默认每页显示两条
        cate_id:'',//文章分类的id
        state:''//文章的发布状态
    }
  
    initTable()
    // 获取文章列表数据的方法
    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                console.log(res)
                if(res.status!==0){
                   return layer.msg('获取文章列表失败')
                }
                // 使用模板引擎渲染页面数据
                var htmlstr=template('tpl-table',res)
                $('#qjl').html(htmlstr)
                // 调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }
    // 初始化文章分类的方法
    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取分类数据失败')
                }
                // 调用模板引擎分类的可选项
                var htmlstr=template('tpl-cate',res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        
        })
    }
        // 为筛选表单绑定submit事件
        $('#form-search').on('submit',function(e){
   e.preventDefault()
//    获取表单中选中项的值
var cate_id=$('[name=cate_id]').val()
var state=$('[name=state]').val()
// 为查询参数对象q中的对应属性赋值
q.cate_id=cate_id
q.state=state
// 根据最新的筛选条件，重新渲染表格的数据
initTable()
        })
        function renderPage(total){
            // 调用laypage渲染分页结构
       laypage.render({
           elem:'pageBox',//分页容器的id
           count:total,//总数据条数
           limit:q.pagesize,//每页显示几条数据
           curr:q.pagenum, //设置默认被选中的分页
           layout:['prev','page','next','skip'],
           limits:[2,3,5,10],
        //    分页发生切换的时候，触发的jump
           jump:function(obj,first){
            q.pagenum=obj.curr
            q.pagesize=obj.limit
        //    根据最新的q获取对应的数据列表 并渲染表格
        if(!first)
            initTable()
           }
        })
        }
        $('tbody').on('click','.btn-delete',function(){
            var len=$('.btn-delete').length

            var id=$(this).attr('data-id')
            layer.confirm('确认删除?',{icon:3,title:'提示',function(index){
                $.ajax({
                    method:'GET',
                    url:'/my/article/delete/'+id,
                    success:function(res){
                        if(res.status!==0){
                            return layer.msg('删除文章失败')
                        }
                        layer.msg('删除文章成功')
                        if(len===1){
                            q.pagenum=q.pagenum===1?1:q.pagenum-1
                        }
                        initTable()
                    }
                })
                layer.close(index)
            }})
        })
})