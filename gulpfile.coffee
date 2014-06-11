'use strict'

gulp = require 'gulp'
jshint = require 'gulp-jshint'
connect = require 'gulp-connect'

paths:
  scripts: ['js/*.js']

gulp.task 'jshint', ->
  gulp.src paths.scripts
    .pipe jshint()
    .pipe jshint.reporter 'default'

# connect
gulp.task 'connect:app', ->
  connect.server
    root: './'
    port: 1337
    livereload: true

gulp.task 'watch', ['connect:app'], ->
  # run tasks automatically when files change
  gulp.watch 'js/*', ['jshint']

gulp.task 'default', ['watch']
