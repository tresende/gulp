var gulp = require('gulp'),
    clean = require('gulp-clean'),
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

gulp.task('build-img', ['copy'], function () {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});
