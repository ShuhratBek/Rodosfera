//input mask
jQuery(function($){
$('input[type="tel"]').mask('+7(999) 999-99-99');
});

//validator
$.validate({
  validateOnBlur : false,
  showHelpOnFocus : false
});

//CSS ANIMATION

$(window).scroll(function() {
var windowHeight = jQuery(window).height();
		$('.title').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+windowHeight-100) {
				$(this).addClass("animated bounceInRight");
			}
		});

		$('.toleft').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+windowHeight-100) {
				$(this).addClass("animated fadeInLeft");
			}
		});

		$('.toright').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+windowHeight-100) {
				$(this).addClass("animated fadeInRight");
			}
		});

		$('.todown').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+windowHeight-100) {
				$(this).addClass("animated fadeInDown");
			}
		});

		$('.toup').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+windowHeight-150) {
				$(this).addClass("animated bounceInUp");
			}
		});

		$('.bounceinblock').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+windowHeight-200) {
				$(this).addClass("animated bounceIn");
			}
		});

		$('.torightbig').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+windowHeight-150) {
				$(this).addClass("animated fadeInRightBig");
			}
		});
	});

	$(document).ready(function() {
    $('img.logo').hover(
     function() {
      $(this).addClass('animated bounceIn'); // Добавляем класс bounce
     },
     function() {
      $(this).removeClass('animated bounceIn'); // Убираем класс
     }
    )})
	
//PARALLAX

$(document).ready(function(){
	//$('#nav').localScroll(800);
	
	RepositionNav();
	
	$(window).resize(function(){
		RepositionNav();
	});	
	
	//.parallax(xPosition, adjuster, inertia, outerHeight) options:
	//xPosition - Horizontal position of the element
	//adjuster - y position to start from
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	$('.header').parallax("50%", 400, 0.5, true);
	//$('.info').parallax("50%", 400, 0.4, true);
    
    $('#myCarousel').carousel({
    	interval:   4000
	});
	
	var clickEvent = false;
	$('#myCarousel').on('click', '.nav-justified a', function() {
			clickEvent = true;
			$('.nav-justified li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.nav-justified').children().length -1;
			var current = $('.nav-justified li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.nav-justified li').first().addClass('active');
			}
		}
		clickEvent = false;
	});
})