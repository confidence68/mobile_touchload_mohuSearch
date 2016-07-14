/**
 * author:haorooms
 * this is common text,by no use requirejs and us js globle rem.js
 * 
 * http://www.haorooms.com
 * 
 * write:2015.05.06 copyright:克而瑞
 */
requirejs.config({
    paths: {
        'jquery': 'jquery.min',
        'swiper': 'swiper.min',
        'webtouchcommon': 'webtouchcommon',
        'xfsearch': 'xfsearch',
    }
});

requirejs(['jquery', 'swiper', 'webtouchcommon', 'xfsearch'], function ($,Swiper,webtouchObj,xfsearchobj) {
   $(function () {
        $(window).scroll(xfsearchobj.initScroll);
        $(document).on("touchmove", $.proxy(xfsearchobj.initScroll, this));
        //canvas加载
        webtouchObj.canvasload("mainsection");

        //回到顶部
        $('#backtop').on("click", webtouchObj.backtoTopdh);

        $('#BgDiv').bind("touchmove", function (e) {
            e.preventDefault();
        });
        $("#BgDiv").on("click", webtouchObj.cancelSelect);
        var dwnum = parseInt($('#newhouseswip').find(".current").index());
        if (dwnum < 2) {
            dwnum = 0
        }
        //左右切换
        var swiper = new Swiper('#newhouseswip', {
            slidesPerView: 2.5,
            paginationClickable: true,
            spaceBetween: 12,
            initialSlide: dwnum,
            freeModeMomentum: false,
            freeMode: true
        });
        $(".newHosue_nav").on("click", "ul li", webtouchObj.topSelect);
        //$(".choice_wrap").on("click", webtouchObj.cancelSelect);
        $(".choice_wrap").on("click", "ul li", xfsearchobj.fliterSelect);
        $("#searchBtn").on("click", xfsearchobj.fliterSelect);
        $(".choice_wrap ul").bind("touchmove", function (e) {
            var ulheight = $(this).height();
            var scrollTop = $(this).scrollTop();
            var scrollheight = $(this)[0].scrollHeight;
            $(".choice_wrap").bind("touchstart", function (events) {
                startX = events.originalEvent.changedTouches[0].pageX,
                        startY = events.originalEvent.changedTouches[0].pageY;
            });
            if (ulheight + scrollTop + 20 >= scrollheight) {
                $(".choice_wrap").bind("touchmove", function (event) {
                    moveEndX = event.originalEvent.changedTouches[0].pageX,
                            moveEndY = event.originalEvent.changedTouches[0].pageY,
                            theX = moveEndX - startX,
                            theY = moveEndY - startY;
                    if (Math.abs(theY) > Math.abs(theX) && theY > 0) {
                        $(".choice_wrap").unbind("touchmove");
                    }
                    if (Math.abs(theY) > Math.abs(theX) && theY < 0) {
                        event.preventDefault();

                    }
                })
            }
        });

        $(".swiper-slide").on("click", function () {
            $(".swiper-slide").siblings().removeClass("current");
            $(this).addClass("current");
            xfsearchobj.loadData();
        });
        //得到焦点时地图变为确认
        $('.search_txt').on('focus', function () {
            $('.confirm').show();
            $('.map_search_icon').hide();
        });
        //点击确认之后，确认变为地图找房
        $('.confirm').on('click', function () {
            $('.confirm').hide();
            $('.map_search_icon').show();
        });
        $(".Gsearch").on("touchmove",function(e){
              e.preventDefault();
        });
        $("#searchShow").on("click",webtouchObj.showSearchHis);
        $("#closeGsearch").on("click",function(){
            $(".Gsearch").hide();
        });
        $("#newsearchBtn").on("click",webtouchObj.setHistoryData);
         document.getElementById('searchinput').addEventListener('input', webtouchObj.mohuSearchData); 
        $("#search_content").on("click","li",webtouchObj.setHistoryData);

    })

});