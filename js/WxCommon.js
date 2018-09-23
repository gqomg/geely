/*
    需要引用以下JS：
    http://res.wx.qq.com/open/js/jweixin-1.0.0.js  微信官方js-sdk
    http://nan3.zihx.com/resources/Scripts/weixinjssdk.js 二次封装sdk
*/

//分享
DATAForWeixin.debug = false; // 可设置为 true 以调试

DATAForWeixin.appId = 'wxda940c25c8fce8c5',//账号的appid (服务号2)
DATAForWeixin.openid = '',
DATAForWeixin.sharecampaign = 'qiji',//campaign名称

//朋友圈分享设置
DATAForWeixin.setTimeLine({
    title: '站住！把你的声音交出来！',
    imgUrl: "http://geely.nan3.net/images/share.jpg",
    link: 'http://geely.nan3.net',
    desc: '站住！把你的声音交出来！',
    success: function () {
    }
});
//分享朋友设置
DATAForWeixin.setAppMessage({
    title: '站住！把你的声音交出来！',
    imgUrl: "http://geely.nan3.net/images/share.jpg",
    desc: '为民族企业的国际范儿打call！',
    link: 'http://geely.nan3.net',
    success: function () {
    }
});
