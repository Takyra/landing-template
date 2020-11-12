(() => {
    let header     = $('.header'),
        navigation = $('.navigation'),
        hh         = header.innerHeight(),
        wh         = $('.welcome').innerHeight(),
        hide       = 'navigation--hide',
        fixed      = 'navigation--fixed';

    scrollHandler();
    $(window).on('scroll', scrollHandler);
    $(window).on('resize', function() {
        hh = header.innerHeight();
        wh = $('.welcome').innerHeight();
    });

    function scrollHandler() {
        let top = $(window).scrollTop();

        if (top < hh) {
            navigation.removeClass(hide)
                      .removeClass(fixed);
        } else if (top > hh && top < wh) {
            navigation.addClass(hide);
        } else if (top > wh - hh) {
            navigation.removeClass(hide)
                      .addClass(fixed);
        }
    }
})();