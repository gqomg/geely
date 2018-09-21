window.onerror = function (msg) {
    //alert(JSON.stringify(msg));
};

var yainfo;

function ya_login() {
    ya.login(function (res) {
        //$("#YaUserId").val(res.uid);
      //  $("#YaUserId_span").text(res.uid);
       // $("#YaUserName_span").text(res.nickName);
      //  $("#YaImgUrl_span").text(res.imgUrl);
        api.login_ya(res.uid, res.nickName, res.imgUrl);//服务器登陆
    });
}

ya.onReady(function () {
    yainfo = ya.device;

    //延迟加载登陆
    // var cardflag = false;
    // setInterval(function () {
    //     if ($("#YaUserId").val() == "" || !cardflag) {
     //        cardflag = true;
    //         ya_login();
   //      }
     //}, 100);

});














 