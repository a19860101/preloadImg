// 图片预加载插件,使用闭包隔离作用域
(function ($) {

    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, Preload.DEFAULTS, options);

        if (this.opts.order === 'order') {
            this._order();//有序加载执行 
        } else {
            this._unorder();//无序加载执行            
        }
    }
    Preload.DEFAULTS = {
        order: 'unorder', // 默认选择无序预加载
        each: null,   //每张图片加载完毕后执行
        all: null     //所有图片加载完毕后执行
    };
    //使用面向对象的方法，将方法挂载在原型上
    Preload.prototype._unorder = function () {//无序加载

        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {

            if (typeof src !== 'string') return;

            var imgObj = new Image();
            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);
                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
                // $progress.html(Math.round((count + 1) / len * 100) + '%');
            });
            imgObj.src = src;
        });
    },
    Preload.prototype._order = function () {//有序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        load();

        function load() {
            var imgObj = new Image();
            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);
                if (conut >= len) {
                    opts.all && opts.all();
                } else {
                    load();
                }
                count++;
            });
            imgObj.src = imgs[conut];
        }
    }
    //jQuery的两种方式添加方法
    // $.fn.extend -> $('#img').preload()
    // $.extend->$.preload()
    $.extend({
        preload: function (imgs, opts) {
            new Preload(imgs, opts);
        }
    });
})(jQuery);

