$(document).ready(function(){

	function leftToggle() {
		var left = $('.hide__block-left');

		if(left.hasClass('hid')) {
			left.removeClass('hid');
			left.addClass('actv');
			left.slideDown(1000);
		} else {
			left.slideUp(1000, function() {
				left.removeClass('actv');
				left.addClass('hid');
			});
		}
	}

	function rightToggle() {
		var right = $('.hide__block-right');

		if(right.hasClass('hid')) {
			right.removeClass('hid');
			right.addClass('actv');
			right.slideDown(1000);
		} else {
			right.slideUp(1000, function() {
				right.removeClass('actv');
				right.addClass('hid');
			});
		}
	}

	$('.btn-left').on('click', function() {
		var right = $('.hide__block-right');
		var left = $('.hide__block-left');
		if(right.hasClass('actv')){
			right.slideUp(1000, function() {
				right.removeClass('actv');
				right.addClass('hid');
			});
			setTimeout(function(){
				leftToggle();
			},1100);
		} else {
			leftToggle();
		}

	});

	$('.btn-right').on('click', function() {
		var right = $('.hide__block-right');
		var left = $('.hide__block-left');
		if(left.hasClass('actv')){
			left.slideUp(1000, function() {
				left.removeClass('actv');
				left.addClass('hid');
			});
			setTimeout(function(){
				rightToggle();
			},1100);
		} else {
			rightToggle();
		}
	});



	$('.slider-partners').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		draggable: false,
		dots: false,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
					settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

});