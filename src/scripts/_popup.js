let button       = $('[data-popup-button]'),
    popupClass   = '[data-popup-window]',
    overlayClass = 'overlay',
    closeClass   = 'popup__close',
    openClass    = 'popup--show',
    zIndexCount  = 10;

button.on('click', openPopup);
$(document).on('click', `.${overlayClass}, .${closeClass}`, closePopup);

function closePopup() {
    let el = $(this),
        popup = (el.hasClass(overlayClass)) ? el.next(popupClass) : el.closest(popupClass),
        overlay = (el.hasClass(overlayClass)) ? el : el.closest(popupClass).prev('.' + overlayClass);

    zIndexCount = --zIndexCount;
    popup.removeClass(openClass);
    overlay.remove();
}

function openPopup(event, popupId) {
    let id = popupId || $(this).data('popup-button'),
        popup = $(`[data-popup-window="${id}"]`);

    if (!popup.hasClass(openClass)) {
        event.preventDefault();
        zIndexCount = ++zIndexCount;


        popup.addClass(openClass)
            .css('z-index', zIndexCount);

        $('<div>', {
            class: 'overlay overlay--popup',
            css: {
                zIndex: zIndexCount
            }
        }).insertBefore(popup);
    }
}