var gulp = require('gulp'),
    base64 = require('gulp-base64'),
    stripDebug = require('gulp-strip-debug'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

var $ = require('gulp-load-plugins')();

var staticPath = './app/';

// The only development task
gulp.task('styles', function () {
    return gulp.src(staticPath + 'styles/sass/main.scss')
        .pipe($.rubySass({
            style: 'compact',
		    sourcemap: true,
            precision: 10
        }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(gulp.dest('app/styles'))
        .pipe($.size());
});


// CSS concat, auto prefix, minify, then rename output file
gulp.task('minify-css', function() {
var cssPath = {cssSrc:['./app/styles/*.css', '!*.marine-theme.css', '!*.salmon-theme.css', '!*.usa-theme.css', '!*.min.css', '!/**/*.min.css'], cssDest:'./app/dist/styles/'};

  return gulp.src(cssPath.cssSrc)
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(cssPath.cssDest));
});

gulp.task('base64-css', function(){
     return gulp.src(staticPath + 'styles/*.css')

        // All referenced images with maximum size of 8KB are encoded and put inline as data URIs.
        .pipe(base64({
            baseDir: staticPath + 'css/',
            maxImageSize: 8 * 1024,
            debug: true
        }))

        .pipe(gulp.dest(staticPath + '/dist/styles'));
});

// JS concat, strip debugging code and minify
gulp.task('bundle-scripts', function() {
var jsPath = {jsSrc:[
    './app.js',
    './app/scripts/controller/user.js',
    './app/scripts/controller/*.js',
    './app/scripts/*.js',
    './app/scripts/**/*.js'],
    jsDest:'./app/dist/scripts'};

  gulp.src(jsPath.jsSrc)
    .pipe(concat('ngscripts.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(jsPath.jsDest));
});

gulp.task('dev', ['styles'], function(){
    gulp.watch(staticPath + 'styles/sass/**/*.scss', ['styles']);
});

gulp.task('build', ['styles', 'minify-css', 'base64-css', 'bundle-scripts'], function(){
    gulp.watch(staticPath + 'styles/sass/**/*.scss', ['styles']);
    gulp.watch(staticPath + 'scripts/**/*.js', ['build-js']);
});

gulp.task('default', ['dev']);
