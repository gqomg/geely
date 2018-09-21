
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
          获取广场列表
          1：正序，0：倒序 ,默认倒序
          城市
          页码：从1开始
          @return Array
         */
        getList: function (desc, city, page) {

            if (IsNull(page)) {
                alert("当前页码不能为空！");
                return;
            }
            var result = [];
            desc = desc ? desc : 0;
            $.ajax({
                url: "/API/B_GetList.ashx",
                type: "POST",
                data: { desc: desc, city: city, page: page },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res.data;
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
         参数：地址,城市名称
         @return Object
        */
        savevoice_ya: function (voiceurl, city) {
            if (IsNull(city)) {
                alert("请选择省份！");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/C_Savevoice_ya.ashx",
                type: "POST",
                data: { voiceurl: voiceurl, city: city },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res;
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                    }
                }
            });
            return result;
        },
        /* 
         微信 - 保存音频
         参数：服务端ID,城市名称
         @return Object
        */
        savevoice_wx: function (serverid, city) {
            if (IsNull(city)) {
                alert("请选择省份！");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/D_Savevoice_wx.ashx",
                type: "POST",
                data: { serverid: serverid, city: city },
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
                }
            });
            return result;
        },
        /* 
         获取音频
         参数：音频ID
         @return Object
        */
        getvoice: function (aid) {
            if (IsNull(aid)) {
                alert("音频ID不能为空");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/E_GetVoice.ashx",
                type: "POST",
                data: { aid: aid },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                             result = res;
                        if (res.Remark1 == "1") //后台删除的数据
                        {
                            location = "index.html";
                        }
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                    }
                }
            });
            return result;
        },
        /* 
         获取评论列表
         参数：音频ID 、发送端方式
         @return Array
        */
        getCommentList: function (aid, page) {
            if (IsNull(aid)) {
                alert("音频ID不能为空");
                return;
            }
            if (IsNull(page)) {
                alert("请提供页码");
                return;
            }
            var result = [];
            $.ajax({
                url: "/API/F_GetCommentList.ashx",
                type: "POST",
                data: { aid: aid, page: page },
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res.data;
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                    }
                }
            });
            return result;
        },
        /* 
         添加评论
         参数：音频ID，城市名称
         @return Object
        */
        addComment: function (aid, city) {
            if (IsNull(aid)) {
                alert("音频ID不能为空");
                return;
            }
            if (IsNull(city)) {
                alert("请选择省份");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/G_AddComment.ashx",
                type: "POST",
                data: { aid: aid, city: city },
                dataType: "json",
                async: false,
                cache: false,
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
                }
            });
            return result;
        },
        /* 
         提交手机号码
         参数：姓名、手机号、发送端1.喜马拉雅 2.微信
         @return Object
        */
        submitPhone: function (name, phone, mode) {
            if (IsNull(mode)) {
                alert("请提供发送端方式");
                return;
            }
            api.getUserInfo(mode); //获取用户信息

            if (IsNull(name)) {
                alert("请填写姓名");
                return;
            }
            if (IsNull(phone)) {
                alert("请填写手机号码");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/H_SubmitPhone.ashx",
                type: "POST",
                data: { name: name, phone: phone, mode: mode },
                dataType: "json",
                async: false,
                cache: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res;
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                        if (res.code == -1) alert("手机号码已存在");
                        if (res.code == -2) alert("手机号码格式不正确");
                    }
                }
            });
            return result;
        },
        /* 
         刮奖
         参数：抽奖Id
         @return Object
        */
        latombola: function (iid,mode) {
            if (IsNull(iid)) {
                alert("请提供抽奖ID");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/J_Latombola.ashx",
                type: "POST",
                 data: { iid: iid ,mode:mode},
                dataType: "json",
                async: false,
                success: function (res) {
                    if (res.code > 0) {
                        result = res;
                    }
                    else {
                        if (res.code == -99) alert(res.msg);
                        if (res.code == -1) alert("您已经抽过奖品了");
                        if (res.code == -2) alert("今天的兑换码已发放完，请明天参与");
                        if (res.code == -3) alert("活动已结束，无兑奖码");
                    }
                }
            });
            return result;
        },
        /* 
         获取用户信息
         参数：int类型  1.喜马拉雅 2.微信

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
        },
        /* 
         是否已经抽过奖
         参数：int类型  1.喜马拉雅 2.微信

         @return Object   
         对象中code 1.已经抽过奖 2 未抽过奖品
        */
        isLatombola: function (mode) {
            if (IsNull(mode)) {
                alert("请提供获取方式");
                return;
            }
            var result = {};
            $.ajax({
                url: "/API/L_IsLatombola.ashx",
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