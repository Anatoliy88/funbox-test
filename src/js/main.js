/* global Share:false */

// @include('bowser.js')
// @include('share.js')

svg4everybody();

let $html = $(document.documentElement);
let $body = $(document.body);

// Загрузка страницы

$(() => {
	AOS.init({
		duration: 900,
		once: true,
		disable: 'mobile',
	});
	$html.addClass('is-page-loaded');
});
