var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
//    imagemin = require('gulp-imagemin'),
//    minifyCSS = require('gulp-minify-css'),
//    base64 = require('gulp-base64'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify');
//    jsdoc = require('gulp-jsdoc');
 
//var handleError = function(err){
//    console.log(err.toString());
//};
var $ = require('gulp-load-plugins')();

var staticPath = './app/';
 
//// Dev task. is also default task
//gulp.task('dev-js', function(){
//    return gulp.src(staticPath + 'scripts/dev/**/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'))
//        .pipe(gulp.dest(staticPath + 'scripts/dist'));
//});
 
//gulp.task('compass', function () {
//    return gulp.src(staticPath + 'sass/**/*.scss').pipe(compass({
//        config_file: './config.rb',
//        css: 'src/website/static/css',
//        sass: 'src/website/static/sass'
//    }))
//        .on('error', handleError);
//});

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
 
// Build Tasks
gulp.task('build-js', ['jsdoc'], function(){
    return gulp.src(staticPath + 'scripts/dev/**/*.js')
 
        // removes all console.log, alerts, etc.
        .pipe(stripDebug())
 
        // well, self-explanatory
        .pipe(uglify())
        .pipe(gulp.dest(staticPath + 'scripts/dist'));
});
 
//gulp.task('build-css',['compass'], function(){
//     return gulp.src(staticPath + 'css/**/*.css')
//
//        // all referenced images with maximum size of 8KB are encoded and put inline as data URIs.
//        .pipe(base64({
//            baseDir: staticPath + 'css/',
//            maxImageSize: 8 * 1024,
//            debug: true
//        }))
//
//        // also self-explanatory
//        .pipe(minifyCSS({
//            keepBreaks:false,
//            keepSpecialComments: 0
//        }))
//        .pipe(gulp.dest(staticPath + 'css'));
//});
 
 
//gulp.task('img-optimize', function () {
//
//    // gif images are excluded, because during some tests they weren't processed correctly...
//    return gulp.src([staticPath + 'images/**/*.jpg', staticPath + 'images/**/*.png'])
//        .pipe(imagemin({
//            optimizationLevel: 3,
//            progressive: true
//        }))
//        .pipe(gulp.dest(staticPath + 'images'));
//});
 
//gulp.task('build', ['build-js', 'build-css', 'img-optimize']);