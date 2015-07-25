
module.exports = gruntConfig;

function gruntConfig(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    watch: {
      options: {
        spawn: false
      },
      configFiles: {
        files: [
          'Gruntfile.js'
        ],
        options: {
          reload: true
        }
      },
      imagemin: {
        files: ['assets/images-to-minify/*'],
        tasks: ['imagemin']
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
    },


    concat: {
      options: {
        separator: ';\n'
      },
      jsSite: {
        src: [
          'assets/third-party/hightlight-js/highlight.pack.js',
          'assets/js/uteis.js',
          'assets/js/github.js',
          'assets/js/site.js'
        ],
        dest: '_source/Scripts/site.dev.js'
      },

      jsLibs: {
        src: [
          'bower_components/requirejs-bower/require.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
        ],
        dest: '_source/Scripts/libs.dev.js'
      },

      cssSite: {
        options: {
          separator: '\n'
        },
        src: [
          'assets/third-party/hightlight-js/monokai_sublime.css',
          'assets/scss/site.css'
        ],
        dest: '_source/Styles/site.dev.css'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },

      serve: [
        'watch',
        'shell:jekyllServe',
        'open:dev'
      ]
    },


    cssmin: {
      site: {
        files: {
          '_source/Styles/site.min.css': ['_source/Styles/site.dev.css']
        }
      }
    },


    imagemin: {
      assets: {
        files: [{
          expand: true,
          cwd: 'assets/images-to-minify',
          src: ['**/*.{png,jpg,gif}'],
          dest: '_source/Images'
        }]
      }
    },


    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      app: [
        'Gruntfile.js',
        'assets/js/**/*.js'
      ]
    },


    sass: {
      site: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'assets/scss/site.css': 'assets/scss/site.scss'
        }
      }
    },


    shell: {
      options: {
        stderr: true
      },
      jekyllServe: {
        command: 'jekyll serve --config _config.yml,_config_local.yml'
      },
      jekyllBuild: {
        command: 'jekyll build --config _config.yml'
      },
      deployGithub: {
        command: 'octopress deploy'
      }
    },


    uglify: {
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
    },


    open: {
      dev: {
        url: 'http://127.0.0.1:8080/',
        app: 'google-chrome'
      }
    }
  });


  grunt.registerTask('default', []);

  grunt.registerTask('build', [
    'sass',
    'concat'
  ]);

  grunt.registerTask('serve', [ 'build', 'concurrent:serve' ]);

  grunt.registerTask('deploy', [
    'build',
    'cssmin',
    'uglify',
    'shell:jekyllBuild',
    'shell:deployGithub'
  ]);

}
