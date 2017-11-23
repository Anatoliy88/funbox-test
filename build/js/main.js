'use strict';

/* global Share:false */

(function() {
	var iterate = function iterate(items, callback) {
		items.forEach(function(item) {
			var key = void 0;
			var value = void 0;

			if (typeof item === 'string') {
				key = item;
				value = item;
			} else {
				key = item[0];
				value = item[1];
			}

			callback(key, value);
		});
	};

	var check = function check(category, items) {
		iterate(items, function(key, value) {
			if (bowser[key]) {
				$(document.documentElement).addClass('is-' + category + '-' + value);
			}
		});
	};

	check('engine', ['webkit', 'blink', 'gecko', ['msie', 'ie'],
		['msedge', 'edge']
	]);

	check('device', ['mobile', 'tablet']);

	check('browser', ['chrome', 'firefox', ['msie', 'ie'],
		['msedge', 'edge'], 'safari', 'android', 'ios', 'opera', ['samsungBrowser', 'samsung'], 'phantom', 'blackberry', 'webos', 'silk', 'bada', 'tizen', 'seamonkey', 'sailfish', 'ucbrowser', 'qupzilla', 'vivaldi', 'sleipnir', 'kMeleon'
	]);

	check('os', ['mac', 'windows', 'windowsphone', 'linux', 'chromeos', 'android', 'ios', 'iphone', 'ipad', 'ipod', 'blackberry', 'firefoxos', 'webos', 'bada', 'tizen', 'sailfish']);
})();

// eslint-disable-next-line no-unused-vars
var Share = {
	metaElements: function metaElements() {
		return {
			/* eslint-disable object-curly-newline */
			description: document.querySelector('meta[name="description"]') || {},
			ogType: document.querySelector('meta[name="og:type"]') || {},
			ogUrl: document.querySelector('meta[name="og:url"]') || {},
			ogTitle: document.querySelector('meta[name="og:title"]') || {},
			ogDescription: document.querySelector('meta[name="og:description"]') || {},
			ogImage: document.querySelector('meta[name="og:image"]') || {},
			ogLocale: document.querySelector('meta[name="og:locale"]') || {},
			twitterCard: document.querySelector('meta[name="twitter:card"]') || {},
			twitterTitle: document.querySelector('meta[name="twitter:title"]') || {},
			twitterDescription: document.querySelector('meta[name="twitter:description"]') || {},
			imageSrc: document.querySelector('link[rel="image_src"]') || {}
			/* eslint-enable object-curly-newline */
		};
	},
	metaData: function metaData() {
		var metaElements = this.metaElements();

		return {
			url: location.href,
			title: document.title,
			description: metaElements.description.content || '',
			ogType: metaElements.ogType.content || '',
			ogUrl: metaElements.ogUrl.content || '',
			ogTitle: metaElements.ogTitle.content || '',
			ogDescription: metaElements.ogDescription.content || '',
			ogImage: metaElements.ogImage.content || '',
			ogLocale: metaElements.ogLocale.content || '',
			twitterCard: metaElements.twitterCard.content || '',
			twitterTitle: metaElements.twitterTitle.content || '',
			twitterDescription: metaElements.twitterDescription.content || '',
			imageSrc: metaElements.imageSrc.href || ''
		};
	},
	absUrl: function absUrl(url) {
		if (url.match(/^http[s]?:\/\//)) {
			return url;
		}

		if (url.match(new RegExp('^' + location.host))) {
			return location.protocol + '//' + url;
		}

		if (url.match(/^\/\//)) {
			return location.protocol + url;
		}

		return location.protocol + '//' + location.host + url;
	},
	window: function(_window) {
		function window(_x) {
			return _window.apply(this, arguments);
		}

		window.toString = function() {
			return _window.toString();
		};

		return window;
	}(function(url) {
		return window.open(url, 'Поделиться', 'width=640,height=480,location=no,toolbar=no,menubar=no');
	}),
	facebook: function facebook(url, title, description, picture) {
		var meta = this.metaData();

		url = encodeURIComponent(this.absUrl(url || meta.ogUrl || meta.url));

		title = encodeURIComponent(title || meta.ogTitle || meta.title);
		description = encodeURIComponent(description || meta.ogDescription || meta.description);
		picture = encodeURIComponent(this.absUrl(picture || meta.ogImage));

		return this.window('https://facebook.com/sharer/sharer.php?u=' + url + '&title=' + title + '&description=' + description + '&picture=' + picture);
	},
	twitter: function twitter(url, text) {
		var meta = this.metaData();

		url = encodeURIComponent(this.absUrl(url || meta.ogUrl || meta.url));
		text = encodeURIComponent(text || meta.twitterTitle || meta.ogTitle || meta.title);

		return this.window('http://twitter.com/share?url=' + url + '&text=' + text);
	},
	googlePlus: function googlePlus(url) {
		var meta = this.metaData();

		url = encodeURIComponent(this.absUrl(url || meta.ogUrl || meta.url));

		return this.window('https://plus.google.com/share?url=' + url);
	},
	vk: function vk(url, title, description, image) {
		var meta = this.metaData();

		url = encodeURIComponent(this.absUrl(url || meta.ogUrl || meta.url));
		title = encodeURIComponent(title || meta.ogTitle || meta.title);
		description = encodeURIComponent(description || meta.ogDescription || meta.description);
		image = encodeURIComponent(this.absUrl(image || meta.imageSrc || meta.ogImage));

		return this.window('https://vk.com/share.php?url=' + url + '&title=' + title + '&description=' + description + '&image=' + image);
	}
};

var $catalogItem = $('.catalog__item');
var $itemWrapper = $('.item__wrapper');
var $itemFooterLink = $('.item__footer-link a');

$(document).ready(function() {
	$catalogItem.each(function() {
		if ($(this).hasClass('disabled')) {
			var $itemTaste = $(this).find('.item__taste').text();

			$('.item__footer-disabled').text('\u041F\u0435\u0447\u0430\u043B\u044C\u043A\u0430, ' + $itemTaste + ' \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0441\u044F.');
		}
	});
});

$itemFooterLink.on('click', function() {
	$(this).parent().parent().parent().toggleClass('active');
});

$itemWrapper.on('click', function() {
	if ($(this).hasClass('disabled') === false) {
		$(this).parent().toggleClass('active');
	}
	if ($(this).parent().hasClass('hover') === true) {
		$(this).parent().removeClass('hover');
	}
});

$itemWrapper.on('mouseenter', function() {
	if ($(this).parent().hasClass('disabled') === false) {
		if ($(this).parent().hasClass('active') === true) {
			$(this).parent().addClass('hover');
		} else {
			$(this).parent().removeClass('hover');
		}
	}
});

$itemWrapper.on('mouseleave', function() {
	if ($(this).parent().hasClass('disabled') === false) {
		if ($(this).parent().hasClass('active') === true) {
			$(this).parent().removeClass('hover');
		} else {
			$(this).parent().removeClass('hover');
		}
	}
});

svg4everybody();

var $html = $(document.documentElement);
// let $body = $(document.body);

// Загрузка страницы

$(function() {
	AOS.init({
		duration: 900,
		once: true,
		disable: 'mobile'
	});
	$html.addClass('is-page-loaded');
});

//# sourceMappingURL=main.js.map
