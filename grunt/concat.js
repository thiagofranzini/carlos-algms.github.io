
module.exports = function () {
    var r = {};

    r.options = {
        separator: ';\n',
    };

    r.jsSite = {
        src: [
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


    // r.css = {
    //     options: {
    //         separator: '\n',
    //     },
    //     src: [
    //         'assets/css/reset.css'
    //     ],
    //     dest: '_source/Styles/styles.dev.css',
    // };

    return r;

};

