var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify');

var $ = require('gulp-load-plugins')();

var staticPath = './app/';

gulp.task('styles', function () {
    return gulp.src('app/sass/main.scss')
        .pipe($.rubySass({
            style: 'compact',
		    sourcemap: true,
            precision: 10
        }))
        .pipe($.autoprefixer('last 2 version'))
        .pipe(gulp.dest('app/styles'))
        .pipe($.size());
});
 
gulp.task('dev', ['styles'], function(){
//    gulp.watch(staticPath + 'scripts/dev/**/*.js', ['dev-js']);
    gulp.watch(staticPath + 'sass/**/*.scss', ['styles']);
});
 
gulp.task('default', ['dev']);