// eslint-disable-next-line no-unused-vars
let Share = {
	metaElements() {
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
			imageSrc: document.querySelector('link[rel="image_src"]') || {},
			/* eslint-enable object-curly-newline */
		};
	},
	metaData() {
		let metaElements = this.metaElements();

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
			imageSrc: metaElements.imageSrc.href || '',
		};
	},
	absUrl(url) {
		if (url.match(/^http[s]?:\/\//)) {
			return url;
		}

		if (url.match(new RegExp(`^${location.host}`))) {
			return `${location.protocol}//${url}`;
		}

		if (url.match(/^\/\//)) {
			return location.protocol + url;
		}

		return `${location.protocol}//${location.host}${url}`;
	},
	window(url) {
		return window.open(url, 'Поделиться', 'width=640,height=480,location=no,toolbar=no,menubar=no');
	},
	facebook(url, title, description, picture) {
		let meta = this.metaData();

		url = encodeURIComponent(this.absUrl(url || meta.ogUrl || meta.url));

		title = encodeURIComponent(title || meta.ogTitle || meta.title);
		description = encodeURIComponent(description || meta.ogDescription || meta.description);
		picture = encodeURIComponent(this.absUrl(picture || meta.ogImage));

		return this.window(`https://facebook.com/sharer/sharer.php?u=${url}&title=${title}&description=${description}&picture=${picture}`);
	},
	twitter(url, text) {
		let meta = this.metaData();

		url = encodeURIComponent(this.absUrl(url || meta.ogUrl || meta.url));
		text = encodeURIComponent(text || meta.twitterTitle || meta.ogTitle || meta.title);

		return this.window(`http://twitter.com/share?url=${url}&text=${text}`);
	},
	googlePlus(url) {
		let meta = this.metaData();

		url = encodeURIComponent(this.absUrl(url || meta.ogUrl || meta.url));

		return this.window(`https://plus.google.com/share?url=${url}`);
	},
	vk(url, title, description, image) {
		let meta = this.metaData();

		url = encodeURIComponent(this.absUrl(url || meta.ogUrl || meta.url));
		title = encodeURIComponent(title || meta.ogTitle || meta.title);
		description = encodeURIComponent(description || meta.ogDescription || meta.description);
		image = encodeURIComponent(this.absUrl(image || meta.imageSrc || meta.ogImage));

		return this.window(`https://vk.com/share.php?url=${url}&title=${title}&description=${description}&image=${image}`);
	},
};
