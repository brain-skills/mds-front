<head>
    <title>{$title}</title>
    <meta charset="{$charset}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="generator" content="{$generator}">
    <meta name="keywords" content="{$keywords}">
    <meta name="description" content="{$description}">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="{$theme}/assets/images/favicons/apple-touch-icon-180x180.png">
    <link rel="apple-touch-icon" sizes="152x152" href="{$theme}/assets/images/favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="120x120" href="{$theme}/assets/images/favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="76x76" href="{$theme}/assets/images/favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="57x57" href="{$theme}/assets/images/favicons/apple-touch-icon-57x57.png">
    <link rel="icon" href="{$theme}/assets/images/favicons/favicon-32x32.png" sizes="32x32">

    <!-- Normalize CSS -->
    <link rel="stylesheet" href="{$theme}/assets/css/normalize.css">

    <!-- Bootstrap 4 & Font Awesome -->
    <link rel="stylesheet" href="{$theme}/assets/css/bootstrap.css">
    <link rel="stylesheet" href="{$theme}/assets/css/font-awesome.css">
    <link rel="stylesheet" href="{$theme}/assets/css/all.min.css">
    <link rel="stylesheet" href="{$theme}/assets/css/sidebar.css">
    <link rel="stylesheet" href="{$theme}/assets/css/engine.css">

    <!-- Summernote Lite -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/engine/editor/summernote/custom-summernote.css">

    <!-- Swiper CSS -->
    <link rel="stylesheet" href="{$stheme}/bundles/swiper/swiper.css">
    <link rel="stylesheet" href="{$stheme}/bundles/swiper/swiper-bundle.css">

    <!-- Custom access control CSS -->
    <link rel="stylesheet" href="{$stheme}/css/view-access-control.css">

    <!-- jQuery & Bootstrap Bundle -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{$theme}/assets/js/bootstrap/bootstrap.bundle.min.js"></script>

    {if isset($homepage)}
        <!-- Google reCAPTCHA -->
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        <!-- App scripts -->
        <script src="{$theme}/assets/js/app.js"></script>
        <script src="{$theme}/assets/js/vendor/notifications/noty.min.js"></script>

        <!-- Swiper JS -->
        <script src="{$stheme}/bundles/swiper/swiper.js"></script>
        <script src="{$stheme}/bundles/swiper/swiper-bundle.js"></script>
        <script src="{$stheme}/bundles/swiper/swiper-element.js"></script>

        {literal}
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var swiperSettings = [
                {selector: '.mySwiper1', slidesPerView: 1, loopedSlides: 3, breakpoints: {768: {slidesPerView: 3}, 576: {slidesPerView: 1}}},
                {selector: '.mySwiper2', slidesPerView: 1, loopedSlides: 2, breakpoints: {768: {slidesPerView: 2}, 576: {slidesPerView: 1}}},
                {selector: '.mySwiper3', slidesPerView: 2, loopedSlides: 2, breakpoints: {768: {slidesPerView: 2}, 576: {slidesPerView: 1}}}
            ];

            swiperSettings.forEach(function(s) {
                new Swiper(s.selector, {
                    slidesPerView: s.slidesPerView,
                    spaceBetween: 10,
                    loop: true,
                    loopedSlides: s.loopedSlides,
                    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                    pagination: { el: '.swiper-pagination', clickable: true },
                    breakpoints: s.breakpoints
                });
            });
        });
        </script>
        {/literal}
    {/if}

    <!-- Custom CSS -->
    <style>
        .swiper-button-prev,
        .swiper-button-next {
            position: absolute;
            z-index: 15;
        }
        .swiper-button-prev svg,
        .swiper-button-next svg {
            width: 10px;
        }
        .manage-buttons {
            position: relative !important;
        }
    </style>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.js"></script>
    <script src="{$stheme}/js/modules/view-access-control.js"></script>
    <script src="/engine/editor/summernote/modules_summernote.js"></script>
    <script src="{$theme}/assets/js/theme.js"></script>
    <script src="{$theme}/assets/js/custom.js"></script>
</head>