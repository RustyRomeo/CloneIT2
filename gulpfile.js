var gulp = require('gulp');

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
 
gulp.task('dev', ['styles'], function(){
    gulp.watch(staticPath + 'styles/sass/**/*.scss', ['styles']);
});
 
gulp.task('default', ['dev']);