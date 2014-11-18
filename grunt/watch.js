
module.exports = function ( grunt, options ) {

    return {
        options: {
            spawn: false
        },
        configFiles: {
            files: ['Gruntfile.js', 'grunt/*.js'],
            options: {
                reload: true
            }
        },
        imagemin: {
            files: ["assets/images-to-minify/*"],
            tasks: ["imagemin"]
        },
        jsLibs: {
            files: '<%= concat.jsLibs.src %>',
            tasks: ['concat:jsLibs'],
            options: {
                debounceDelay: 500
            }
        },
        jsSite: {
            files: '<%= concat.jsSite.src %>',
            tasks: ['concat:jsSite'],
            options: {
                debounceDelay: 500
            }
        },
        sassSite: {
            files: ['assets/scss/**/*.scss'],
            tasks: ['sass:site', 'concat:cssSite'],
            options: {
                debounceDelay: 500
            }
        }
    };

};