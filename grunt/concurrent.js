module.exports = function (grunt) {

  return {
    options: {
      logConcurrentOutput: true
    },
    serve: [
      'watch',
      'shell:jekyllServe'
    ]
  };
};
