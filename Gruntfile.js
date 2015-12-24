
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
  	      'public/assets/js/bundle.js': ['app.js', 'controllers/**']
  	    },
  	    options: {
  	    	keepAlive: true
  	    }
  	  }
  	},
    watch: {
      scripts: {
        files: ['app.js'],
        tasks: ['browserify']
      }
    }

  });

  // Load local tasks.
  // grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['browserify']);
  grunt.registerTask('serve', ['connect:server', 'watch']);

}; 
