'use strict'

gulp = require 'gulp'
jshint = require 'gulp-jshint'
connect = require 'gulp-connect'
minifyCSS = require 'gulp-minify-css'
htmlmin = require 'gulp-htmlmin'
uglify = require 'gulp-uglify'

paths =
  scripts: ['js/*.js']
  css: ['css/*.css']
  html: ['./*.html']
  dist: 'dist'

gulp.task 'js', ->
  gulp.src paths.scripts
    .pipe jshint()
    .pipe jshint.reporter 'default'
    .pipe uglify()
    .pipe gulp.dest paths.dist + '/js'
    .pipe connect.reload()

gulp.task 'css', ->
  gulp.src paths.css
    .pipe minifyCSS()
    .pipe gulp.dest paths.dist + '/css'
    .pipe connect.reload()

gulp.task 'html', ->
  gulp.src paths.html
    .pipe htmlmin()
    .pipe gulp.dest paths.dist
    .pipe connect.reload()

# connect
gulp.task 'connect:dev', ->
  connect.server
    root: './'
    port: 1337
    livereload: true

gulp.task 'connect:dist', ->
  connect.server
    root: 'dist'
    port: 1338
    livereload: true

gulp.task 'watch', ['connect:dev', 'connect:dist'], ->
  # run tasks automatically when files change
  gulp.watch paths.js, ['js']
  gulp.watch paths.css, ['css']
  gulp.watch paths.html, ['html']

gulp.task 'build', ['js', 'css', 'html']

gulp.task 'default', ['build', 'watch']
