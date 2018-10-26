
var textinfomation=["小笨蛋","好想你啊","我是主人送您的礼物",
"记录我们的点滴","表白媳妇","幸福就是有你有我",
"用我三生烟火，换你一世迷离","得之我幸，失之我命"
,"我想要和你一起慢慢变老","想想和我一同看日升日落的喜悦吧"
,"我不要短暂的温存,只要你一世的陪伴","我的世界只有你懂"
,"不知什么时后开始，我已学会依赖",
"每一个有你声相伴的夜，不再过于寂寥冷清","每天...很想你...",
"不管今世也来世也好....我所要的只有你..","虽然不能满足你最大的物质生活...但我可以把我的心来满足你.."];
var autoinformation=["小主","今天心情怎么样？","有没有想主人啊","给您唱首歌吧",
"我爱你就像飞蛾扑向火....❥(^_-)","喜欢我吗","小主最好看","你使得我的生活有情有爱,还有泪 ...",
"我发誓....五十年后...我还是像现在一样爱你...","认识你才知道有一种心情叫做依恋,有一种感觉叫爱."];
var text=$('.text');
var count1=0;
var count2=0;
var flag=0;
var tips=$('.tips');
var container=$('.cartoon');
tips.fadeIn();
function auto()
{
    var timer=setInterval(function(){
    tips.hide();
    text.text(textinfomation[count1]);
    tips.fadeIn(1000);
    count1=randomNum(0,textinfomation.length);
    //count1++;
    flag++;
    if(flag>50)
        clearInterval(timer);
    if(count1>=textinfomation.length)
    {
        count1=0;
    }
    },5000);
    return timer;
}
var timer=auto();
container.click(function(){
    text.hide();
    text.text(autoinformation[count2]);
    
    if(count2>=autoinformation.length)
        count2=0;
    text.text(autoinformation[count2]);
    text.fadeIn();
    //count2++;
     count2=randomNum(0,autoinformation.length);
    // auto();
})
//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 