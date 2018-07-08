var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

gulp.task('copy', ['clean'], function () {
    var stream = gulp.src('src/**/*')
        .pipe(gulp.dest('dist'))
    return stream;
});

gulp.task('clean', function () {
    var stream = gulp.src('dist')
        .pipe(clean())
    return stream;
});

gulp.task('build-img', function () {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('build-js', function () {
    var stream = gulp.src(['dist/js/jquery.js',
        'dist/js/home.js',
        'dist/js/ativa-filtro.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    return stream
});

gulp.task('build-html', ['build-js'], function () {
    var stream = gulp.src('dist/**/*.html')
        .pipe(htmlReplace({
            js: 'js/all.js'
        }))
        .pipe(gulp.dest('dist'))
    return stream
});

gulp.task('default', ['copy'], function () {
    gulp.start('build-img', 'build-js', 'build-html',);
});