/**
 * author:haorooms
 * this is common text,by no use requirejs and us js globle rem.js
 * 
 * http://www.haorooms.com
 * 
 * write:2015.05.06 copyright:克而瑞
 */
define([], function () {
    return xfsearchobj = {
        ajaxstatus:true,
        pageIndex:1,
        aEva:eval({
            "1": {"class": "rushou", "name": "\u5c3d\u5feb\u5165\u624b"},
            "2": {"class": "tuijian", "name": "\u63a8\u8350\u8d2d\u4e70"},
            "3": {"class": "jinshen", "name": "\u8c28\u614e\u8d2d\u4e70"},
            "4": {"class": "guanwang", "name": "\u6301\u5e01\u89c2\u671b"}
        }),
        initScroll: function () {
            webtouchObj.backtoTop();
            var pageH = $(document).height()
            var scrollT = $(window).scrollTop(); //滚动条top

            var winheight = $(window).height();
            // var aa = pageH - $(window).height() - scrollT;
            if (parseInt(scrollT) + parseInt(winheight) + 50 >= parseInt(pageH) && xfsearchobj.ajaxstatus) {
                if ($("#overnotload").val() == "1") {
                    xfsearchobj.ajaxstatus = false;
                    xfsearchobj.pageIndex++;
                    xfsearchobj.getData()
                } else {
                    return
                }
            }
        },
        getData: function () {
            $(".loaddiv").show();
            var iRegionID = $.trim($(".choice_wrap .region li.current").attr("regionid")) || 0;
            var iPriceID = $.trim($(".choice_wrap .price li.current").attr("priceid")) || 0;
            var iLayoutID = $.trim($(".choice_wrap .family  li.current").attr("layoutid")) || 0;
            var iFeatureID = $.trim($(".swiper-slide.current").attr("featureid")) || 0;
            var sKeyword = $.trim($("#searchinput").val()) || "";
            if (iFeatureID) {
                iRegionID = 0;
                iPriceID = 0;
                iLayoutID = 0;
                sKeyword = '';
            }
            $.ajax({
                url: '',
                type: 'post',
                dataType: 'json',
                data: {iPage: xfsearchobj.pageIndex, iRegionID: iRegionID, iPriceID: iPriceID, iLayoutID: iLayoutID, iFeatureID: iFeatureID, sKeyword: sKeyword},
                success: function (res) {
                    $(".loaddiv").hide();
                    if (res.data.data.list.length > 0) {
                        var html = "";
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            var advHtml = "";
                            if (res.data.data.list[i].sAdvantages) {
                                var advArr = res.data.data.list[i].sAdvantages.split(';');
                                for (var k = 0; k < advArr.length; k++) {
                                    if (advArr[k]) {
                                        advHtml += "<span class=\"mr5\">" + advArr[k] + "</span>";
                                    }
                                }
                            }
                            var gradeHtml = "";
                            if (iFeatureID && i < 3 && res.data.data.list[i].sRate * 1 > 0) {
                                gradeHtml = "";
                            }
                            else if (res.data.data.list[i].sRate * 1 > 0) {
                                gradeHtml = "<span class=\"grade ml5\">" + res.data.data.list[i].sRate + "</span>";
                            }

                            var flayTypeHtml = "";
                            if (res.data.data.list[i].iFlagType * 1 > 0) {
                                flayTypeHtml = "<s class=\"" + xfsearchobj.aEva[res.data.data.list[i].iFlagType * 1].class + "\"></s>";
                            }
                            html += "<a href=\"/h5/xf/xfdetail?id=" + res.data.data.list[i].iBuildingID +"&list=yes\"  class=\"item pl12\">" +
                                    "<div class=\"cnt p12 border_bottom\">" +
                                    "<div class=\"pic mr12\">" +
                                    "<img src=\"" + res.data.data.list[i].sImgUrl + "\">" +
                                    flayTypeHtml +
                                    "</div>" +
                                    "<div class=\"wrap\">" +
                                    "<div class=\"house_name mtb3\">" +
                                    "<span class=\"name\">" + res.data.data.list[i].sName + "</span>" +
                                    gradeHtml +
                                    "</div>" +
                                    "<div class=\"house_txt\">" + res.data.data.list[i].sRegion + "</div>" +
                                    "<div class=\"house_txt house_txt1\">" + advHtml + "</div>" +
                                    "<div class=\"house_txt house_txt2\">" +
                                    "<span class=\"key_txt\">" + res.data.data.list[i].sPrice + "</span>" + res.data.data.list[i].sUnit + "" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>" +
                                    "</a>";
                        }
                        $("#mainsection").append(html);
                        xfsearchobj.ajaxstatus = true;
                    } else {
                        $("#overnotload").val("0");
                    }
                },
                error: function (res) {
                    console.dir(res);
                }
            })
        },
        fliterSelect: function () {
            var htname = $(this).children().eq(0).html();
            var changeid = $(this).parent().data("flag");
            $("#" + changeid).children().eq(0).html(htname);
            if ($("#" + changeid).children().eq(1).hasClass("up") && $("#" + changeid).children().eq(0).hasClass("current")) {
                $("#" + changeid).children().eq(1).addClass("down").removeClass("up");
                $("#" + changeid).children().eq(0).removeClass("current");
            }
            //$("#" + changeid).children().eq(1).hide();
            $(this).addClass("current").siblings().removeClass("current");
            $(this).children().eq(0).addClass("current");
            $(this).siblings().each(function () {
                $(this).children().eq(0).removeClass("current");
            })
            $(this).parent().hide();
            $('body').css("overflow", "scroll");
            $("#BgDiv").hide();

            $(".swiper-slide").siblings().removeClass("current");
            xfsearchobj.loadData();
        },
        loadData: function () {
            var iRegionID = $.trim($(".choice_wrap .region li.current").attr("regionid")) || 0;
            var iPriceID = $.trim($(".choice_wrap .price li.current").attr("priceid")) || 0;
            var iLayoutID = $.trim($(".choice_wrap .family li.current").attr("layoutid")) || 0;
            var iFeatureID = $.trim($(".swiper-slide.current").attr("featureid")) || "";
            var sKeyword = $.trim($("#searchinput").val()) || "";
            if (iFeatureID) {
                iRegionID = 0;
                iPriceID = 0;
                iLayoutID = 0;
                sKeyword = '';
            }

            window.location = "/?iRegionID=" + iRegionID + "&iPriceID=" + iPriceID + "&iLayoutID=" + iLayoutID + "&sKeyword=" + sKeyword + "&iFeatureID=" + iFeatureID;//跳转地址
        }

    }
});