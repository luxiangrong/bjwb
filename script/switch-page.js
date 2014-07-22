(function($) {
	$(function() {
		//页面切换
		var linkStack = {
			'index.html' : {
				name : '首页',
				prev : 'list.html',
				next : 'index-part.html'
			},
			'list.html' : {
				name : '北京',
				prev : 'index-part.html',
				next : 'index.html'
			},
			'index-part.html' : {
				name : '新闻',
				prev : 'index.html',
				next : 'list.html'
			}
		};

		if(window.history.pushState) {

			var init = true, state = window.history.pushState !== undefined;

			//对ajax请求作出响应
			var handler = function(data) {
				$('.content-container').html($('.content-container', data).html());
				$.address.title(/>([^<]*)<\/title/.exec(data)[1]);
				//页面加载完成后，执行相应的js
				$.getScript('script/function.js');
			};

			$.address.state('/bjwb').init(function() {
				//初始化需要处理的链接
				$('.pre-page a').address(function() {
					$(".content").css('transform', 'translate3d(2000px, 0, 0)');
					$(".content").css('-moz-transform', 'translate3d(2000px, 0, 0)');
					$(".content").css('-webkit-transform', 'translate3d(2000px, 0, 0)');
					return $(this).attr('href');

				});
				$('.next-page a').address(function() {
					$(".content").css('transform', 'translate3d(-2000px, 0, 0)');
					$(".content").css('-moz-transform', 'translate3d(-2000px, 0, 0)');
					$(".content").css('-webkit-transform', 'translate3d(-2000px, 0, 0)');
					return $(this).attr('href');
				});

			}).change(function(event) {
				var path = event.path;
				var linkMap = linkStack[path.substring(1, path.length)];
				if(linkMap) {
					$('.pre-page a').attr('href', linkMap.prev);
					$('.pre-page a span').html(linkStack[linkMap.prev]['name']);
					$('.next-page a').attr('href', linkMap.next);
					$('.next-page a span').html(linkStack[linkMap.next]['name']);
				}
				if(state && init) {
					init = false;
				} else {
					$(".loading").show();
					// 异步加载页面
					window.setTimeout(function() {
						$.ajax({
							url : $.address.state() + event.path,
							dataType : 'html',
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								$(".loading").hide();
								handler(XMLHttpRequest.responseText);
							},
							success : function(data, textStatus, XMLHttpRequest) {
								$(".loading").hide();
								handler(data);
							}
						});
					}, 300);
				}

			});
			if(!state) {

			}
		}
	});
})(jQuery); 