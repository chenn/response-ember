module.exports = (grunt) ->
  grunt.initConfig({
    clean: ['static/*']
    concat:
      dev:
        src: ['app/**/*.js', '!app/lib/**/*.js']
        dest: 'static/bundle.js'
    copy:
      dev:
        files: [
          expand: true
          cwd: 'app/'
          src: ['**/*', '!**/*.less', '!**/*.js', 'lib/**/*.js']
          dest: 'static/'
        ]
    less:
      dev:
        files: 'static/styles/screen.css': 'app/styles/screen.less'
    watch:
      less:
        options: nospawn: true
        files: ['app/**/*.less']
        tasks: ['less:dev']
      copy:
        options: nospawn: true
        files: ['app/**/*', '!app/**/*.less', '!app/**/*.js', '!app/**/*.handlebars']
        tasks: ['copy:dev']
      concat:
        options: nospawn: true
        files: ['app/**/*.js', '!app/lib/**/*']
        tasks: ['concat:dev']
      emberTemplates:
        options: nospawn: true
        files: ['app/templates/**/*.handlebars']
        tasks: ['emberTemplates:dev']
    emberTemplates:
      dev:
        options:
          templateBasePath: /app\/templates\//
        files:
          'static/templates.js' : 'app/templates/**/*.handlebars'

  })

  # Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-ember-templates')

  # Available tasks
  grunt.registerTask('default', ['clean', 'copy:dev', 'concat:dev', 'less:dev', 'emberTemplates:dev'])
  grunt.registerTask('dev', ['default', 'watch'])
