
module.exports = function (grunt) {

    return {
        options: {
            //reporterOutput : 'jshint-reports.txt'
            reporter: require('jshint-stylish')
        },
        app: ['Gruntfile.js', 'assets/js/**/*.js', 'grunt/*.js']
    }
};