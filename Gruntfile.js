/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Grunt task file
 * 
 * @version    1.0.0
 * @author     ahancer
 */
/**
 * Application path configuration
 */
var _ = require('lodash');
var appPath = {
    vendor: {
      src: 'app/vendor/index.js',
      dest: 'public/assets/js/vendor.js'
    },
    app: {
      srcFolder: 'app',
      src: 'app/app.js',
      dest: 'public/assets/js/bundle.js'
    },
    templates: {
      all: {
        src: 'app/**/*.html',
        dest: 'app/template.js'
      },
      nc: {
        src: 'app/nc/templates/**/*.html',
        dest: 'app/nc/template.js'
      }
    }
};
/**
 * Browserify config
 */
var browserifyConfig = function () {
  /* Development options */
  var devOptions = {
    /* Enable bulk-require and ngannotate */
    transform: [
      require('bulkify'),
      require('browserify-ngannotate')
    ],
    keepAlive: true,
    watch: false
  };
  /* Production options */
  var prodOptions = {
    /* Enable bulk-require, ngannotate, uglify */
    transform: [
      require('bulkify'),
      require('browserify-ngannotate'),
      require('uglifyify')
    ],
    keepAlive: true,
    watch: false
  };
  var config = {
    /* Third party packages build */
    vendor: {
      files: {},
      options: devOptions
    },
    /* Development build */
    dev: {
      files: {},
      options: devOptions
    },
    /* Production build */
    prod: {
      files: {},
      options: prodOptions
    }
  };
  config.vendor.files[appPath.vendor.dest]  = [appPath.vendor.src];
  config.dev.files[appPath.app.dest]        = [appPath.app.src];
  config.prod.files[appPath.app.dest]       = [appPath.vendor.src, appPath.app.src];
  return config;
};
/**
 * Watch config
 */
var watchConfig = function () {
  var config = {
    dev: {
      files: [appPath.app.srcFolder + '/**/*'],
      tasks: ['ngtemplates', 'browserify:dev']
    }
  };
  return config;
};
/**
 * ngTemplate config
 */
var ngTemplatesConfig = function () {
  var config = {};
  _.forOwn(appPath.templates, function (v, k) {
    config[k] = _.extend({}, v);
    config[k].options = {
      bootstrap: function (module, script){
        return 'module.exports = ["$templateCache", function($templateCache) {' + script + '}]';
      },
      htmlmin: {
      },
      url: function(url) {
        //Remove url and .html
        return url.replace(v.src.split('/**/*')[0], '').substring(1);
      }
    }
  });
  return config;
};
/**
 * JSHint Config
 */
var jshintConfig = function() {
  var config = {
    all: ['app/**/*.js'],
    options: {
      reporter: require('jshint-stylish'),
      jshintrc: true
    }
  };
  return config;
};
/* Module export */
module.exports = function (grunt) {
  /**
   * Just-in-time loading grunt task
   */
  require('jit-grunt')(grunt,{
    ngtemplates: 'grunt-angular-templates'
  });
  /**
   * 
   * Grunt config initialization
   *
   */
  grunt.initConfig({
  	browserify: browserifyConfig(),
    watch: watchConfig(),
    ngtemplates: ngTemplatesConfig(),
    jshint: jshintConfig()
  });
  /**
   * Register grunt tasks
   */
  grunt.registerTask('default', ['ngtemplates', 'browserify:dev']);
  grunt.registerTask('vendor', ['browserify:vendor']);
  grunt.registerTask('check', ['jshint:all']);
  grunt.registerTask('build', ['ngtemplates', 'browserify:prod']);
};