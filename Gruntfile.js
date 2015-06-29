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
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('default', ['jshint']);

};
