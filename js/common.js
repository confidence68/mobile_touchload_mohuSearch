/**
 * author:haorooms
 * this is common text,by no use requirejs and us js globle rem.js
 * 
 * http://www.haorooms.com
 * 
 * write:2016.03.06
 */
;(function () {
    var Dpr = 1, uAgent = window.navigator.userAgent;
    var isIOS = uAgent.match(/iphone/i);
    var isYIXIN = uAgent.match(/yixin/i);
    var is2345 = uAgent.match(/Mb2345/i);
    var ishaosou = uAgent.match(/mso_app/i);
    var isSogou = uAgent.match(/sogoumobilebrowser/ig);
    var isLiebao = uAgent.match(/liebaofast/i);
    var isGnbr = uAgent.match(/GNBR/i);
    var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth, wDpr, wFsize;
    var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
    if (window.devicePixelRatio) {
        wDpr = window.devicePixelRatio;
    } else {
        wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1;
    }
    if (isIOS) {
        wWidth = screen.width;
        wHeight = screen.height;
    }
    // if(window.orientation==90||window.orientation==-90){
    //     wWidth = wHeight;
    // }else if((window.orientation==180||window.orientation==0)){
    // }
    if (wWidth > wHeight) {
        wWidth = wHeight;
    }
    wFsize = wWidth > 1080 ? 144 : wWidth / 7.5;
    wFsize = wFsize > 32 ? wFsize : 32;
    window.screenWidth_ = wWidth;
    if (isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr) {//YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
        setTimeout(function () {
            wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth;
            wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
            wFsize = wWidth > 1080 ? 144 : wWidth / 7.5;
            wFsize = wFsize > 32 ? wFsize : 32;
            // document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
            document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
        }, 500);
    } else {
        // document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
    }
})()

var commonObj = {
    ajaxUrl: "", //模糊搜索url
    moreUrl: "", //下拉分页更多的url
    searchUrl: "",
    ajaxstatus: true,
    fenyestatus: true,
    pageData: {}, //下拉分页传输的data
    appendId: "", //下拉分页append的父级ID
    mohuSearch: function () {
        var _this = this;
        //搜索弹框
        $(".opensearchbar").on("touchend", function () {
            $("body").css({height: "100%", overflow: "hidden"});
            $(".searchdialog").show();
            $("#m_searchinput").focus();

        })
        //搜索关闭
        $(".l_backbtn").on("click", function () {
            $("body").removeAttr("style");
            $(this).parent().hide();
            //搜索清空逻辑
            $("#m_searchinput").val("").blur();

        })
        //搜索按钮
        $(".searchdialog").on("click", ".mh_searchbtn", function () {
            var keyword = $.trim($("#m_searchinput").val());
            //搜索逻辑
            window.location.href = commonObj.searchUrl + "?keyword=" + keyword;
        })
        if (document.getElementById('m_searchinput')) {
            //搜索匹配
            document.getElementById('m_searchinput').addEventListener('input', function (e) {
                var keyword = e.target.value;
                var searchResult = [];
                if ($.trim(keyword) != "") {
                    $.ajax({
                        url: _this.ajaxUrl,
                        type: "post",
                        data: {keyword: keyword},
                        dataType: "json",
                        success: function (res) {
                            var dataLength = res.data.data.length;
                            if (dataLength > 0) {
                                for (var i = 0; i < dataLength; i++) {
                                    searchResult[i] = '<a class="m_searchli" href="' + res.data.data[i].searchUrl + '?keyword=' + res.data.data[i].keyword + '">' +
                                            '<div class="m_searchinner">' + res.data.data[i].keyword + '</div>' +
                                            '</a>';
                                }
                                $("#showmohulist").html(searchResult.join("")).show();
                            } else {
                                $("#showmohulist").hide();
                            }
                        }
                    })
                } else {
                    $("#showmohulist").html("").show();
                }
            });
        }
    },
    scrollNextPage: function () {
        var _this = this;
        // $(window).scroll(_this.scrollFn);
        $(window).on("touchmove", _this.scrollFn);

    },
    scrollFn: function () {
        var clientHeight = $(window).height();
        var wholeHeight = $(document).height();
        var scrollTopHeight = $(window).scrollTop();
        if (clientHeight + scrollTopHeight + 50 >= wholeHeight && commonObj.ajaxstatus) {
            if (commonObj.fenyestatus) {
                commonObj.ajaxstatus = false;
                $(".loaddiv").show();
                $.ajax({
                    url: commonObj.moreUrl,
                    type: "post",
                    dataType: "json",
                    data: commonObj.pageData,
                    success: function (res) {
                        commonObj.searchCallBack(res);
                    }
                })
            } else {
                return
            }
        }
    },
    searchCallBack: function (obj) {
    }
}





