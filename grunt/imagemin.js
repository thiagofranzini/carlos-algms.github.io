
module.exports = function (grunt) {

    return {
        assets: {
            files: [{
                expand: true,
                cwd: 'assets/images-to-minify',
                src: ['**/*.{png,jpg,gif}'],
                dest: '_source/Images'
            }]
        }
    };
};