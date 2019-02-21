/**
 * jns app 交互API
 * author:liubf
 * createdTime:2018-04-17
 */
(function() {
    var u = navigator.userAgent;
    var verPhone = {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    };
    var iosAndJs = {
        /**
         * 从H5 webview返回APP
         * author:liubf
         * createdTime:2018-04-17
         */
        'back': function() {
            window.location = "objc://" + "doFunc" + "/" + "back";
        },
        /**
         * 调用APP拨打电话功能
         * author:liubf
         * createdTime:2018-04-17
         */
        'callphone': function(phone) {
            window.location = "objc://" + "doFunc" + "/" + "callphone/" + phone;
        },
        /**
         * 重新授权登录
         * author:liubf
         * createdTime:2018-04-17
         */
        'jumpLogin': function() {
            window.location = "objc://" + "doFunc" + "/" + "relogin";
        },
        /**
         * 跳APP页面
         * author:liubf
         * createdTime:2018-04-17
         * type:
         * 0-返回列表  1-未处理工单  2-未完成工单  3-历史工单  4-未处理订单  
         * 5-历史订单  6-二手车检测列表  7-延保单管理
         */
        'jumpPage': function(type) {
            switch (type) {
                case '0':
                    window.location = "objc://" + "doFunc" + "/" + "orderList";
                    break;
                case '1':
                    window.location = "objc://" + "doFunc" + "/" + "unprocessedWorkOrder";
                    break;
                case '2':
                    window.location = "objc://" + "doFunc" + "/" + "unfinishedWorkOrder";
                    break;
                case '3':
                    window.location = "objc://" + "doFunc" + "/" + "historicalWorkOrder";
                    break;
                case '4':
                    window.location = "objc://" + "doFunc" + "/" + "unprocessedOrder";
                    break;
                case '5':
                    window.location = "objc://" + "doFunc" + "/" + "historyOrder";
                    break;
                case '6':
                    window.location = "objc://" + "doFunc" + "/" + "UsedCarCheck";
                    break;
                case '7':
                    window.location = "objc://" + "doFunc" + "/" + "InsuranceOrder";
                    break;
            }
        },
        /**
         * 调用摄像头扫描VIN号
         * author:liubf
         * createdTime:2018-04-17
         * 参数 callback带两个参数  callback(vin,imgUrl)
         */
        'vinScanning': function(callback) {
            window.location = "objc://" + "doFunc" + "/" + "vin";
            window.ios_vin = callback;
        },
        /**
         * 调用分享功能
         * author:liubf
         * createdTime:2018-04-17
         * o : {
         *     shareUrl : '',   //分享url
         *     title : '',  //分享标题
         *     subtitle : '',   //分享副标题
         *     logo : ''    //分享图标地址
         * }
         */
        'share': function(o) {
            window.location = "objc://" + "doFunc" + "/" + "share/" + o.shareUrl + "," + o.title + "," + o.subtitle + "," + o.logo;
        }
    };
    var androidAndJs = {
        /**
         * 从H5 webview返回APP
         * author:liubf
         * createdTime:2018-04-17
         */
        'back': function() {
            android.orderlist('back');
        },
        /**
         * 调用APP拨打电话功能
         * author:liubf
         * createdTime:2018-04-17
         */
        'callphone': function(phone) {
            android.orderlist('callphone', phone);
        },
        /**
         * 重新授权登录
         * author:liubf
         * createdTime:2018-04-17
         */
        'jumpLogin': function() {
            android.orderlist('login');
        },
        /**
         * 跳APP页面
         * author:liubf
         * createdTime:2018-04-17
         * type:
         * 0-返回列表  1-未处理工单  2-未完成工单  3-历史工单  4-未处理订单  
         * 5-历史订单  6-二手车检测列表  7-延保单管理
         */
        'jumpPage': function(type) {
            switch (type) {
                case '0':
                    android.orderlist('order_list');
                    break;
                case '1':
                    android.orderlist('unprocessedWorkOrder');
                    break;
                case '2':
                    android.orderlist('unfinishedWorkOrder');
                    break;
                case '3':
                    android.orderlist('historicalWorkOrder');
                    break;
                case '4':
                    android.orderlist('unprocessedOrder');
                    break;
                case '5':
                    android.orderlist('historyOrder');
                    break;
                case '6':
                    android.orderlist('UsedCarCheck');
                    break;
                case '7':
                    android.orderlist('InsuranceOrder');
                    break;
            }
        },
        /**
         * 调用摄像头扫描VIN号
         * author:liubf
         * createdTime:2018-04-17
         * 参数 callback带两个参数  callback(vin,imgUrl)
         */
        'vinScanning': function(callback) {
            android.orderlist('vin');
            window.and_vin = callback;
        },
        /**
         * 调用分享功能
         * author:liubf
         * createdTime:2018-04-17
         * o : {
         *     shareUrl : '',   //分享url
         *     title : '',  //分享标题
         *     subtitle : '',   //分享副标题
         *     logo : ''    //分享图标地址
         * }
         */
        'share': function(o) {
            android.orderlist('share', o.shareUrl, o.title, o.subtitle, o.logo);
        }
    };
    window.jnsApi = verPhone.ios ? iosAndJs : androidAndJs;
})(window);
