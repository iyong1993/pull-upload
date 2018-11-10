/**
 *
 *
 * @author LiYong
 */

    //初始数据请求
    var opt_brok = {
        wrap: '.J_wrap-list',
        scroll_wrap: '.J_scroll',
        tpl_class: 'J_tpl',
        tpl_wrap: '.J_wrap-list',
        ajax_url: 'https://api.avatardata.cn/MingRenMingYan/LookUp', //处理页面的路径
        ajax_data: {
            key:'2077916684574919a342f295198ae31b',
            page:'0',
            rows:'15',
            keyword: '快乐'
        }
    };

   run_slide_up(opt_brok);