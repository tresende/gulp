var gulp = require('gulp')
    , clean = require('gulp-clean')
    , uglify = require('gulp-uglify')
    , usemin = require('gulp-usemin')
    , cssmin = require('gulp-cssmin')
    , browserSync = require('browser-sync')
    , jshint = require('gulp-jshint')
    , imagemin = require('gulp-imagemin')
    , csslint = require('gulp-csslint')
    , autoprefixer = require('gulp-autoprefixer')
    , less = require('gulp-less')
    , jshintStylish = require('jshint-stylish');

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
            'css': [autoprefixer, cssmin]
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

    gulp.watch('src/js/*.js').on('change', function (event) {
        console.log(event.path)
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));
    });

    // novidade para lint de css
    gulp.watch('src/css/**/*.css').on('change', function (event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(csslint())
            .pipe(csslint.reporter());
    });

    // novidade para lint de css
    gulp.watch('src/less/**/*.less').on('change', function (event) {
        gulp.src(event.path)
            .pipe(less())
            .pipe(gulp.dest('src/css'))
    });


    gulp.watch('src/less/**/*.less').on('change', function (event) {
        var stream = gulp.src(event.path)
            .pipe(less().on('error', function (erro) {
                console.log('LESS, erro compilação: ' + erro.filename);
                console.log(erro.message);
            }))
            .pipe(gulp.dest('src/css'));
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
});