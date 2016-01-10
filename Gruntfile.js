
module.exports = gruntConfig;

function gruntConfig(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    concurrent: {
      options: {
        logConcurrentOutput: true
      },

      serve: [
        'shell:serve',
        'open:dev'
      ]
    },


    shell: {
      options: {
        stderr: true
      },
      serve: {
        command: 'hexo serve'
      },
      build: {
        command: 'jekyll build --config _config.yml'
      },
      deployGithub: {
        command: 'octopress deploy'
      }
    },


    open: {
      dev: {
        path: 'http://127.0.0.1:4000/',
        app: 'chrome'
      }
    }
  });


  grunt.registerTask('default', []);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('serve', [ 'build', 'concurrent:serve' ]);

  grunt.registerTask('deploy', [
    'build',
    'cssmin',
    'uglify',
    'shell:build',
    'shell:deployGithub'
  ]);

}
