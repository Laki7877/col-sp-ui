
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
          transform: [require('bulkify')],
  	    	keepAlive: true,
          watch: false
  	    }
  	  }
  	},
    watch: {
      scripts: {
        files: ['angular/**/*'],
        tasks: ['browserify']
      }
    }

  });

  // Load local tasks.
  // grunt.loadTasks('tasks');
  
  // Load plugins
  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['browserify']);
  grunt.registerTask('serve', ['connect:server', 'watch']);

}; 
