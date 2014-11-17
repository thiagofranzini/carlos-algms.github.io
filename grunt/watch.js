
module.exports = function ( grunt, options ) {

    return {
        options: {
            spawn: false,
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
            tasks: ['concat:jsLibs', 'uglify:jsLibs'],
            options: {
                debounceDelay: 250,
            }
        },
        jsSite: {
            files: '<%= concat.jsSite.src %>',
            tasks: ['concat:jsSite', 'uglify:jsSite'],
            options: {
                debounceDelay: 250,
            }
        },
        sassSite: {
            files: ['assets/scss/site.scss'],
            tasks: ['sass:site', 'cssmin:site'],
            options: {
                debounceDelay: 500,
            }
        }
    };

};