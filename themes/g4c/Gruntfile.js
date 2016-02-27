module.exports = function(grunt){
  grunt.initConfig({
    copy: {
      fontawesome: {
        expand: true,
        cwd: 'node_modules/font-awesome/fonts/',
        src: ['**'],
        dest: 'source/fonts/'
      },
      materialize: {
        expand: true,
        cwd: 'node_modules/materialize-css/dist/',
        src: [
          'font/**'
        ],
        dest: 'source/'
      },
      lightbox: {
        expand: true,
        cwd: 'node_modules/lightbox2/dist/',
        src: ['images/**'],
        dest: 'source/'
      }
    },

    clean: {
      fontawesome: ['source/css/fonts'],
      materialize: ['source/font'],
      lightbox: ['']
    },

    concat: {
      basic: {
        dest: 'source/js/vendors.js',
        src: [
          'node_modules/materialize-css/dist/js/materialize.js',
          'node_modules/lightbox2/dist/js/lightbox.js'
        ]
      }
    }
  });

  require('load-grunt-tasks')(grunt);


  grunt.registerTask('default', [ 'clean', 'copy', 'concat']);
};
