$(function () {
	window._c = { //公共方法库
		/*
		 *获取url参数
		 */
		getQueryString : function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		},
		/*
		 *post请求
		 *parame{
		 *	url:请求路径		必填
		 *	data:请求参数		非必填
		 *	callback:返回数据回调函数	非必填
		 *	loading:是否loading
		 *	async：请求方式
		 *}
		 */
		post : function (url, data, callback, loading, async,is) {
			if (!loading) {
				_c.showLoading();
			}
			// data.JsessionID = sessionId;
			$.ajax({
				type : 'post',
				data : data,
				async : async ? async : true,
				url : window._config.request_url + url,
				success : function (json) {
					if(json.code==40300){
						$("#app>div.header").siblings().remove();
						$(".header_right,.c_layer").hide();
						$('#app').append('<div style="text-align: center;padding-top: 10px;font-size: 14px;">您暂无权限，请联系站点管理员!</div>');
						return false;
					}else if(json.code==40100){
						jnsApi.jumpLogin();
					}
					setTimeout(function() {
                        if (!loading) {
                            _c.hideLoading();
                        }
                        callback(json);
                    }, 200);
				},
				error : function () {
					if(is){return false}
					_c.showLayer("网络异常，请重试");
				}
			});
		},
		goBackClick: function (status) {//返回ios或者Android
			var clicked=true;
			if(status == 'ios') {
				window.location="objc://"+"doFunc"+"/"+"back";
			} else if (status == 'android') {
				android.orderlist('back');
			}
		},
		/*
		 *loading框
		 */
		showLoading : function () {
			app.c_layerInit();
			$(".c_layer .c_layer_con").css("backgroundColor", "transparent");
			$(".c_layer .c_layer_con").html('<span class="loading"></span>');
			$(".c_layer").show();
		},
		/*
		 *文案提示框
		 *parame{
		 *	text:提示文案		必填
		 *	url:提示后跳转路径		非必填
		 *	time:提示显示时间,默认2000毫秒		非必填
		 *	callback:提示后回调函数	非必填
		 *}
		 */
		showLayer : function (text, url, time, callback) {
			app.c_layerInit();
			$(".c_layer .c_layer_con").css("backgroundColor", "#fff").addClass("shrink");
			$(".c_layer .c_layer_con").html(text);
			$(".c_layer").show();
			setTimeout(function () {
				$(".c_layer .shrink").removeClass("shrink");
			}, 50);
			setTimeout(function () {
				if (url) {
					location.href = url;
				}
				if (callback) {
					callback()
				}
				_c.hideLoading();
			}, time ? time : 2000);
		},
		/*
		 *隐藏弹窗
		 */
		hideLoading : function () {
			$(".c_layer").hide();
		},
		//调用打电话功能 phone是电话号码例如：02088812345/13420192888
	    callphone:function(status,phone){
	        if (status == 'ios') {
	        	window.location.href='tel:'+phone;
	            //window.location = "objc://" + "doFunc" + "/" + "callphone/" + phone ;
	        } else if (status == 'android') {
	            android.orderlist('callphone', phone);
	        }
	    }
	};
	var app = {
		init : function () {
			$("title").html('优供');
			app.bind();
			if (_c.getQueryString('s')) {
				sessionStorage.setItem('sessionId', _c.getQueryString('s'));
			}
		},
		bind : function () {
			//禁止特殊字符
			$(".inputChar").bind("input propertychange keyup",function(){
				$(this).val($(this).val().replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g,''));
			});
		},
		c_layerInit : function () {
			if ($(".c_layer").length == 0) {
				$("body").append('<section class="c_layer"><section class="c_layer_con"></section></section>');
			}
		},
	}
	app.init();
});
