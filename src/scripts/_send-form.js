(() => {
    let popup        = $('[data-popup-window="event"]'),
        popupMessage = popup.find('.popup__title'),
        values       = {};

    $('[type="submit"]').on('click', e => {
        e.preventDefault();

        values.form        = $(e.target).closest('form');
        values.formName    = values.form.data('form-type');
        values.inpName     = values.form.find('[name="name"]');
        values.valName     = values.inpName.val();
        values.inpPhone    = values.form.find('[name="phone"]');
        values.valPhone    = values.inpPhone.val();
        values.inpEmail    = values.form.find('[name="email"]');
        values.valEmail    = values.inpEmail.val();
        values.inpMessage  = values.form.find('[name="message"]');
        values.valMessage  = values.inpMessage.val();
        values.textMessage = 'Спасибо за заявку!<br> В ближайшее время с Вами свяжутся.';

        if (values.inpName.attr('required')) {
            if (values.valName == '' || values.valName == ' ') {
                sendError('Введите имя');
                return false;
            } else if (values.valName.length < 2 || !nameValid(values.valName)) {
                sendError('Имя введёно некорректно');
                return false;
            }
        }

        if (values.inpPhone.attr('required')) {
            if (values.valPhone == '') {
                sendError('Введите телефон');
                return false;
            } else if (values.valPhone.indexOf('_') >= 0) {
                sendError('Номер телефона введён не полностью');
                return false;
            }
        }

        if (values.inpEmail.attr('required')) {
            if (values.valEmail == '' || values.valEmail == ' ') {
                sendError('Введите адрес электронной почты');
                return false;
            } else if (!emailValid(values.valEmail)) {
                sendError('Адрес электронной почты введён некорректно');
                return false;
            }
        }

        if (values.inpMessage.attr('required')) {
            if (values.valMessage == '' || values.valMessage == ' ') {
                sendError('Введите сообщение');
                return false;
            }
        }

        if (noPass(values.form, '.checkbox__agree')) return false;

        send({
            'type'   : values.formName,
            'name'   : values.valName,
            'phone'  : values.valPhone,
            'email'  : values.valEmail,
            'message': values.valMessage
        });
    });

    function noPass(parent, selector) {
        let items = parent.find(selector);

        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                let checked = $(items[i]).prop('checked');

                if (!checked) {
                    sendError('Подтвердите согласие на обработку Ваших персональных данных');
                    return true;
                }
            }
        }

        return false;
    }

    function send(information) {
        $.ajax({
            type    : 'POST',
            url     : `/send.php`,
            dataType: 'html',
            data    : information,
            success : sendSuccess
        });
    }

    function sendSuccess() {
        popupMessage.html(values.textMessage);
        $('.popup_open').removeClass('popup_open');
        $('.popup-overlay').remove();
        openPopup(event, 'event');

        values.inpName.val('');
        values.inpPhone.val('');
        values.inpEmail.val('');
        values.inpMessage.val('');
    }

    function sendError(message) {
        popupMessage.html(message);
        openPopup(event, 'event');
    }

    function nameValid(name) {
        var pattern = new RegExp(/^[а-яА-ЯёЁ]/);
        return pattern.test(name);
    }

    function emailValid(email) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        return pattern.test(email);
    }
})();