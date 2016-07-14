/**
 * author:haorooms
 * this is common text,by no use requirejs and us js globle rem.js
 * 
 * http://www.haorooms.com
 * 
 * write:2015.05.06 copyright:克而瑞
 */
define([], function () {
    return webtouchObj = {
        showornot: 0,
        canvasload: function (id) {
            //canvas加载图片
            var imglength = $("#"+id).find("canvas").length;
            if (imglength > 0) {
                $("#"+id).find("canvas").each(function () {
                    var imgSrc = $(this).data("src");
                    var imageObj = new Image();
                    imageObj.canvs = $(this)[0];
                    var cvs = imageObj.canvs.getContext('2d');
                    if (cvs) {
                        imageObj.onload = function () {
                            imageObj.canvs.width = this.width;
                            imageObj.canvs.height = this.height;
                            cvs.drawImage(this, 0, 0);
                            $(imageObj.canvs).css("background-image", "none");
                        }
                        imageObj.src = imgSrc;
                    }
                })
            }
        },
        backtoTop: function () {
            var screenheight = $(window).height();
            if ($(window).scrollTop() > screenheight) {

                if ($('#backtop').is(":hidden")) {
                    $('#backtop').fadeIn();
                }
            } else {
                if ($('#backtop').is(":visible")) {
                    $('#backtop').fadeOut();
                }
            }
        },
        backtoTopdh: function () {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        },
        trim: function (text) {
            if (typeof (text) == "string")
            {
                return text.replace(/^\s*|\s*$/g, "");
            }
            else
            {
                return text;
            }
        },
        formatPrice: function (n) {
            var t = parseInt(n), i, r;
            for (t = t.toString().replace(/^(\d*)$/, "$1."), t = (t + "00").replace(/(\d*\.\d\d)\d*/, "$1"), t = t.replace(".", ","), i = /(\d)(\d{3},)/; i.test(t); )
                t = t.replace(i, "$1,$2");
            return t = t.replace(/,(\d\d)$/, ".$1"), r = t.split("."), r[1] == "00" && (t = r[0]), t
        },
        topSelect: function () {
            var classes = $(this).data("classes");
            if ($(this).children().eq(1).hasClass("up") && $(this).children().eq(0).hasClass("current")) {
                $(this).children().eq(1).addClass("down").removeClass("up");
                $(this).children().eq(0).removeClass("current");
                $("." + classes).slideUp(100);
                $("#BgDiv").hide();
                $(this).siblings().each(function () {
                    $(this).children().eq(0).removeClass("current");
                    $(this).children().eq(1).removeClass("up").addClass("down");
                    $("." + $(this).data("classes")).slideUp(100);
                    webtouchObj.showornot = 0;
                })
            } else {
                $(this).children().eq(1).addClass("up").removeClass("down");
                $(this).children().eq(0).addClass("current");
                $("." + classes).slideDown(100);
                $("#BgDiv").show();
                $(this).siblings().each(function () {
                    $(this).children().eq(0).removeClass("current");
                    $(this).children().eq(1).removeClass("up").addClass("down");
                    $("." + $(this).data("classes")).slideUp(100);
                    webtouchObj.showornot = 0;
                })
            }
            setTimeout("webtouchObj.yanchizx()", 105);
        },
        yanchizx: function () {
            $(".choice_wrap ul").each(function () {
                if ($(this).is(":visible")) {
                    webtouchObj.showornot = 1
                }
            })
            if (webtouchObj.showornot) {
                $('body').css("overflow", "hidden");
                // $(".choice_wrap").css({"height": "calc(100% - 99px)", "background": "rgba(0,0,0,0.5)"});
                //  $("#BgDiv").show();
            } else {

                $('body').css("overflow-y", "scroll");
                //$(".choice_wrap").css({"height": "auto", "background": "none"});
                //   $("#BgDiv").hide();
            }
        },
        cancelSelect: function () {
            $(".newHosue_nav  ul li,.evaluation_tab  ul li").each(function () {
                if ($(this).children().eq(1).hasClass("up") && $(this).children().eq(0).hasClass("current")) {
                    $(this).children().eq(1).addClass("down").removeClass("up");
                    $(this).children().eq(0).removeClass("current");
                }
            })
            $(".choice_wrap ul").each(function () {
                if ($(this).is(":visible")) {
                    $(this).hide()
                }
            })

            $('body').css("overflow-y", "scroll");
            //$(".choice_wrap").css({"height": "auto", "background": "none"});
            $("#BgDiv").hide();
        },
        showLocation: function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            webtouchObj.setCookie("latitude", latitude, 1);
            webtouchObj.setCookie("longitude", longitude, 1);
        },
        errorHandler: function (err) {
            if (err.code == 1) {
                console.dir("拒绝访问当前位置!");
            } else if (err.code == 2) {
                console.dir("您的位置获取不到!");
            }
        },
        getLocation: function () {
            if (navigator.geolocation) {
                // timeout at 60000 milliseconds (60 seconds)
                var options = {timeout: 60000};
                navigator.geolocation.getCurrentPosition(webtouchObj.showLocation, webtouchObj.errorHandler, options);
            } else {
                alert("浏览器不支持定位!");
            }
        },
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        setCookie: function (name, value, Days) {
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        jsXss:function(s){
            { 
            var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
            var rs = ""; 
            for (var i = 0; i < s.length; i++) { 
             rs = rs+s.substr(i, 1).replace(pattern, ''); 
            }
            return rs;
            }  
        },
        showSearchHis:function(){
            $("#search_content").hide();
            $(".Gsearch").show();
            $("#his_content").show();
            $("#searchinput").focus();
            if(localStorage.getItem("historyString")){
            var historyArray=localStorage.getItem("historyString").split(";");
            historyArray.reverse();
            if(historyArray.length>10){
                var listnum=10
            }else{
               var listnum= historyArray.length;
            }
            var listhistory=[];
            for(var i=0;i<listnum;i++){
                listhistory[i]='<li><a href="?iRegionID=0&iPriceID=0&iLayoutID=0&sKeyword='+historyArray[i]+'&iFeatureID=">'+historyArray[i]+'</a></li>';
            }
            $("#his_content").html(listhistory.join(""));
         }
        },
        setHistoryData: function () {
            if (localStorage.getItem("historyString")) {
                var historyArray = localStorage.getItem("historyString").split(";");
            } else {
                var historyArray = []
            }
            if($(this).data("content")=="confirmbtn"){
              var searchcontent = $("#searchinput").val();
           }else{
               var searchcontent=$(this).data("name");
           }
            if ($.trim(searchcontent) != "") {
                searchcontent=webtouchObj.jsXss(searchcontent);
                if (historyArray.indexOf(searchcontent) != -1) {
                    historyArray.splice(historyArray.indexOf(searchcontent), 1)
                }
                historyArray.push(searchcontent);
                localStorage.setItem("historyString", historyArray.join(";"))
            }
            window.location.href = '?iRegionID=0&iPriceID=0&iLayoutID=0&sKeyword=' + searchcontent + '&iFeatureID=';

        },
        mohuSearchData: function (e) {
             $("#his_content").hide();   
            var skeyword=e.target.value;
            if($.trim(skeyword)!=""){
                $.ajax({
                    url:"",//模糊搜索地址
                    type:"post",
                    dataType:"json",
                    data:{"keyword":skeyword},
                    success:function(res){
                        console.log(res);
                       // console.dir(res);
                        var listsearch=[];
                        var listnum=res.data.data.data.length
                        if(listnum>0){
                          $("#search_content").show();
                        for(var i=0;i<listnum;i++){
                            var sLpAddr=res.data.data.data[i].sAddress;
                            var sLpName=res.data.data.data[i].sLoupanName;
                            var sLpAddrNew=sLpAddr.replace(eval("/("+skeyword+")/gi"),'<span class="red2">$1</span>');
                            var sLpNameNew=sLpName.replace(eval("/("+skeyword+")/gi"),'<span class="red2">$1</span>');
                            listsearch[i]=' <li data-name='+sLpName+'><a href="?iRegionID=0&iPriceID=0&iLayoutID=0&sKeyword='+sLpName+'&iFeatureID=">'+
                        '<p class="sptitle">'+sLpNameNew+'</p>'+
                        '<p class="spaddress ptf2">'+sLpAddrNew+'</p>'+
                         '</a></li>'
                        }
                        $("#search_content").html(listsearch.join(""));
                    }else{
                       $("#search_content").hide();  
                    }
                        
                    },
                    error:function(res){
                        console.dir(res);
                        
                    }
                })
            }

        }
    }
});