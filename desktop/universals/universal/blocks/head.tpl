<head>
    <title>{$title}</title>
    <meta charset="{$charset}">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="generator" content="{$generator}">
    <meta name="keywords" content="{$keywords}">
    <meta name="description" content="{$description}">
	<link rel="apple-touch-icon" sizes="180x180" href="{$theme}/assets/images/favicons/apple-touch-icon-180x180.png">
	<link rel="apple-touch-icon" sizes="152x152" href="{$theme}/assets/images/favicons/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="120x120" href="{$theme}/assets/images/favicons/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="76x76" href="{$theme}/assets/images/favicons/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="57x57" href="{$theme}/assets/images/favicons/apple-touch-icon-57x57.png">
	<link rel="icon" href="{$theme}/assets/images/favicons/favicon-32x32.png" sizes="32x32">
	<!-- Normalize.css for balanced cross-browser styling -->
	<link rel="stylesheet" href="{$theme}/assets/css/normalize.css">
	<!-- Global stylesheets -->
	<link rel="stylesheet" href="{$theme}/assets/css/font-awesome.css">
	<link href="{$theme}/assets/css/bootstrap.css" id="stylesheet" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{$theme}/assets/css/engine.css">
	<link rel="stylesheet" href="{$theme}/assets/js/vendor/swiper/swiper.css">
	<link rel="stylesheet" href="{$theme}/assets/js/vendor/swiper/swiper-bundle.css">
	<link href="{$theme}/assets/css/all.min.css" id="stylesheet" rel="stylesheet" type="text/css">
	<link href="{$theme}/assets/css/sidebar.css" id="stylesheet" rel="stylesheet" type="text/css">
	<!-- /global stylesheets -->

	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="{$theme}/assets/js/bootstrap/bootstrap.bundle.min.js"></script>
	<script src="{$theme}/assets/js/app.js"></script>
	<script src="{$theme}/assets/js/vendor/notifications/noty.min.js"></script>
	{if isset($homepage)}
	<script src="{$theme}/assets/js/vendor/swiper/swiper.js"></script>
	<script src="{$theme}/assets/js/vendor/swiper/swiper-bundle.js"></script>
	<script src="{$theme}/assets/js/vendor/swiper/swiper-element.js"></script>
	<script>
		document.addEventListener('DOMContentLoaded', function () {
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: {
					delay: 2500,
				},
				slidesPerView: 1,
				spaceBetween: 10,
				loop: true,
				loopedSlides: 5,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				breakpoints: {
					768: {
						slidesPerView: 5,
						spaceBetween: 10,
					},
					576: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
				},
			});
		});
	</script>
	{/if}
	<script src="{$theme}/assets/js/theme.js"></script>
	<script src="{$theme}/assets/js/custom.js"></script>
</head>