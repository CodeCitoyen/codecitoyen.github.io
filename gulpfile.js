'use strict';


var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


gulp.task('app.scss', function() {

    return gulp.src(['assets/scss/app.scss','assets/projets/*.scss'])
        .pipe(concat('app.css'))
        .pipe(sass())
        // .pipe(plugs.cssbeautify({indent: '  '}))
        // .pipe(plugs.csso())
        .pipe(gulp.dest('assets/dist/css/'));
});

gulp.task('style.scss', function() {

    return gulp.src('assets/scss/style.scss')
        .pipe(sass())
        // .pipe(plugs.cssbeautify({indent: '  '}))
        // .pipe(plugs.csso())
        .pipe(gulp.dest('assets/dist/css/'));
});

gulp.task('js', function() {

    return gulp.src(['assets/js/app.js','assets/projets/*.js'])
        .pipe(concat('app.js'))
        // .pipe(plugs.cssbeautify({indent: '  '}))
        // .pipe(plugs.csso())
        .pipe(gulp.dest('assets/dist/js/'));
});


gulp.task('scss', gulp.series('app.scss', 'style.scss'));

gulp.task('build', gulp.series('scss', 'js'));


gulp.task('default', gulp.series('build'));

var watcher = gulp.watch(['assets/css/app.scss','assets/scss/style.scss', 'assets/projets/*.scss', 'assets/js/app.js','assets/projets/*.js'], gulp.series('build'));
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
