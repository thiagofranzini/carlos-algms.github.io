 
var $window = $(window);
var $html = $("html:first");
var $head = $("head:first");
var $body = $("body:first");
var $DOC = $(document);

var IS_LOCAL = (location.host.indexOf('localhost') !== -1);

String.prototype.camelToHiphen = function () {
    return (this.replace(/([A-Z])/g, function (str, m1) { return '-' + m1.toLowerCase(); }).replace(/^ms-/, '-ms-'));
};

String.prototype.hiphenToCamel = function () {
    return (this.replace(/\-(.)/g, function (str, m1) { return m1.toUpperCase(); }).replace("-", ""));
};

String.prototype.toInt = function () {
    return parseInt( this );
};

String.prototype.toFloat = function () {
    return parseFloat(this);
};

Number.prototype.isEven = function () {
    return (this % 2 === 0);
};

Number.prototype.isOdd = function () {
    return (this % 2 !== 0);
};

var Teclas = (function () {
    return {
        ENTER: 13,
        ESC: 27,
        BACKSPACE: 8,
        TAB: 9,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        SPACE: 32,
        PAUSE: 19,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        DELETE: 46,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        PONTO_E: 190,
        PONTO_D: 110,
        VIRGULA_E: 188,
        VIRGULA_D: 0
    };
})();


var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

var fakeWorker = function (fn) {
    var blob = new Blob([
      "(" + fn.toString() + ")();"
    ], { type: "text/javascript" });

    var worker = new Worker(URL.createObjectURL(blob));

    return worker;
};


function getRandomInt(max, min) {
    if( !min ) min = 0;
    max++;//needed, because randow will never touch the max number
    return Math.floor(Math.random() * (max - min)) + min;
}


//return a string like php
function dateToStr(format, date) {
    if( ! date ) date = new Date();

    return format.replace(dateToStr.REGEX, function (a) {
        return dateToStr.MATCHES[a]( date );
    });
}


dateToStr.MATCHES = {
    'd': function ( date ) {
        return ("0" + date.getDate()).slice(-2) ;
    },
    'j': function ( date ) {
        return date.getDate();
    },
    'm': function ( date ) {
        return ('0' + this.n(date)).slice(-2);
    },
    'n': function ( date ) {
        return date.getMonth() + 1;
    },
    'y': function ( date ) {
        return date.getFullYear().toString().slice(-2);
    },
    'Y': function ( date ) {
        return date.getFullYear();
    },
    'h': function ( date ) {
        var h = date.getHours();

        if (h > 12) return (h - 12);

        if ( ! h) return 12;

        return h;
    },
    'H': function (date) {
        return date.getHours();
    },
    'i': function (date) {
        return ('0' + date.getMinutes() ).slice(-2);
    },
    's': function (date) {
        return ('0' + date.getSeconds()).slice(-2);
    },
};

dateToStr.REGEX = new RegExp('[' + Object.keys(dateToStr.MATCHES).join('') + ']', 'g');

 