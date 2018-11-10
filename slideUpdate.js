/**
 * 上拉加载
 *
 * @author LiYong
 */

    var slide_up = function (opt) {
        this.wrap_all = opt.wrap || '.J_all';
        this.scroll_wrap_all = opt.scroll_wrap || '.J_scroll';
        this.formData = opt.ajax_data;
        this.url = opt.ajax_url;
        this.tpl = opt.tpl_class;
        this.tpl_wrap = opt.tpl_wrap;
        this.now_page = opt.ajax_data.page;
    }


    // 初始化
    slide_up.prototype.init = function () {
        var that = this;
        console.log(that);
        that.runAjax();
        $('' + that.wrap_all + '').bind("scroll", function () {

            if ($(this).data('ifupdate')) {
                var viewHeight = $(this).height();//可见高度
                var contentHeight = $('' + that.scroll_wrap_all + '').outerHeight();//内容高度
                var scrollHeight = $(this).scrollTop();//滚动高度
                if (contentHeight - viewHeight < scrollHeight+10) {
                    $('' + that.wrap_all + '').data('ifupdate',false);
                    var load_div = $('<div class="dropload-load" style="display: block;"><span class="loading"></span>加载中...</div>');
                    $('' + that.scroll_wrap_all + '').append(load_div);
                    setTimeout(function () {
                        that.runAjax();
                    },500);
                }
            }
        });
    }

    //数据未加载完，再次滑动到底部再次加载
    slide_up.prototype.destory = function () {
        var that = this;
        $('' + that.scroll_wrap_all + '').find('.dropload-load').remove();
        $('' + that.wrap_all + '').data('ifupdate',true);
    };

    //数据全部加载完
    slide_up.prototype.data_all = function () {
        $('.dropload-load').text('无更多数据');
    };

    //请求数据接口
    slide_up.prototype.runAjax = function () {
        var that = this;
        that.now_page++;
        that.formData.page = that.now_page;
        $.ajax({
            url: that.url,
            type: 'POST',
            dataType: 'JSON',
            data: that.formData,
            success: function (data) {
                if(data.error_code==0){
                    var dataArr = data;
                    var html = template('' + that.tpl + '', dataArr);
                    $('' + that.scroll_wrap_all + '').append(html);
                    if(dataArr.length==0){
                        that.data_all();
                    }else{
                        that.destory();
                    }
                    if(dataArr.result.length==0&&that.now_page==1){
                        var noDataHtml = $('<div class="no-data-wrap"><p>暂无数据</p></div>');
                        $('' + that.tpl_wrap + '').append(noDataHtml);
                    }
                }else{
                    alert('系统错误，亲稍后再试');
                }
            },
            error: function (e) {
                alert('系统错误，亲稍后再试');
            }
        })
    };

    var run_slide_up = function (opt) {
        var page = new slide_up(opt);
        page.init();
    };


