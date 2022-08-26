const slickEqualHeight = require('./modules/slickEqualHeight');

(function ($) {
    $(function() {
        'use strict';

        var dynamicImgs = projectPath + "img/";

        // Initialize Slick carousels
        const $slickContainers = $('.js-slick-container');
        $slickContainers.slick({
            dots: false,
            arrows: true,
            infinite: true,
            lazyLoad:'ondemand',
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: false,
            swipe: true,
            cssEase: 'linear',
            prevArrow: `<button type="button" class="carousel-arrow-prev">
                    <svg class="mel-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${dynamicImgs}melicon.svg#carousel_previous"></use>
                    </svg>
                </button>`,
            nextArrow: `<button type="button" class="carousel-arrow-next">
                    <svg class="mel-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${dynamicImgs}melicon.svg#carousel_next"></use>
                    </svg>
                </button>`,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });

        // Make all slides as tall as the tallest slide
        slickEqualHeight($slickContainers);
    });
})(jQuery);
