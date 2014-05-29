//jQuery.noConflict();
(function($) {
	$(function() {
		//焦点新闻
		$(".hot-news .col-list li").on('mouseover', function() {
			var newsWidth = 450;
			var index = $(this).index();

			$(".hot-news .col-list li").removeClass('active');
			$(this).addClass('active');

			$(".hot-news").find('ul').animate({
				left : newsWidth * index * -1
			}, {
				duration : 500,
				queue : false,
				easing : 'easeInQuint'
			});
		});

		//杂志
		$(".row-magazine .content-body").find("ul").width($(".row-magazine .content-body").find("ul li").size() * $(".row-magazine .content-body").find("ul li").outerWidth(true));
		$(".row-magazine .content-body").mCustomScrollbar({
			axis : "x"
		});

		//新闻tab
		var extraNews = {
			prev : function($parent) {
				var current = $parent.data('index') == undefined ? 0 : parseInt($parent.data('index'));
				if (current <= 0) {
					current = $parent.find('li').length - 1;
				} else {
					current = current - 1;
				}
				var itemWidth = $parent.find('li').outerWidth(true);
				$parent.animate({
					left : itemWidth * current * -1
				}, {
					duration : 500,
					queue : false,
					easing : 'easeInQuint'
				});
				$parent.data('index', current);
			},
			next : function($parent) {
				var current = $parent.data('index') == undefined ? 0 : parseInt($parent.data('index'));

				if (current >= $parent.find('li').length - 1) {
					current = 0;
				} else {
					current = current + 1;
				}

				var itemWidth = $parent.find('li').outerWidth(true);
				$parent.animate({
					left : itemWidth * current * -1
				}, {
					duration : 500,
					queue : false,
					easing : 'easeInQuint'
				});
				$parent.data('index', current);
			}
		};
		$(".news-extra-item a.btn-left").click(function() {
			extraNews.prev($(this).parent().find('ul'));
		});
		$(".news-extra-item a.btn-right").click(function() {
			extraNews.next($(this).parent().find('ul'));
		});
		$(".row-news-extra .content-head a").on('mouseover', function() {
			var $this = $(this);
			var target = $this.attr('data-target');
			var index = $("#" + target).index();
			var itemHeight = $(".row-news-extra .news-extra-item-wrap").find(".news-extra-item").outerHeight(true);
			$this.closest('ul').find('a').removeClass('active');
			$this.addClass('active');
			$(".row-news-extra .news-extra-item-wrap").animate({
				"margin-top" : itemHeight * index * -1
			}, {
				duration : 500,
				queue : false,
				easing : 'easeInQuint'
			});
		});

		//论坛
		$(document).ready(function() {
			var $container = $('#forum-masonry-container');
			$container.masonry({
				itemSelector : '.item',
				columnWidth : 10
			});

			var $container = $('#photograph-masonry-container');
			$container.masonry({
				itemSelector : '.item',
				gutterWidth : 6
			});

			var $container = $('#art-masonry-container');
			$container.masonry({
				itemSelector : '.item',
				columnWidth : 10
			});
		});

		//侧边栏 选项卡
		var mySwiper1 = new Swiper('#swiper-container-1', {
			mode : 'horizontal',
			loop : true,
			pagination : '#swiper-container-1 .pagination',
			paginationClickable : true,
			calculateHeight : true,
			loop : true,
			autoplay : 5000
		});
		var mySwiper2 = new Swiper('#swiper-container-2', {
			mode : 'horizontal',
			loop : true,
			pagination : '#swiper-container-2 .pagination',
			paginationClickable : true,
			calculateHeight : true,
			loop : true,
			autoplay : 5000
		});
		$(".tabs a").on("mouseover", function() {
			var index = $(this).closest('li').index();
			var divs = $(this).closest('.tabs').find(".tab-item");
			$(this).closest('ul').find('a').removeClass('active');
			$(this).addClass('active');
			divs.hide();
			divs.eq(index).show();
		});
		$(".tabs a").eq(0).trigger('mouseover');

		//媒体链接
		var medialink = {
			prev : function($parent) {
				var current = $parent.data('index') == undefined ? 0 : parseInt($parent.data('index'));
				if (current <= 0) {
					current = $parent.find('li').length - 1;
				} else {
					current = current - 1;
				}
				var itemWidth = $parent.find('li').outerWidth(true);
				$parent.animate({
					"margin-left" : itemWidth * current * -1
				}, {
					duration : 500,
					queue : false,
					easing : 'easeInQuint'
				});
				$parent.data('index', current);
			},
			next : function($parent) {
				var current = $parent.data('index') == undefined ? 0 : parseInt($parent.data('index'));

				if (current >= $parent.find('li').length - 1) {
					current = 0;
				} else {
					current = current + 1;
				}

				var itemWidth = $parent.find('li').outerWidth(true);
				$parent.animate({
					"margin-left" : itemWidth * current * -1
				}, {
					duration : 500,
					queue : false,
					easing : 'easeInQuint'
				});
				$parent.data('index', current);
			}
		};
		$(".media-link a.btn-left").click(function() {
			medialink.prev($(this).parent().find('ul'));
		});
		$(".media-link a.btn-right").click(function() {
			medialink.next($(this).parent().find('ul'));
		});

		//大家都在看
		var swiperEveryBody = new Swiper('#swiper-container-everybody', {
			pagination : '#swiper-container-everybody .pagination',
			paginationClickable : true,
			slidesPerView : 3,
			calculateHeight : true,
			loop : false
		});
		var swiperEveryOne = new Swiper('#swiper-container-everyone', {
			pagination : '#swiper-container-everyone .pagination',
			paginationClickable : true,
			slidesPerView : 3,
			calculateHeight : true,
			loop : false
		});

		//
		$(document).ready(function() {
			if ($(".galleria").length) {
				Galleria.loadTheme('script/galleria/themes/classic/galleria.classic.min.js');
				Galleria.run('.galleria', {
					height : 700,
					imagePosition : "top"
				});
			}
		});

		if (window.history.pushState) {

			var init = true, state = window.history.pushState !== undefined;

			// Handles response
			var handler = function(data) {
				$('.content').html($('.content', data).html());
				$.address.title(/>([^<]*)<\/title/.exec(data)[1]);
			};

			$.address.state('/bjwb').init(function() {
				$('.next-page a,.pre-page a').address();

			}).change(function(event) {
				// Selects the proper navigation link
				$('.pre-page a, .next-page a').each(function() {
					if ($(this).attr('href') == ($.address.state() + event.path)) {
						$(this).addClass('selected').focus();
					} else {
						$(this).removeClass('selected');
					}
				});

				if (state && init) {
					init = false;
				} else {
					// Loads the page content and inserts it into the content area
					$.ajax({
						url : $.address.state() + event.path,
						dataType : 'html',
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							handler(XMLHttpRequest.responseText);
						},
						success : function(data, textStatus, XMLHttpRequest) {
							handler(data);
							$.getScript('script/function.js');
						}
					});
				}

			});
			if (!state) {
				// Hides the page during initialization
			}
		}
	});
})(jQuery);
