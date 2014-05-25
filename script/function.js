jQuery.noConflict();
(function($) {
	$(function() {
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
	});
})(jQuery);
