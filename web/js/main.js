/**
 * Created by dell4 on 2016/12/20.
 */
!(function(){
    var fileName="";
    var bodydom=$(".cention")
    var _url="http://www.xidayun.com:21000"
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
        fileName=removeLastOne(files[0]);
        dom(fileName)
        web(fileName)
    })
    function removeLastOne(str){
        return str.substring(0,str.length - 5);
    }
})()