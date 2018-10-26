
var textinfomation = ["小笨蛋", "好想你啊", "我是主人送您的礼物",
    "记录我们的点滴", "表白媳妇", "幸福就是有你有我",
    "用我三生烟火，换你一世迷离", "得之我幸，失之我命", "我想要和你一起慢慢变老", "想想和我一同看日升日落的喜悦吧", "我不要短暂的温存,只要你一世的陪伴", "我的世界只有你懂", "不知什么时后开始，我已学会依赖",
    "每一个有你声相伴的夜，不再过于寂寥冷清", "每天...很想你...",
    "不管今世也来世也好....我所要的只有你..", "虽然不能满足你最大的物质生活...但我可以把我的心来满足你..",
    "谁说你作的菜难以下咽?我会每天回家吃晚饭!!!", "如果能用一辈子换你停留在我视线中..我将毫不保留", "喜欢你的笑容,喜欢静静的看着你,我的忧愁像云一般一下子就飞去了",
    "将你心再加上我的心,就算痛苦滋味也愿意尝..", "每天我的动力就是见到你,并和你说说话....",
    "我是那深深的大海,你是那自海的另一边升起的曙光,永远照亮我的人生...", "白昼与黑夜将无法阻挡我俩的深深思念!",
    "你就是我最困难时的那位永远支持我的人!", "总是想念着你,,虽然我们无法共同拥有每分每秒,,", "想你的心情实在没办法用一句话代替....",
    "在人群之中寻觅着你，就彷佛在海边掬起所有的沙粒， 急于发现你的踪迹，如果不从愿，但愿还有来生。", "愿天上的每一个流星,都为你而闪耀天际...",
    "假如可以的话，我愿意花去生命中的每一分每一秒~~陪着你~~", "或许我没有太阳般狂热的爱，也没有流水般绵长的情， 只知道不断的爱你爱你、无所能的为你...."
];
var autoinformation = ["小主", "今天心情怎么样？", "有没有想主人啊", "给您唱首歌吧",
    "我爱你就像飞蛾扑向火....❥(^_-)", "喜欢我吗", "小主最好看", "你使得我的生活有情有爱,还有泪 ...",
    "我发誓....五十年后...我还是像现在一样爱你...", "认识你才知道有一种心情叫做依恋,有一种感觉叫爱.",
    "不愿意醒来时，台灯投射在墙上只有我孤独的身影", "好想从现在开始抱着你，紧紧的抱着你，一直走到上帝面前...", "只想牵你的手..看你的眼...光着脚丫子..在海边漫步...只有你..只因你..",
    "你(你)是我生命中所能经历的,最最深切的感觉!!", "你是我今生的...新娘...", "我爱你..我爱你..我永远爱你....",
    "我不相信永远的爱,因为我只会一天比一天更爱你.", "看着你(你)的眼, 我看见了大海, 蓝天; 更看到了美丽的未来!!"
];
var text = $('.text');
var count1 = 0;
var count2 = 0;
var flag = 0;
var tips = $('.tips');
var container = $('.cartoon');
tips.fadeIn();

function auto() {
    var timer = setInterval(function() {
        tips.hide();
        text.text(textinfomation[count1]);
        tips.fadeIn(1000);
        count1 = randomNum(0, textinfomation.length);
        //count1++;
        flag++;
        if (flag > 50)
            clearInterval(timer);
        if (count1 >= textinfomation.length) {
            count1 = 0;
        }
    }, 5000);
    return timer;
}
var timer = auto();
container.click(function() {
    tips.hide();
    count2 = randomNum(0, autoinformation.length);
    text.text(autoinformation[count2]);

    if (count2 >= autoinformation.length)
        count2 = 0;
    tips.fadeIn();
    //count2++;

    // auto();
})
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}