module.exports = function (grunt) {

  return {
    options: {
      stderr: true
    },
    jekyllServe: {
      command: 'jekyll serve --config _config.yml,_config_local.yml'
    }
  };
};
