(() => {
    const header       = $('.header'),
          menu         = $('.navigation'),
          overlayClass = '.overlay--header',
          openClass    = 'navigation--show',
          closeClasses = `.navigation__close, .scroll, [data-popup-button], ${overlayClass}`;

    $('.header__menu').on('click', menuOpen);

    resizeHandler();
    $(window).on('resize', resizeHandler);

    function resizeHandler() {
        $('html, body').css('overflow', '');
        $(overlayClass).remove();
        menu.removeClass(openClass);
    }

    function menuOpen() {
        const overlay = '<div class="overlay overlay--header"></div>';

        $('html, body').css('overflow', 'hidden');
        menu.toggleClass(openClass);

        ($(overlayClass).length) ? $(overlayClass).remove() : header.append(overlay);

        $(document).on('click', closeClasses, function () {
            $('html, body').css('overflow', '');
            menu.removeClass(openClass);
            header.find(overlayClass).remove();
        });
    }
})();