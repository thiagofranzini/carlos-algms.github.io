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
      materialize: ['source/font']
    },

    concat: {
      basic: {
        dest: 'source/js/vendors.js',
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/materialize-css/dist/js/materialize.js',
          'node_modules/jquery-circle-progress/dist/circle-progress.js',
          'node_modules/requirejs/require.js'
        ]
      }
    },

    requirejs: {
      all: {
        options: {
          waitSeconds: 0,
          appDir: 'source/_js-source',
          mainConfigFile: 'source/_js-source/app.js',
          baseUrl: '.',
          optimize: 'none',
          dir: 'source/js',
          generateSourceMaps: false,
          preserveLicenseComments: false,
          inlineText: true,
          findNestedDependencies: true,
          paths: {
            jquery: 'empty:',
            lightbox: '../../node_modules/lightbox2/dist/js/lightbox'
          },
          modules: [
            {
              name: 'app'
            }
          ],
          shim: {
          },
          noBuildTxt: true
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);


  grunt.registerTask('default', [ 'clean', 'copy', 'requirejs', 'concat']);
};
