
module.exports = function () {
    var r = {};

    r.options = {
        separator: ';\n',
    };

    r.jsSite = {
        src: [
            'bower_components/highlight-js/src/highlight.js',
            'bower_components/highlight-js/src/languages/apache.js',
            'bower_components/highlight-js/src/languages/bash.js',
            'bower_components/highlight-js/src/languages/css.js',
            'bower_components/highlight-js/src/languages/http.js',
            'bower_components/highlight-js/src/languages/javascript.js',
            'bower_components/highlight-js/src/languages/json.js',
            'bower_components/highlight-js/src/languages/php.js',
            'bower_components/highlight-js/src/languages/sql.js',
            'bower_components/highlight-js/src/languages/xml.js',

            'assets/js/uteis.js',
            'assets/js/site.js'
        ],
        dest: '_source/Scripts/site.dev.js',
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
            separator: '\n',
        },
        src: [
            'bower_components/highlight-js/src/styles/monokai_sublime.css',

            'assets/scss/site.css'
        ],
        dest: '_source/Styles/site.dev.css',
    };

    return r;

};

