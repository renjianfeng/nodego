/**
 * Created by dell4 on 2016/12/26.
 */
function web(fileName){
    var bodydom=$(".cention")
    var _url="http://127.0.0.1:8100"
    ajaxUser()
    $("#index_search").click(function(){
        $("#search_json").addClass("code-showbody");
        bodydom.addClass("add-code-bg");
        $("#search_jsonname").focus();
        $("#search_jsonname").val($(this).val());
        ajaxSearch()
    })
    $("#exit_search").click(function(){
        $("#search_json").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg");
    })

    $("#search_jsonname").keyup(function(){
        ajaxSearch()
    })
    $("#login-model").click(function(){
        $("#login_box").addClass("code-showbody");
        bodydom.addClass("add-code-bg");
    })
    $("#login_exit").click(function(){
        $("#login_box").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg");
    })

    $("#reg-model").click(function(){
        $("#reg_box").addClass("code-showbody");
        bodydom.addClass("add-code-bg");
    })
    $("#reg_exit").click(function(){
        $("#reg_box").removeClass("code-showbody");
        bodydom.removeClass("add-code-bg");
    })


    $(document).on("click",".exit-login-btn",function(){
        exitLogin()
    })


    //登录
    $("#login_btn").click(function(){
        $.ajax({
            url: _url+"/login",
            data: {
                "username": $("#login_name").val(),
                "password": $("#login_pwd").val()
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data)
                if(data.state=="success"){
                    layer.msg('登录成功！欢迎您，'+data.uname);
                    $("#login_exit").click();
                    $(".login-box").html('欢迎您，'+data.uname+"<span class='exit-login-btn'>退出</span>");
                }else{
                    layer.msg('账号或密码错误！');
                }
            }
        })
    })

    //注册
    $("#reg_btn").click(function(){

        if( $("#reg_pwd").val()== $("#nextreg_pwd").val()){
            if($("#reg_pwd").val().length<6||$("#reg_name").val().length<6){
                layer.msg('账号或密码最小长度不能小于6位！');
            }else{
                $.ajax({
                    url: _url+"/reg_do",
                    data: {
                        "username": $("#reg_name").val(),
                        "password": $("#reg_pwd").val()
                    },
                    type: "post",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        console.log(data)
                        if(data.state=="error"){
                            layer.msg('该用户名已经被注册！');
                        }else{
                            $("#reg_exit").click();
                            $("#reg-model").click();
                            layer.msg('注册成功！');
                        }
                    }
                })
            }

        }else{
            layer.msg('两次键入密码不一致！');
        }
    })






    $(document).on("click",".search-box ul li",function(){
        $.ajax({
            url: _url+"/search_id",
            data: {
                "_id": $(this).attr("id"),
            },
            type: "get",
            dataType: "json",
            async: true,
            success: function (data) {
                console.log(data)
                cmdJson=data[0];
                $("#exit_search").click();
                delete data[0]._id;
                fs.writeFile('file_data/'+data[0].name+'.json', JSON.stringify(cmdJson, null, 4), function (err) {
                    if (err) throw err;
                });
                location.reload()
            }
        })
    })

    //首次加载判断用户状态
    function ajaxUser(){
        $.ajax({
            url: _url+"/getLoginstate",
            type: "get",
            success: function (data) {
                if(data!="null"){
                    $(".login-box").html('欢迎您，'+data+"<span class='exit-login-btn'>退出</span>");
                }
            }
        })
    }


    function exitLogin(){
        $.ajax({
            url: _url+"/login_exit",
            type: "get",
            success: function (data) {
                location.reload()
            }
        })
    }
    function ajaxSearch(){
        $.ajax({
            url: _url+"/search_do",
            data: {
                "name": $("#search_jsonname").val(),
            },
            type: "get",
            dataType: "json",
            async: true,
            success: function (data) {
                console.log(data)
                var str=""
                for(var i=0;i<data.length;i++){
                    str+="<li id='"+data[i]._id+"'>"+data[i].name+"</li>"
                }
                $(".search-box ul").html(str);
            }
        })
    }
}