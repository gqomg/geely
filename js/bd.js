
var api = (function () {
    return {
        /* 
                喜马拉雅登陆接口
                用户ID ,昵称 ，头像路径 
                @return bool
               */
        login_ya: function (userid, username, userimg) {
            var result = false;
            $.ajax({
                url: "/API/A_YaLogin.ashx",
                type: "POST",
                data: { YaUserId: userid, YaUserName: username, YaImgUrl: userimg },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = true;
                        location = location.href;  //刷新页面
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                    }
                }
            });
            return result;
        },

        /* 
         喜马拉雅 - 保存音频
         @return Object
        */
        savevoice_ya: function (voiceurl) {
     
            var result = {};
            $.ajax({
                url: "/API/C_Savevoice_ya.ashx",
                type: "POST",
                data: { voiceurl: voiceurl },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res;
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                        if (res.code == -1) {
                            ya_login(); //弹出登陆窗体，并且保存到服务 刷新页面
                        }
                        if (res.code == -2) {
                            alert("保存音频失败");
                        }
                    }
                }
            });
            return result;
        },
        /* 
         微信 - 保存音频 
         @return Object
        */
        savevoice_wx: function (serverid) {
     
            var result = {};
            $.ajax({
                url: "/API/D_Savevoice_wx.ashx",
                type: "POST",
                data: { serverid: serverid },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res;
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                        if (res.code == -88) {
                            location = "/wx/login.aspx?redirect=" + escape(window.location.href);
                        }
                    } 

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    alert(XMLHttpRequest.status);
                    // 状态
                    alert(XMLHttpRequest.readyState);
                    // 错误信息   
                    alert(textStatus);
                }
            });
            return result;
        },
        /* 
       喜马拉雅 - 生成图片
        id:生成二维码的ID
       @return Object
      */
        generateImg_ya: function (id) {
            if (IsNull(id)) {
                alert("请提供ID！");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/B_GenerateImg.ashx",
                type: "POST",
                data: { mode:1, id: id },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) { 
                        result = res; 
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                        if (res.code == -1) {
                            ya_login(); //弹出登陆窗体，并且保存到服务 刷新页面
                        }
                        if (res.code == -2) {
                            alert("当前用户头像下载失败");
                        }
                    }
                }
            });
            return result;
        },
        /* 
         微信 - 生成图片
         id:生成二维码的ID
         @return Object
        */
        generateImg_wx: function (id) {
            if (IsNull(id)) {
                alert("请提供ID！");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/B_GenerateImg.ashx",
                type: "POST",
                data: { mode: 2, id: id },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res;
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                        if (res.code == -1) {
                            location = "/wx/login.aspx?redirect=" + escape(window.location.href);
                        }
                        if (res.code == -2) {
                            alert("当前用户头像下载失败");
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    alert(XMLHttpRequest.status);
                    // 状态
                    alert(XMLHttpRequest.readyState);
                    // 错误信息   
                    alert(textStatus);
                }
            });
            return result;
        },
        /* 
      获取作品信息
      id： 编号
      @return Object
     */
        getWork: function (id) {
            if (IsNull(id)) {
                alert("请提供作品ID！");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/C_GetInfo.ashx",
                type: "POST",
                data: { id:id },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res;
                    }
                    else {
                        if (res.code == -99) alert(res.msg); 
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    alert(XMLHttpRequest.status);
                    // 状态
                    alert(XMLHttpRequest.readyState);
                    // 错误信息   
                    alert(textStatus);
                }
            });
            return result;
        },
        /* 
       获取用户信息 

       @return Object  
       userid：用户ID
       username：用户昵称
       userimg：头像路径 
      */
        getUserInfo: function (mode) {
            if (IsNull(mode)) {
                alert("请提供获取方式");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/K_GetUserInfo.ashx",
                type: "POST",
                data: { mode: mode },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res;
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                        if (res.code == -1) {
                            if (mode == 1) {  //ya
                                ya_login(); //弹出登陆窗体，并且保存到服务 刷新页面
                            }
                            else {  //wx
                                location = "/wx/login.aspx?redirect=" + escape(window.location.href);
                            }
                        }

                    }
                }
            });
            return result;
        }
    }
})();

//判断指定的参数是否为空
function IsNull(arg) {
    return (arg == "" || (new String(arg)) == "undefined" || arg == null || arg == undefined);
}