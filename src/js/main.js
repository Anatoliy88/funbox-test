/* global Share:false */

// @include('bowser.js')
// @include('share.js')

let $catalogItem = $('.catalog__item');
let $itemWrapper = $('.item__wrapper');
let $itemFooterLink = $('.item__footer-link a');

$(document).ready(function() {
	$catalogItem.each(function() {
		if ($(this).hasClass('disabled')) {
			let $itemTaste = $(this).find('.item__taste').text();

			$('.item__footer-disabled').text(`Печалька, ${$itemTaste} закончился.`);
		}
	});
});

$itemFooterLink.on('click', function () {
	$(this).parent().parent().parent().toggleClass('active');
});

$itemWrapper.on('click', function () {
	if ($(this).hasClass('disabled') === false) {
		$(this).parent().toggleClass('active');
	}
	if ($(this).parent().hasClass('hover') === true) {
		$(this).parent().removeClass('hover');
	}
});

$itemWrapper.on('mouseenter', function () {
	if ($(this).parent().hasClass('disabled') === false) {
		if ($(this).parent().hasClass('active') === true) {
			$(this).parent().addClass('hover');
		} else {
			$(this).parent().removeClass('hover');
		}
	}
});

$itemWrapper.on('mouseleave', function () {
	if ($(this).parent().hasClass('disabled') === false) {
		if ($(this).parent().hasClass('active') === true) {
			$(this).parent().removeClass('hover');
		} else {
			$(this).parent().removeClass('hover');
		}
	}
});

svg4everybody();

let $html = $(document.documentElement);
// let $body = $(document.body);

// Загрузка страницы

$(() => {
	AOS.init({
		duration: 900,
		once: true,
		disable: 'mobile',
	});
	$html.addClass('is-page-loaded');
});
