/**
 * Created by Administrator on 2017/3/7 0007.
 */

$(function(){
    /*1.设置吸顶效果 */
    var nav_top= $('.nav').offset().top;
    $(window).on('scroll',function(){
        var myScroll= $(window).scrollTop();
        if(myScroll >= nav_top){
            $('.nav_left').css({opacity:1});
            /*nav_left还要占位置,因此不能用display: none 和fade()*/
            $('.nav').css({position:'fixed',top:0});
            $('.rocket').fadeIn();
        }else{
            $('.nav_left').css({opacity:0});
            $('.nav').css({position:'static'});
            $('.rocket').fadeOut();
        }
    });
    /*2.设置点击火箭返回顶部*/
    $('.rocket').click(function(){
        $('html,body').animate({scrollTop:0},500);
    });

    /*3.添加li标签
    * 首先清除默认行为*/
    $('input[type="submit"]').on('click',function(event){
            event.preventDefault();
    });
    $('input[type="submit"]').click(function(){
        var myContent = $('.nav input:first').val();
        if($.trim(myContent)==''){
            alert('请输入内容');
            return;
        }else{
            var tag= $('<li>'+
                '<input type="checkbox">'+
                '<span>'+myContent+'</span>'+
                '<span class="detail">详情</span>'+
                '<span class="del">删除</span>'+
                '</li>');
            $('.task').prepend(tag);

        }
    })

});