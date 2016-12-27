/**
 * Created by dell4 on 2016/12/26.
 */
function web(fileName){
    $("#index_search").click(function(){
        $("#search_json").addClass("code-showbody");
        $(".windows_box").addClass("add-code-bg");
        $("#search_jsonname").focus();
        $("#search_jsonname").val($(this).val());
        ajaxSearch()
    })
    $("#exit_search").click(function(){
        $("#search_json").removeClass("code-showbody");
        $(".windows_box").removeClass("add-code-bg");
    })

    $("#search_jsonname").keyup(function(){
        ajaxSearch()
    })
    var _url="http://127.0.0.1:8100"
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
                fs.writeFile('file_data/'+data[0].name+'.json', JSON.stringify(cmdJson, null, 4), function (err) {
                    if (err) throw err;
                });
                location.reload()
            }
        })
    })
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