$(function(){
    // var wrapper=$("wrapper");
    var input=$(".text");
    var button=$(".search .button");
    var interface=$(".Cinterface .button");
    var remaind=$(".remaind");
    var know=$(".know");
    var content=$(".content");
    var interfaceUrl=["http://jqaaa.com/jq3/?url=&url=","http://jx.598110.com/v/3.php?url=","http://www.1717yun.com/jx/ty.php?url="];
    var href="http://jqaaa.com/jq3/?url=&url=";
    var textinner=["我查个锤子，你都没输网址","搞毛啊，都不输入","又点人家，快说想看什么"];
    var count=0;
    remaind.hide();
    know.click(function(){
        remaind.slideUp();
    });
    button.click(function(){
        var text=input.val();
        if(!text)
        {
             content.text(textinner[count]);
             var num=count+1;
             count=getcount(num);
             remaind.slideDown();
        }
        else
        {   remaind.slideUp();
            setTimeout(function(){
            var url=href+text;
             // window.location.href = 'http://jqaaa.com/jq3/?url=&url='+text;
             window.open(url);
            },500)  
        }
    });
    interface.click(function(){
        remaind.slideUp();
        var url=$(this).attr("id");
        href=interfaceUrl[url];
        if(url=="0"){content.text("已更换默认接口");}
        else
        content.text("接口"+url+"更换成功");
        remaind.slideDown();
    });
    function getcount(num){
        if(num>2)
            num=0;
        return num;
    }
});