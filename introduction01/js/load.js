;(function(){
	// //页面加载完成后显示
document.onreadystatechange=function () {
    //   if(document.readyState=="complete")
    //   {
    //     $(".loading").fadeOut();
    //   }
    // 

    setInterval(function()
			{
            $(".loading").fadeOut();

			},1000)
}
})();
