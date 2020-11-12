const sliderOne = $('.slider-one');

/* Before init slider

Events:
init         - Fires after first initialization
beforeChange - Fires before slide change
afterChange  - Fires after slide change

*/

sliderOne.on('init', function(slick) {
    // console.log('init', slick);
});

$('.button').on("click", function() {
    // slickGoTo
    // slickNext
    // slickPrev
    sliderOne.slick('slickGoTo', 1); // 1 - index
});

/* Init slider */
sliderOne.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slider-arrow slider-arrow--prev"></button>',
    nextArrow: '<button type="button" class="slider-arrow slider-arrow--next"></button>',
    appendArrows: $('.arrows-container'),
    dots: true,
    dotsClass: 'slider-dots',
    appendDots: $('.dots-container'),
    fade: false,
    draggable: false,
    asNavFor: '.slider-two',
    responsive: [{
        breakpoint: 1367,
        settings: {slidesToShow: 4}
    },{
        breakpoint: 1025,
        settings: {slidesToShow: 3}
    },{
        breakpoint: 769,
        settings: {slidesToShow: 2}
    }, {
        breakpoint: 461,
        settings: {slidesToShow: 1}
    }]
});

/*
$('.slider-two').slick({
    ...
    asNavFor: '.slider-one'
});
*/