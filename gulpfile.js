const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const path = require('path')
const fs = require('fs')

gulp.task('compile', function() {
  return gulp.src('app/**/*.{js,jsx}')
  .pipe(webpack({
    config : webpackConfig
  }))
  .pipe(gulp.dest('build'));
});

gulp.task('start', ['compile'], function(){
  gulp.watch('app/**/*.{js,jsx}', ['compile']);
});
