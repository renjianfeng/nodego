/**
 * Created by dell4 on 2016/12/23.
 */

    function dom(fileName){
    var _url="http://www.xidayun.com:21000"
    var bodydom=$(".cention")
    var cmdJson;
    try {
        var fileThis="file_data/"+fileName+".json";
        cmdJson=fs.readFileSync(fileThis);
        cmdJson=JSON.parse(cmdJson)
    }   catch  (e)   {
        alert("文件路径不正确或文件编译出错！");
    }
    $(document).ready(function(e) {
        $(".code-cention").height($(window).height()-201);
        $(".cention").height($(window).height());
        $("#edit_jsontext").height($(window).height()-200);
        $(".search-box").height($(window).height()-230);
        window.onresize=function(){
            $(".code-cention").height($(window).height()-201);
            $(".cention").height($(window).height());
            $("#edit_jsontext").height($(window).height()-200);
            $(".search-box").height($(window).height()-230);
        }

        var sval=$(".nodecode").html();
        var cmdstr = "chcp 65001\n ";
        $(document).on("click",".nodego",function(){
            //var chooser = document.querySelector('#fileDialog');
            var adds=$(".showfileDialog").html();
            if(adds=="还没选择项目根目录0.0"){
                alert("还没选择项目根目录0.0");
            }else{
                //adds="C:\\Users\\dell4\\Desktop\\1101-1比令数据原型图";
                adds=adds.toString()
                var sdf=":\\";
                var str=adds.indexOf(sdf);
                // alert(str)
                var _pan="";
                _pan+="cd \\ \n"
                for(var i=0;i<str;i++){_pan+=adds[i]}
                _pan+=":\n"
                _pan+="cd "
                for(var i=(str+2);i<(adds.length);i++){_pan+=adds[i]}
                _pan+="\n"

                // console.log(_pan)
                var _index=$(this).parents(".code-list").index()
                // alert(cmdstr+_pan)

                if(cmdJson.list[_index].cmddo=="1"){
                    //使用nodeGO控制台打印
                    nodeGo(cmdstr+_pan+$(".nodecode:eq("+_index+")").val());
                }else if(cmdJson.list[_index].cmddo=="2"){
                    //使用系统默认控制台打印（执行后关闭）
                    shelldo(cmdstr+_pan+$(".nodecode:eq("+_index+")").val());
                }else if(cmdJson.list[_index].cmddo=="3"){
                    //使用系统默认控制台打印（执行后不关闭）
                    shelldocall(cmdstr+_pan+"\n\n"+$(".nodecode:eq("+_index+")").val());
                }
            }

        })

        win.setShowInTaskbar(true);
        $(".off_window").click(function(){
            win.close();
        })
        $(".min_window").click(function(){
            win.minimize();
        })
    });
    navlist();
    htmlDom(cmdJson);
    /*以上为node-webkit内置node.js函数，套用请删除*/
    var addressF="";
    document.querySelector('#fileDialog').onchange=function(){
        getFile("#fileDialog","showfileDialog",true)
    }
    document.querySelector('#fileDialog2').onchange=function(){
        getFile("#fileDialog2","showfileDialog2",false)
    }

    function getFile(id,classNameDO,filedo){
        var chooser = document.querySelector(''+id+'').value;
        if(chooser==null||chooser=="")
        {
            if(addressF!=""||addressF!=null){
                document.querySelector(''+id+'').value=addressF;
                $("."+classNameDO+"").html(document.querySelector(''+id+'').value)
                // document.getElementById("showfileDialog").innerHTML=""+document.querySelector('#fileDialog').value+"";
            }else{
                $("."+classNameDO+"").html("还没选择项目根目录0.0")
                //document.getElementById("showfileDialog").innerHTML="还没选择项目根目录0.0";
            }
        }else
        {
            addressF = document.querySelector(''+id+'').value;
            $("."+classNameDO+"").html(chooser)
            //document.getElementById("showfileDialog").innerHTML=""+chooser+"";
        }
        if(filedo){
            cmdJson.fileaddress=chooser;
            //将代码保存到本地
            fs.writeFile('file_data/'+fileName+".json", JSON.stringify(cmdJson, null, 4), function (err) {
                if (err) throw err;
            });
        }

    }

    $(document).on("click","#exit_addcode",function(){
        $("#add_code_body").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg")
    })

    $(document).on("click","#addcode_btn",function(){
        $("#add_code_body").addClass("code-showbody");
        bodydom.addClass("add-code-bg")
        $("#add_gongneng").val("");
        $("#add_miaoshu").val("");
        $("#add_code").val("");
        $('#add_code input[value="1"]').attr("checked","checked");
    })


//添加代码
    $(document).on("click","#addcode_tojson",function(){
        var gongneng=$("#add_gongneng").val();
        var miaoshu=$("#add_miaoshu").val();
        var code=$("#add_code").val();
        var codedo=$('#add_codedo input[name="codedo"]:checked ').val();

        cmdJson.list[cmdJson.list.length]={
            "titleh1":gongneng,
            "titleh2":miaoshu,
            "cmdcode":code,
            "cmddo":codedo
        }
        //console.log(cmdJson)

        //将代码保存到本地
        fs.writeFile('file_data/'+fileName+".json", JSON.stringify(cmdJson, null, 4), function (err) {
            if (err) throw err;
        });
        $("#add_code_body").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg");
        htmlDom(cmdJson);
        layer.msg('添加成功！');

    })

    //编辑代码弹窗初始化
    var idit_index;
    $(document).on("click",".edit_code_do",function(){

        var _index=$(this).parents(".code-list").index();
        var _list=cmdJson.list[_index];
        idit_index=_index;

        console.log(_list)

        $("#edit_gongneng").val(_list.titleh1);
        $("#edit_miaoshu").val(_list.titleh2);
        $("#edit_code").val(_list.cmdcode);
        $('#edit_codedo input[value="'+_list.cmddo+'"]').attr("checked","checked");
        //var codedo=$('#add_codedo input[name="codedo"]:checked ').val();
        //console.log(cmdJson)



    })

    $(document).on("click","#edit_file_code",function(){


        cmdJson.list[idit_index]={
            "titleh1": $("#edit_gongneng").val(),
            "titleh2": $("#edit_miaoshu").val(),
            "cmdcode": $("#edit_code").val(),
            "cmddo": $('#edit_codedo input[name="codedo2"]:checked ').val()
        };

        //将代码保存到本地
        fs.writeFile('file_data/'+fileName+".json", JSON.stringify(cmdJson, null, 4), function (err) {
            if (err) throw err;
        });
        $("#edit_code_body").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg");
        htmlDom(cmdJson);
        layer.msg('保存成功！');
    })


//新建项目
    $(document).on("click","#new_file",function(){

        var filename=$("#add_filename").val();
        var filemiaoshu=$("#add_filemiaoshu").val();
        var newcmdJson={
            "name":filename,
            "description":filemiaoshu,
            "fileaddress":addressF,
            "list":[]
        }
        fs.writeFile('file_data/'+filename+".json", JSON.stringify(newcmdJson, null, 4), function (err) {
            if (err) throw err;
            $("#add_file").removeClass("code-showbody");
            bodydom.removeClass("add-code-bg");
            navlist()
            layer.msg('创建成功！');
        });
    })


//打开项目
    $(document).on("click",".list-project li",function(){
        $(this).parent().find("li").removeClass("check-li")
        $(this).addClass("check-li")
        fileName=$(this).html();
        try {
            var fileThis="file_data/"+fileName+".json";
            cmdJson=fs.readFileSync(fileThis);
            cmdJson=JSON.parse(cmdJson)
        }   catch  (e)   {
            alert("文件不存在");
        }
        htmlDom(cmdJson)
    })


//新建命令窗口
    $(document).on("click","#exit_editcode",function(){
        $("#edit_code_body").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg")
    })

    $(document).on("click",".edit_code_do",function(){
        $("#edit_code_body").addClass("code-showbody");
        bodydom.addClass("add-code-bg")
    })



//编辑命令窗口
    $(document).on("click","#exit_editcode",function(){
        $("#edit_code_body").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg")
    })

    $(document).on("click",".edit_code_do",function(){
        $("#edit_code_body").addClass("code-showbody");
        bodydom.addClass("add-code-bg")
    })


//新建项目窗口
    $(document).on("click","#exit_file",function(){
        $("#add_file").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg")
    })

    $(document).on("click",".add-project-btn",function(){
        $("#add_file").addClass("code-showbody");
        bodydom.addClass("add-code-bg")
        $("#add_filename").val("");
        $("#add_filemiaoshu").val("");
    })

//编辑json文件窗口

    $(document).on("click","#editjson_btn",function(){
        $("#edit_json").addClass("code-showbody");
        bodydom.addClass("add-code-bg")
        $("#json_filename").html(fileName+".json")
        $("#edit_jsontext").val(JSON.stringify(cmdJson, null, 4))
    })

    $(document).on("click","#edit_jsonback",function(){
        $("#edit_json").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg");
        var newJson=$("#edit_jsontext").val()
        try {
            cmdJson=JSON.parse(newJson)
            fs.writeFile('file_data/'+cmdJson.name+".json", JSON.stringify(cmdJson, null, 4), function (err) {
                if (err) throw err;
                htmlDom(cmdJson);
                navlist()
                layer.msg('保存成功！');
            });
        }   catch  (e)   {
            layer.msg('JSON文件编译出错！');
        }
    })


//删除批处理片段
    $(document).on("click",".delete-code-list",function(){

        var _this=$(this)
        var index=layer.open({
            type: 1
            ,title: false //不显示标题栏
            ,closeBtn: false
            ,area: '300px;'
            ,shade: 0.8
            ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
            ,btn: ['确认删除', '取消']
            ,moveType: 1 //拖拽模式，0或者1
            ,content: '<div style="padding: 20px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">您确认要删除该条执行代码片段吗？</div>'
            ,success: function(layero){
                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');
                btn.find('.layui-layer-btn0').attr({
                    target: '_blank',
                    target: '_blank'
                });
            }
            ,yes: function(index, layero){
                layer.close(index)
                var _index=_this.parents(".code-list").index();
                cmdJson.list.splice(_index,1);
                fs.writeFile('file_data/'+fileName+".json", JSON.stringify(cmdJson, null, 4), function (err) {
                    if (err) throw err;
                });
                htmlDom(cmdJson)
                layer.msg('删除成功！');
            }
            });

    })

    //删除项目
    $("#deletejson_btn").click(function(){

        var index=layer.open({
            type: 1
            ,title: false //不显示标题栏
            ,closeBtn: false
            ,area: '300px;'
            ,shade: 0.8
            ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
            ,btn: ['确认删除', '取消']
            ,moveType: 1 //拖拽模式，0或者1
            ,content: '<div style="padding: 20px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">您确认要删除这个项目吗？（如果您是该项目的作者，线上仓库将同步删除，且不可恢复）</div>'
            ,success: function(layero){
                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');
                btn.find('.layui-layer-btn0').attr({
                    target: '_blank',
                    target: '_blank'
                });
            }
            ,yes: function(index, layero){
                layer.close(index)
                fs.unlink('file_data/'+fileName+".json", function(err){
                    if(err){
                        layer.msg('删除失败！');
                    }else{
                        layer.msg('删除成功！');
                        $.ajax({
                            url: _url+"/delete_code",
                            data: {
                                "json_name": cmdJson.name,
                            },
                            type: "get",
                            dataType: "json",
                            async: true,
                            success: function (data) {
                                console.log(data)
                                location.reload()
                            }
                        })
                    }
                });
            }
        });





    })

    //更新项目到线上仓库
    $(document).on("click","#commitjson_btn",function(){
        console.log(cmdJson)
         $.ajax({
         url: _url+"/save_code",
         data: {
         "json_name": cmdJson.name,
         "json_code": JSON.stringify(cmdJson, null, 4)
         },
         type: "post",
         dataType: "json",
         async: false,
         success: function (data) {
         console.log(data)
         if(data.state=="success"){
         layer.msg('更新成功！');
         }else if(data.state=="error1"){
         layer.msg('请先登录！');
         }else if(data.state=="error2"){
             layer.msg('你发布的代码的名称已经存在！如果您是这个代码的首次发布者，请登录您的正确账号！');
         }
         }
         })
    })

    function removeLastOne(str){
        return str.substring(0,str.length - 5);
    }

}
