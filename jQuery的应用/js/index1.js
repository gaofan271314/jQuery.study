/**
 * Created by Administrator on 2017/3/6.
 */
$(function () {
    /*一.设置吸顶效果*/
    /*1.0获取nav距离顶部的间距*/
    var off_top = $('.nav').offset().top;
  
    /*1.1监听滚动，设置对应的样式*/
    $(window).on('scroll',function () {
        /*1.2获取滚动的距离*/
        var scr_top = $(window).scrollTop();
      
        /*1.3判断比较设置样式*/
        if(scr_top>=off_top){
            $('.nav').css({
                'position':'fixed',
                'top':0,
                // 'box-shadow':'0 1px 3px rgab(0,0,0,0.4)'
            });
            /*1.31设置图片的透明度，让图片出来*/
            $('.nav img').css({
                'opacity':1
            })
        }else {
            $('.nav').css({
                'position':'absolute',
                top:off_top,
                
            });
            $('.nav img').css({
                'opacity':0
            })
        }
    })
    
    /*二.设置返回顶部*/
    $(window).on('scroll',function () {
        var scr_top = $(window).scrollTop();
        //2.1判断
        if(scr_top >=off_top ){
            $('.back_top').fadeIn(200);
        }else {
            $('.back_top').fadeOut(200);
        }
    })
    
    /*2.2点击back_top返回顶部*/
    $('.back_top').on('click',function () {
        //2.21让回到顶部
        $('html body').animate({
            scrollTop:0
        })
    })
    
    /*三.添加li*/
    /*3.0使用数组来记录事项*/
    var itemArray = [];
    $('input[type=submit]').on('click',function (event) {
        /*3.0去掉默认行为*/
        event.preventDefault();
        
        /*3.1获取input中内容，判断*/
        var inp_content = $('input[type=text]').val();
        if ($.trim(inp_content) == ''){
            alert('请输入内容');
            return;
            
        }else {
            /*3.2创建事项*/
            var item = {
                title:'',
                content:'',
                isCheck:false,
                remind_time:'',
                is_notice:false
            }
            
            /*3.2设置事项的相关属性*/
            item.title = inp_content;
            /*3.3添加到数组中中保存起来*/
            itemArray.push(item);
            
            /*3.4根据数组的个数，添加节点而且吧节点显示出来*/
            render_view();
            
            
        }
    })
    
    function render_view() {
        /*把上一次的内容清空*/
        $('.task').empty();
        /*3.41根据数组中的个数。来添加节点*/
        for(var i = 0;i < itemArray.length;i ++){
            var obj = itemArray[i];
            if (obj == undefined ||!obj){//为了规范和严格要进行元素的判定
                continue;
                
            }
            /*3.42创建li*/
            // data-index:用来给li绑定索引
            var tag = '<li data-index='+ i +' >'+
                '<input type="checkbox" >'+
                '<span class="item_title">'+ obj.title +' </span>'+
                '<span class="del">删除</span>'+
                '<span class="detail">详情</span>'+
                '</li>';
            
            /*3.43添加li*/
            $('.task').prepend(tag);
          
        }
        
        
    }
    
    /*四.切换tab*/
    /*4.1点击li切换tab*/
    $('.header li').click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        
        /*4.2获取点击的索引值*/
        var index = $(this).index();
        /*4.3切换下面的div*/
        $('.body').eq(index).addClass('active').siblings().removeClass('active');
    });
    /*五，点击删除按钮删除对应的li*/
    $('body').on('click','.del',function () {
        /*5.1获取del所在的li*/
       var item = $(this).parent();
        /*5.2获取li对应的索引值*/
        var index = item.data('index');

        /*5.3为了代码严格，我们可以回索引进行判断*/
        if (index == undefined || !itemArray[index])return;
        /*5.4删除数组中的元素*/
        delete itemArray[index];
        /*5.5删除节点*/
        item.slideUp(200,function () {
            item.remove();
        })

    })
    
})