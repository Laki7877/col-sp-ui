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
var appPath = {
    vendor: {
      src: 'app/vendor/index.js',
      dest: 'public/assets/js/vendor.js'
    },
    app: {
      srcFolder: 'app',
      src: 'app/app.js',
      dest: 'public/assets/js/app.js'
    },
    templates: {
      core: {
        src: 'app/core/templates/**/*.html',
        dest: 'app/core/template.js'
      },
      nc: {
        src: 'app/nc/templates/**/*.html',
        dest: 'app/nc/template.js'
      },
      seller: {
        src: 'app/seller/templates/**/*.html',
        dest: 'app/seller/template.js'
      },
      admin: {
        src: 'app/admin/templates/**/*.html',
        dest: 'app/admin/template.js'
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
    /* Globally available packages */
    require: ['jquery:$', 'lodash:_'],
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
    /* Globally available packages */
    require: ['jquery:$', 'lodash:_'],
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
      tasks: ['browserify:dev']
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
        return 'module.exports = function($templateCache) {' + script + '}';
      },
      htmlmin: {
        collapseBooleanAttributes:      true,
        collapseWhitespace:             true,
        removeAttributeQuotes:          true,
        removeComments:                 true,
        removeEmptyAttributes:          true,
        removeRedundantAttributes:      true,
        removeScriptTypeAttributes:     true,
        removeStyleLinkTypeAttributes:  true
      },
      url: function(url) {
        //Remove url and .html
        return url.replace(v.src.split('/**/*')[0], '').replace('.html', '');
      }
    }
  });
  return config;
}
/* Module export */
module.exports = function (grunt) {
  /**
   * Just-in-time loading grunt task
   */
  require('jit-grunt')(grunt);
  /**
   * 
   * Grunt config initialization
   *
   */
  grunt.initConfig(
  	browserify: browserifyConfig(),
    watch: watchConfig(),
    ngtemplates: ngTemplatesConfig()
  });
  /**
   * Register grunt tasks
   */
  grunt.registerTask('default', ['ngtemplates', 'browserify:dev']);
  grunt.registerTask('build', ['ngtemplates', 'browserify:prod']);
};