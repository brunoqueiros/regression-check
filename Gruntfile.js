'use strict';

module.exports = function (grunt) {
  
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'lib/',
            src: ['*.js'],
            dest: 'build/',
            ext: '.js'
          }
        ]
      }
    },

    jscs: {
      src: "lib/*.js",
      options: {
        config: ".jscsrc"
      }
    },

    shell: {
      run: {
        command: 'node build/index.js'
      }
    }
  });

  grunt.registerTask('build', ['jscs', 'babel', 'shell:run']);
};
