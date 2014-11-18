
module.exports = function () {
    var r = {};

    r.options = {
        separator: ';\n'
    };

    r.jsSite = {
        src: [
            'assets/third-party/hightlight-js/highlight.pack.js',

            'assets/js/uteis.js',
            'assets/js/site.js'
        ],
        dest: '_source/Scripts/site.dev.js'
    };

    r.jsLibs = {
        src: [
            'assets/third-party/modernizr.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'
        ],
        dest: '_source/Scripts/libs.dev.js'
    };


    r.cssSite = {
        options: {
            separator: '\n'
        },
        src: [
            'assets/third-party/hightlight-js/monokai_sublime.css',

            'assets/scss/site.css'
        ],
        dest: '_source/Styles/site.dev.css'
    };

    return r;

};

