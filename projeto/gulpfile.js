var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync'),
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

gulp.task('usemin', function () {
    var stream = gulp.src('dist/**/*.html')
        .pipe(usemin({
            'js': [uglify],
            'css': [cssmin]
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['copy'], function () {
    gulp.start('build-img', 'usemin', );
});



gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
});