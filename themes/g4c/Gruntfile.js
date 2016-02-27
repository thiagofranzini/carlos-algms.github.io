module.exports = function(grunt){
  grunt.initConfig({
    gitclone: {
      fontawesome: {
        options: {
          repository: 'https://github.com/FortAwesome/Font-Awesome.git',
          directory: '.tmp/fontawesome'
        }
      },
      matererialize: {
        options: {
          repository: 'https://github.com/Dogfalo/materialize.git',
          directory: '.tmp/materialize'
        }
      }
    },
    copy: {
      fontawesome: {
        expand: true,
        cwd: '.tmp/fontawesome/fonts/',
        src: ['**'],
        dest: 'source/fonts/'
      },
      materialize: {
        expand: true,
        cwd: '.tmp/materialize/dist/font/',
        src: ['**'],
        dest: 'source/font/'
      }
    },
    _clean: {
      tmp: ['.tmp'],
      fontawesome: ['source/css/fonts']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.renameTask('clean', '_clean');

  grunt.registerTask('fontawesome', ['gitclone:fontawesome', 'copy:fontawesome', '_clean:tmp']);
  grunt.registerTask('fancybox', ['gitclone:fancybox', 'copy:fancybox', '_clean:tmp']);
  grunt.registerTask('default', ['gitclone', 'copy', '_clean:tmp']);
  grunt.registerTask('clean', ['_clean']);
};
