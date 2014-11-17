
module.exports = function () {

    return {
        options: {
            banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        jsSite: {
            src: [
                '_source/Scripts/site.dev.js'
            ],
            dest: '_source/Scripts/site.min.js'
        },
        jsLibs: {
            src: [
                '_source/Scripts/libs.dev.js'
            ],
            dest: '_source/Scripts/libs.min.js'
        }
    }
};