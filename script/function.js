jQuery.noConflict();
(function($) {
	$(function() {
		//焦点新闻
		$(".hot-news .col-list li").on('mouseover', function(){
			var newsWidth = 620;
			var index = $(this).index();
			
			$(".hot-news .col-list li").removeClass('active');
			$(this).addClass('active');
			
			$(".hot-news").find('ul').animate({
				left: newsWidth * index * -1
			},{
			    duration: 500,
			    queue: false,
			    easing: 'easeInQuint'
			});
		});
		
		//杂志
		$(".row-magazine .content-body").find("ul").width($(".row-magazine .content-body").find("ul li").size() * $(".row-magazine .content-body").find("ul li").outerWidth(true));
		$(".row-magazine .content-body").mCustomScrollbar({
			 axis:"x"
		});
		
		//新闻tab
		var extraNews = {
			prev: function($parent){
				var current = $parent.data('index') == undefined ? 0 : parseInt($parent.data('index'));
				if(current <= 0) {
					current = $parent.find('li').length - 1;
				} else {
					current = current - 1;
				}
				var itemWidth = $parent.find('li').outerWidth(true);
				$parent.animate({
					left: itemWidth * current * -1
				},{
				    duration: 500,
				    queue: false,
				    easing: 'easeInQuint'
				});
				$parent.data('index', current);
			},
			next: function($parent){
				var current = $parent.data('index') == undefined ? 0 : parseInt($parent.data('index'));
				
				if(current >= $parent.find('li').length - 1) {
					current = 0;
				} else {
					current = current + 1;
				}
				
				var itemWidth = $parent.find('li').outerWidth(true);
				$parent.animate({
					left: itemWidth * current * -1
				},{
				    duration: 500,
				    queue: false,
				    easing: 'easeInQuint'
				});
				$parent.data('index', current);
			}
		};
		$(".news-extra-item a.btn-left").click(function(){
			extraNews.prev($(this).parent().find('ul'));
		});
		$(".news-extra-item a.btn-right").click(function(){
			extraNews.next($(this).parent().find('ul'));
		});
		$(".row-news-extra .content-head a").on('mouseover', function(){
			var $this = $(this);
			var target = $this.attr('data-target');
			var index = $("#" + target).index();
			var itemHeight = $(".row-news-extra .news-extra-item-wrap").find(".news-extra-item").outerHeight(true);
			$this.closest('ul').find('a').removeClass('active');
			$this.addClass('active');
			$(".row-news-extra .news-extra-item-wrap").animate({
				"margin-top":  itemHeight * index * -1
			},{
			    duration: 500,
			    queue: false,
			    easing: 'easeInQuint'
			});
		});
		
		//论坛
		$(document).ready(function(){
			var $container = $('#forum-masonry-container');
		    $container.masonry({
		      itemSelector: '.item',
		      columnWidth: 10
		    });
		    
		    var $container = $('#photograph-masonry-container');
		    $container.masonry({
		      itemSelector: '.item',
		      columnWidth: 10,
		      gutterWidth : 10
		    });
		    
		    var $container = $('#art-masonry-container');
		    $container.masonry({
		      itemSelector: '.item',
		      columnWidth: 10
		    });
		});
	});
})(jQuery);
