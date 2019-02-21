// 报告页配置文件
$(function() {
    window._config = {
        request_url: function() {
            var regProd = /^www.wanguoqiche.com/;
            var host = window.location.hostname;
            if (regProd.test(host)) {
                return '//api.wanguoqiche.com'; //生产
            } else if (window.location.href.indexOf('yougongTest') > -1) {
                return '//api.demo.com'; //测试
            }else{
               return '//devapi.demo.com'; //开发
            }
        }(),
    };
});