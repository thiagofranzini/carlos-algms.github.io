module.exports = function (grunt) {

  require('load-grunt-config')(grunt, { scope: 'devDependencies' });

  grunt.registerTask('default', []);

  grunt.registerTask('serve', [
    'concurrent:serve'
  ]);
};
