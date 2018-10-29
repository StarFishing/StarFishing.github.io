$(function(){
    var input=$(".text");
    var button=$(".button");
    var remaind=$(".remaind");
    var know=$(".know");
    remaind.hide();
    know.click(function(){
        remaind.slideUp();
    });
    button.click(function(){
        // if(!input)
        //      alert("input");
        //  else
        var text=input.val();
        if(!text)
        // remaind.fadeIn();
        remaind.slideDown();
        else
        {
             window.location.href = 'http://jqaaa.com/jq3/?url=&url='+text;
             // window.open('http://jqaaa.com/jq3/?url=&url='+text);
        }
    });
});