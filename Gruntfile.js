
module.exports = function (grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: 'public/',
          port: 9009
        }
      }
    },
  	browserify: {
  	  dist: {
  	    files: {
  	      'public/assets/js/bundle.js': ['angular/app.js']
  	    },
  	    options: {
          transform: [require('bulkify'), require('browserify-ngannotate')],
  	    	keepAlive: true,
          watch: false
  	    }
  	  }
  	},
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['watch:scripts']
      }
    },
    watch: {
      scripts: {
        files: ['angular/**/*', 'templates/angular/**/*.html'],
        tasks: ['default']
      },
      livereload: {
        options: { livereload: true },
        files: ['templates/**/*', 'angular/**/*']
      }
    },
    exec: {
      compass: 'compass compile' //Only for those with compass
    },
    ngtemplates: {
      dist: {
        src: 'templates/angular/**/*.html',
        dest: 'angular/template.js',
        options: {
          bootstrap: function(module, script) {
            var content = '/**\n * Generated by grunt-angular-templates \n';
            content += ' * ' + new Date() + '\n';
            content += ' */\n'; 
            content += 'module.exports = ["$templateCache", function($templateCache) {' + script + ' }];';
            return content;
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
            //Strip src url
            return url.replace('templates/angular/', '').replace('.html','');
          }
        }
      },
      nc: {
        src: 'angular/nc/templates/**/*.html',
        dest: 'angular/nc/template.js',
        options: {
          bootstrap: function(module, script) {
            var content = '/**\n * Generated by grunt-angular-templates \n';
            content += ' */\n'; 
            content += 'angular.module("nc").run(function($templateCache) {' + script + ' });';
            return content;
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
            //Strip src url
            return url.replace('angular/nc/templates/', '').replace('.html','');
          }
        }
      }
    }
  });

  // Load local tasks.
  // grunt.loadTasks('tasks');
  
  // Load plugins
  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['ngtemplates','browserify']);
  grunt.registerTask('scripts', ['browserify']);
  grunt.registerTask('template', ['ngtemplates']);
  grunt.registerTask('watchall', ['watch']);
  grunt.registerTask('compass', ['exec:compass']);

  // live reload
  grunt.loadNpmTasks('grunt-contrib-watch');

}; 
