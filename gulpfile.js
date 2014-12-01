var gulp = require('gulp'),
    base64 = require('gulp-base64'),
    minifyCSS = require('gulp-minify-css'),
    csscomb = require('gulp-csscomb'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefix = require('gulp-autoprefixer'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload');

var $ = require('gulp-load-plugins')();
var staticPath = './app/';


/* OUR DEVELOPMENT TASK */

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

// Runs the styles task, reloads browser and restarts server automagically after changes happened
gulp.task('run-server', ['styles'], function(){

    livereload.listen();
    gulp.watch(staticPath + 'styles/sass/**/*.scss', ['styles']);
    gulp.watch(staticPath + 'styles/*.css').on('change', livereload.changed);
    gulp.watch(staticPath + 'scripts/**/*.js').on('change', livereload.changed);
    nodemon({ script: 'server.js', ext: 'html js', watch: 'server/'})
    .on('restart', function () {
      console.log('restarted!')
    })
});


/* OUR BUILD TASKS */

// CSS concat, auto prefix, minify, then rename output file
gulp.task('minify-css', function() {
var cssPath = {cssSrc:['./app/styles/*.css', '!*.marine-theme.css', '!*.salmon-theme.css', '!*.usa-theme.css', '!*.min.css', '!/**/*.min.css'], cssDest:'./app/dist/styles/'};

  return gulp.src(cssPath.cssSrc)
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(cssPath.cssDest));
});

// Minify the size of all user-added pictures
gulp.task('images', function() {

  return gulp.src(staticPath + 'images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(staticPath + 'dist/images'))
    //.pipe(notify({ message: 'Images task complete' }));
});

// Encode small images with maximum size of 8KB and put inline as data URIs.
gulp.task('base64-css', function(){

     return gulp.src(staticPath + 'styles/*.css')
        .pipe(base64({
            baseDir: staticPath + 'css/',
            maxImageSize: 8 * 1024,
            debug: true
        }))
        .pipe(gulp.dest(staticPath + '/dist/styles'));
});

// Format .scss files according to the rules defined in the .csscomb.json file
gulp.task('css-comb', function () {

    return gulp.src(staticPath + 'styles/sass/*.scss')
        .pipe(csscomb())
        .pipe(gulp.dest(staticPath + 'styles/sass'));
});

// JS concat, strip debugging code and minify
gulp.task('bundle-scripts', function () {
    var jsPath = {
        jsSrc: [
            './app/scripts/app.js',
            './app/scripts/controller/*.js',
            './app/scripts/services/*.js',
            './app/scripts/*.js'],
        jsDest: './app/dist/scripts'
    };

    gulp.src(jsPath.jsSrc)
        .pipe(concat('scripts.js'))
        .pipe(uglify({compress: {drop_debugger: true, drop_console: true}}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(jsPath.jsDest));
});

gulp.task('dev', ['run-server']);
gulp.task('build', ['styles', 'minify-css', 'images', 'base64-css', 'bundle-scripts']);

gulp.task('default', ['dev']);
