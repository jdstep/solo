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
        src: ['client/app/app.js', 'client/helpers/**/*.js', 'client/services/**/*.js'],
        dest: 'public/js/sky.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/sky.min.js': ['public/js/sky.js']
        }
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'public/index.html': 'client/index.html',     // 'destination': 'source'
        }
      },
    },
    copy: {
      html: {
        files: [
          { src: 'client/index.html', dest: 'public/index.html'}
        ]
      },
      main : {
        files: [
          // includes files within path
          {expand: true, src: ['client/lib/images/*'], flatten: true, dest: 'public/images', filter: 'isFile'},
          {expand: true, src: ['client/*.png'], dest: 'public/', filter: 'isFile'},
          {expand: true, src: ['client/*.ico'], dest: 'public/', filter: 'isFile'},
          {expand: true, src: ['client/styles/styles.css'], flatten: true, dest: 'public/styles/', filter: 'isFile'},

        ]
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          // 'public/stylesheets/style.css': ['/client/styles/styles.css']
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-purifycss');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy', 'cssmin']);

  grunt.registerTask('heroku', ['jshint', 'concat', 'uglify']);


};
