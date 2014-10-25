var gulp = require('gulp'),
    base64 = require('gulp-base64'),
    stripDebug = require('gulp-strip-debug'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var $ = require('gulp-load-plugins')();

var staticPath = './app/';

gulp.task('styles', function () {
    return gulp.src(staticPath + 'styles/sass/main.scss')
        .pipe($.rubySass({
            style: 'compact',
		    sourcemap: true,
            precision: 10
        }))
        .pipe(gulp.dest('app/styles'))
        .pipe($.size());
});

gulp.task('build-css', function(){
     return gulp.src(staticPath + 'styles/*.css')

        // All referenced images with maximum size of 8KB are encoded and put inline as data URIs.
        .pipe(base64({
            baseDir: staticPath + 'css/',
            maxImageSize: 8 * 1024,
            debug: true
        }))

        // also self-explanatory
        .pipe(minifyCSS({
            keepBreaks:false,
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(staticPath + '/dist/styles'));
});

gulp.task('build-js', function(){
    return gulp.src(staticPath + 'scripts/**/*.js')

        // Removes all console.log, alerts, etc.
        .pipe(stripDebug())

        // Well, self-explanatory
        .pipe(uglify())
        .pipe(gulp.dest('app/dist/scripts'));
});

gulp.task('dev', ['styles'], function(){
    gulp.watch(staticPath + 'styles/sass/**/*.scss', ['styles']);
});

gulp.task('build', ['styles','build-js', 'build-css'], function(){
    gulp.watch(staticPath + 'styles/sass/**/*.scss', ['styles']);
    gulp.watch(staticPath + 'scripts/**/*.js', ['build-js']);
});

gulp.task('default', ['dev']);
