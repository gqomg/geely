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






var record = $('#record'); // 录音按钮
var stopRecord = $('#stopRecord'); // 停止按钮
var voice = $('#voice'); // 播放按钮 
var stopVoice = $('#stopVoice'); // 停止播放按钮

var uploadVoice = $('#uploadVoice'); // 上传按钮

var wxAudio = { localId: "", serverId: "" };  //本地音频ID and 服务器音频ID
$(function () {
    DATAForWeixin.getWx(function (wx) { });

    //开始录音
    $(record).on("click", function () {
        wx.startRecord({
            cancel: function () {
                alert('用户拒绝授权录音');
            }
        });
    });
    //停止录音
    $(stopRecord).on("click", function () {
        wx.stopRecord({
            success: function (res) {
                wxAudio.localId = res.localId;
                alert(wxAudio.localId);
            }
        });
    });
    //播放录音
    $(voice).on("click", function () {
        wx.playVoice({
            localId: wxAudio.localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
    });
    //停止播放
    $(stopVoice).on("click", function () {
        wx.stopVoice({
            localId: wxAudio.localId // 需要停止的音频的本地ID，由stopRecord接口获得
        });
    });
    //上传录音
    $(uploadVoice).on("click", function () {
        wx.uploadVoice({
            localId: wxAudio.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1,// 默认为1，显示进度提示
            success: function (res) {
                wxAudio.serverId = res.serverId; // 返回音频的服务器端ID
                savevoice_wx(wxAudio.serverId);
                //alert(serverId);
            }
        });

    });
});


