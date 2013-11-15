/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: 9005
      },
      css: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['compass:dev']
      },
      coffee: {
        files: ['<%= coffeelint.files %>'],
        tasks: ['coffeelint', 'coffee', 'uglify']
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.repository %> <%= pkg.license %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/jquery.flexnav.js',
        dest: 'js/jquery.flexnav.min.js'
      }
    },

    coffee: {
      compile: {
        files: {
          'js/jquery.flexnav.js': 'coffeescripts/jquery.flexnav.coffee'
        }
      }
    },

    coffeelint: {
      files: ['coffeescripts/*.coffee'],
        options: {
        'no_trailing_whitespace': {
          'level': 'error'
        },
        'max_line_length': {
          'level': 'ignore'
        }
      }
    },

    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true
      },
      dev: {
        options: {
          environment: 'development'
        }
      },
      dist: {
        options: {
          environment: 'production',
          force: true
        }
      }
    },

    devserver: {
      server: {},
      options: {
        port: 8080,
      }
    },

    concurrent: {
      server: {
        tasks: ['devserver', 'watch'],
        options: {
          logConcurrentOutput: false
        }
      }
    },
  });

  // Load necessary plugins
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-devserver');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['coffeelint']);
	grunt.registerTask('default', ['compass:dev', 'coffee', 'uglify', 'concurrent:server']);
};