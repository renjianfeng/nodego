/**
 * Created by dell4 on 2016/12/23.
 */


//引入node-webkit页面gui插件
var gui = require('nw.gui');
var shell = gui.Shell;
//引入node.js本地应用插件，文件读写对象
var fs = require('fs');
var win = gui.Window.get();
onload = function() {
    gui.Window.get().show();
}


//遍历左侧目录
function navlist(){
    fs.readdir('file_data', function (err, files) {

        if (err) {
            console.log('读取目录失败')
        }

        //对文件进行排序
        files.sort(function(val1, val2){
            //读取文件信息
            var stat1 = fs.statSync('file_data/' + val1);
            var stat2 = fs.statSync('file_data/' + val2);
            //根据时间从最新到最旧排序
            return stat2.mtime - stat1.mtime;
        });

        //这个时候的files就是排序之后的，前三个一定是最新的，
        var list=""
        for(var i=0;i<files.length;i++){
            list+="<li>"+files[i]+"</li>"
        }
        $(".list-project").html(list)

    })
}



//通过软件控制台打印
function nodeGo(cmdstr1){
    //alert(cmdstr1);
    $("#consolebox").append("<div style='color: #fff;'>正在执行，请稍后...</div>");
    //应该不会再高了吧
    $("#consolebox").scrollTop(300000000000);
    fs.writeFile('xcopy.bat', cmdstr1, function (err) {
        if (err) throw err;
        var exec = require('child_process').exec;
        exec('call "'+process.cwd()+'/xcopy.bat',
            function (error, stdout, stderr) {
                /*                    if (error !== null) {
                 console.log('报错: ' + error);
                 }*/
                if (stdout !== null) {
                    /* console.log('SUCCESS: ' + stdout);
                     stdout=stdout.replace(/\n/g,"<br/>");
                     $("#consolebox").append("<div style='color: #fff;'>"+stdout+"</div>")*/
                    if (stderr.length!=0) {
                        console.log('ERROR: ' + stderr);
                        stderr=stderr.replace(/\n/g,"<br/>");
                        $("#consolebox").append("<div style='color: #ffa0c2;'>ERROR:"+stderr+"</div>")
                    }else{
                        $("#consolebox").append("<div style='color: darkgreen;'>SUCCESS</div>")
                    }
                }
                $("#consolebox").append("<div style='color: #fff;'>执行完成！</div>");
                //应该不会再高了吧
                $("#consolebox").scrollTop(300000000000);
            });
    });

}

//遍历执行页面
function htmlDom(cmdJson){
    $(".showfileDialog").html(cmdJson.fileaddress)
    var strVar = "";
    strVar += " <h4 class=\"title-h4\">"+cmdJson.name+"<\/h4>";
    strVar += "                <h5>"+cmdJson.description+"<\/h5>";
    strVar += "                <div>";
    for(var i=0;i<cmdJson.list.length;i++){
        strVar += "                <div class=\"code-list\">";
        strVar += "                <div class=\"text-right\">";
        strVar += "               <button class=\"edit-code-btn edit_code_do\">编辑<\/button>";
        strVar += "               <button class=\"save-code-btn delete-code-list\">删除<\/button>";
        strVar += "                    <\/div>";
        strVar += "                    <h5>"+cmdJson.list[i].titleh1+"<\/h5>";
        strVar += "                    <h6>"+cmdJson.list[i].titleh2+"<\/h6>";
        strVar += "                    <div class=\"row-cell\">";
        strVar += "                        <div class=\"col-ela\">";
        strVar += "                            <textarea class=\"nodecode\" placeholder=\"着这里输入控制台命令!\">"+cmdJson.list[i].cmdcode+"<\/textarea>";
        strVar += "                        <\/div>";
        strVar += "                        <div class=\"col-ela\" style=\"width: 100px\">";
        strVar += "                            <button class=\"nodego\">运行<\/button>";
        strVar += "                        <\/div>";
        strVar += "                    <\/div>";
        strVar += "                <\/div>";
    }
    strVar += "                <\/div>";
    $(".code-cention").html(strVar);
}

//通过系统控制台打印，执行完自动关闭！
function shelldo(cmdstr1){
    // "\n cmd /k"
    $("#consolebox").append("<div style='color: yellow;'>该命令使用系统默认控制台打印！</div>");
    $("#consolebox").scrollTop(300000000000);
    fs.writeFile('xcopy.bat', cmdstr1, function (err) {
        if (err) throw err;
        shell.openItem('xcopy.bat');
    });
}

//通过系统控制塔打印，执行完不自动关闭
function shelldocall(cmdstr1){
    // "\n cmd /k"
    $("#consolebox").append("<div style='color: yellow;'>该命令使用系统默认控制台打印！</div>");
    $("#consolebox").scrollTop(300000000000);
    fs.writeFile('xcopy.bat', cmdstr1+"\n\n\n", function (err) {
        if (err) throw err;
    });
    fs.writeFile('copy.bat', "\n\n\n  start xcopy.bat", function (err) {
        if (err) throw err;
        shell.openItem('copy.bat');
    });
}