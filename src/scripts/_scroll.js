(() => {
    $('a.scroll').on('click', function(event) {
        const el     = $(this),
              href   = el.attr('href'),
              anchor = href.split('')[0] == '#' ? true : false;

        if (anchor) {
            event.preventDefault();
            scroll(href);
        }
    });

    function scroll(item) {
        const header       = $('header'),
              headerHeight = header.innerHeight(),
              itemTop      = (item != '#up') ? $(item).offset().top : 0,
              scrollTo     = itemTop - headerHeight;

        $('html, body').animate({
            scrollTop: scrollTo
        }, 500);
    }
})();