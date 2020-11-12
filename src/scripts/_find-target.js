// findTarget({
//     target    : '.block', // Элемент для попадания в область видимости. ".target-animation" - по умолчанию
//     event     : 'remove', // Добаввить/убрать (add/remove) модификатор при попадании цели в область видимости. "add" - по умолчанию.
//     findClass : 'find',   // Класс модификатора. "target-animation--found" - по умолчанию.
//     indentY   : 200       // Дополнительна прокрутка по вертикали (измеряется в пикселях, "px" не пишутся) перед добавлением модификации. 0 - по умолчанию.
//     header    : 'header'  // Элемент, высота которого будет учитываться при прокрутке. false - по умолчанию.
// });

function findTarget(userOptions) {
    if (userOptions && !document.querySelectorAll(userOptions.target).length) return false;

    let options;
    mergeOptions(userOptions);
    const TARGETS = document.querySelectorAll(options.target);
    init();

    function init() {
        if (options.event == 'remove') addClass();
        getResizeValue();
        getScrollValue();
        window.addEventListener('resize', getResizeValue);
        window.addEventListener('scroll', getScrollValue);
    }

    function getScrollValue() {
        let windowPosition = {
            top:    window.pageYOffset,
            right:  window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight,
            left:   window.pageXOffset
        };

        for (let i = 0; i < TARGETS.length; i++) {
            let indentY = options.indentY,
                target = TARGETS[i],
                targetSize = {
                    width: target.clientWidth,
                    height: target.clientHeight
                };

            if (options.procentIndentY) indentY = targetSize.height * options.indentY / 100;

            let targetPosition = {
                    top:    window.pageYOffset + target.getBoundingClientRect().top + indentY,
                    right:  window.pageXOffset + target.getBoundingClientRect().right,
                    bottom: window.pageYOffset + target.getBoundingClientRect().bottom - indentY,
                    left:   window.pageXOffset + target.getBoundingClientRect().left
                };

            if (targetPosition.bottom > windowPosition.top &&
                targetPosition.top < windowPosition.bottom &&
                targetPosition.right > windowPosition.left &&
                targetPosition.left < windowPosition.right) {
                    if (options.event == 'add' && !target.classList.contains(options.findClass)) {
                        target.classList.add(options.findClass);
                    } else if (options.event == 'remove' && target.classList.contains(options.findClass)) {
                        target.classList.remove(options.findClass);
                    }

                    options.findEvent(target);
                }
        }
    }

    function addClass() {
        for (let i = 0; i < TARGETS.length; i++) {
            TARGETS[i].classList.add(options.findClass);
        }
    }

    function getResizeValue() {
        if (options.header) {
            let header = document.querySelector(options.header),
                headerHeight = header.clientHeight;

            options.indentY = options.indentY + headerHeight;
        }
    }

    function mergeOptions(userOptions) {
        let defaultOptions = {
            target    : '.target-animation',
            event     : 'add',
            findClass : 'target-animation--found',
            findEvent : () => {},
            header    : false,
            indentY   : 100
        };

        for (let key in userOptions) defaultOptions[key] = userOptions[key];

        options = defaultOptions;
        checkIndent(options.indentY);

        function checkIndent(indentY) {
            indentY = String(indentY).split('');

            if (indentY[indentY.length - 1] == '%') {
                options.procentIndentY = true;
                indentY.pop();
                options.indentY = Number(indentY.join(''));
            }
        }
    }
}