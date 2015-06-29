module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      all: [
      'Gruntfile.js', 
      'client/**/*.js', 
      'server/**/*.js',
      '!client/lib/**/*.js', 
      '!client/services/countrycodes.js', 
      '!client/services/googleanalytics.js'
      ]
    },
    concat: {
      options: {
        seperator: ';'
      },
      dist: {
        src: ['client/**/*.js'],
        dest: 'public/js/sky.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/sky.min.js': ['public/js/sky.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
