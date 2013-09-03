module.exports = (grunt) ->
  grunt.initConfig({
    clean: ['build/*']
    concat:
      dev:
        src: ['app/**/*.js', '!app/lib/**/*.js']
        dest: 'build/bundle.js'
    copy:
      dev:
        files: [
          expand: true
          cwd: 'app/'
          src: ['**/*', '!**/*.less', '!**/*.js', 'lib/**/*.js']
          dest: 'build/'
        ]
    less:
      dev:
        files: 'build/styles/screen.css': 'app/styles/screen.less'
    watch:
      less:
        options: nospawn: true
        files: ['app/**/*.less']
        tasks: ['less:dev']
      copy:
        options: nospawn: true
        files: ['app/**/*', '!app/**/*.less', '!app/**/*.js']
        tasks: ['copy:dev']
      concat:
        options: nospawn: true
        files: ['app/**/*.js', '!app/lib/**/*']
        tasks: ['concat:dev']
  })

  # Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-less')
  # grunt.loadNpmTasks('grunt-notify')
  # grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')

  # Available tasks
  grunt.registerTask('default', ['clean', 'copy:dev', 'concat:dev', 'less:dev'])
  grunt.registerTask('dev', ['default', 'watch'])
