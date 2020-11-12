"use strict";

const browserInfo = (() => {
    let platform = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) ? 'mobile' : 'desktop',
        ua = navigator.userAgent,
        browsrObj,
        version,
        bName = function () {
            if (ua.search(/Edge/) > -1) return 'edge';
            if (ua.search(/MSIE/) > -1) return 'ie';
            if (ua.search(/Trident/) > -1) return 'ie11';
            if (ua.search(/Firefox/) > -1) return 'firefox';
            if (ua.search(/Opera/) > -1) return 'opera';
            if (ua.search(/OPR/) > -1) return 'operaWebkit';
            if (ua.search(/YaBrowser/) > -1) return 'yabrowser';
            if (ua.search(/Chrome/) > -1) return 'chrome';
            if (ua.search(/Safari/) > -1) return 'safari';
            if (ua.search(/Maxthon/) > -1) return 'maxthon';
        }();

    switch (bName) {
        case 'edge':
            version = (ua.split('Edge')[1]).split('/')[1];
            break;
        case 'ie':
            version = (ua.split('MSIE ')[1]).split(';')[0];
            break;
        case 'ie11':
            bName = 'ie';
            version = (ua.split('; rv:')[1]).split(')')[0];
            break;
        case 'firefox':
            version = ua.split('Firefox/')[1];
            break;
        case 'opera':
            version = ua.split('Version/')[1];
            break;
        case 'operaWebkit':
            bName = 'opera';
            version = ua.split('OPR/')[1];
            break;
        case 'yabrowser':
            version = (ua.split('YaBrowser/')[1]).split(' ')[0];
            break;
        case 'chrome':
            version = (ua.split('Chrome/')[1]).split(' ')[0];
            break;
        case 'safari':
            version = (ua.split('Version/')[1]).split(' ')[0];
            break;
        case 'maxthon':
            version = ua.split('Maxthon/')[1];
            break;
    }

    try {
        browsrObj = {
            platform: platform,
            browser: bName,
            versionFull: version,
            versionShort: version.split('.')[0]
        };
    } catch (err) {
        browsrObj = {
            platform: platform,
            browser: 'unknown',
            versionFull: 'unknown',
            versionShort: 'unknown'
        };
    }

    return browsrObj;
})();

document.addEventListener('DOMContentLoaded', () => {
    //ymaps.ready(init);

    $('[name="phone"]').inputmask({
        'mask': '+7 (999) 999-99-99'
    });

    findTarget({
        target: '.target-animation',
        indentY: 200
    });
});

//=include _find-target.js
//=include _header.js
//=include _map.js
//=include _menu.js
//=include _popup.js
//=include _scroll.js
//=include _send-form.js
//=include _sliders.js