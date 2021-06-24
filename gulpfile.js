'use strict';

const gulp        = require('gulp'),
      watch       = require('gulp-watch'),                   // Наблюдение за изменениями в файлах
      browserSync = require("browser-sync"),                 // Локальный сервер
      prefixer    = require('gulp-autoprefixer'),            // Добавить префексы для свойств стилей
      uglify      = require('gulp-uglify'),                  // Минифицирование скриптов
      babel       = require('gulp-babel'),                   // Компиляция современного стандарта JavaScript
      sass        = require('gulp-sass'),                    // Компиляция sass в css
      groupMedia  = require('gulp-group-css-media-queries'), // Собрать все media запросы в конец файла
      notify      = require('gulp-notify'),                  // Всплывающее сообщение об обшибке
      concat      = require('gulp-concat'),                  // Объединене файлов
      include     = require("gulp-include"),                 // Возможность включать содержимое одних файлов в другие
      cssnano     = require('gulp-cssnano'),                 // Минифицирование стилей
      imagemin    = require('gulp-tinypng'),                 // Оптимизация изображений
      del         = require('del');

let path = {
    src: {
        root: 'src/',
        html: 'src/index.html',
        libsCss: [
            'src/libs/slick-carousel/slick/slick.css',
            'src/libs/@fancyapps/fancybox/dist/jquery.fancybox.min.css'
        ],
        libsJs: [
            'src/libs/jquery/dist/jquery.js',
            'src/libs/slick-carousel/slick/slick.js',
            'src/libs/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
            'src/libs/inputmask/dist/jquery.inputmask.bundle.js'
        ],
        css:      'src/css/',
        style:    'src/styles/style.scss',
        jsInput:  'src/scripts/common.js',
        jsOutput: 'src/js/',
        img:      'src/images/**/*.*',
        fonts:    'src/fonts/**/*.*'
    },
    dist: {
        root:  'dist/',
        css:   'dist/css/',
        js:    'dist/js/',
        img:   'dist/images/',
        fonts: 'dist/fonts/'
    },
    watch: {
        html:  'src/index.html',
        style: 'src/styles/**/*.scss',
        js:    'src/scripts/**/*.js',
        img:   'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
},
config = {
    server: {
        baseDir: "./src"
    },
    port:      8080,
    tunnel:    false,
    notify:    false,
    logPrefix: 'browserSync'
};

/* Сборка для разработки */
gulp.task('libs-css:dev', gulp.series(() => {
    return gulp.src(path.src.libsCss)
               .pipe(concat('libs.min.css'))
               .pipe(gulp.dest(path.src.css));
}));

gulp.task('libs-js:dev', gulp.series(() => {
    return gulp.src(path.src.libsJs)
               .pipe(concat('libs.min.js'))
               .pipe(gulp.dest(path.src.jsOutput));
}));

gulp.task('style:dev', gulp.series(() => {
    return gulp.src(path.src.style)
               .pipe(sass({ outputStyle: 'open' }))
               .on("error", notify.onError({
                   message: "Error: <%= error.message %>",
                   title: "Error running something"
               }))
               .pipe(prefixer())
               .pipe(gulp.dest(path.src.css))
               .pipe(browserSync.stream());
}));

gulp.task('js:dev', gulp.series(() => {
    return gulp.src(path.src.jsInput)
               .pipe(include())
               .pipe(babel({
                   presets: ['@babel/env']
               }))
               .on("error", notify.onError({
                   message: "Error: <%= error.message %>",
                   title: "Error running something"
               }))
               .pipe(gulp.dest(path.src.jsOutput))
               .pipe(browserSync.stream());
}));

gulp.task('clean:dev', gulp.series(() => {
    return del([
        path.src.css,
        path.src.jsOutput
    ]);
}));

gulp.task('dev', gulp.series(
    'libs-css:dev',
    'libs-js:dev',
    'style:dev',
    'js:dev'
));

gulp.task('watch', gulp.series(() => {
    browserSync.init(config);
    gulp.watch([path.watch.html]).on('change', browserSync.reload);
    gulp.watch([path.watch.style], gulp.series('style:dev'));
    gulp.watch([path.watch.js], gulp.series('js:dev'));
    gulp.watch([path.watch.img]).on('change', browserSync.reload);
    gulp.watch([path.watch.fonts]).on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('clean:dev', 'dev', 'watch'));

/* Сборка на производство */
gulp.task('html:build', gulp.series(() => {
    return gulp.src(path.src.html)
               .pipe(gulp.dest(path.dist.root));
}));

gulp.task('libs-css:build', gulp.series(() => {
    return gulp.src(path.src.libsCss)
               .pipe(cssnano())
               .pipe(concat('libs.min.css'))
               .pipe(gulp.dest(path.dist.css));
}));

gulp.task('libs-js:build', gulp.series(() => {
    return gulp.src(path.src.libsJs)
               .pipe(concat('libs.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest(path.dist.js));
}));

gulp.task('style:build', gulp.series(() => {
    return gulp.src(path.src.style)
               .pipe(sass())
               .pipe(prefixer())
               .pipe(groupMedia())
               .pipe(cssnano())
               .pipe(gulp.dest(path.dist.css));
}));

gulp.task('js:build', gulp.series(() => {
    return gulp.src(path.src.jsInput)
               .pipe(include())
               .pipe(babel({
                   presets: ['@babel/env']
               }))
               .pipe(uglify())
               .pipe(gulp.dest(path.dist.js));
}));

gulp.task('image:build', gulp.series(() => {
    return gulp.src(path.src.img)
               .pipe(imagemin('78rEl05Qy2ETiR0rnbJoMWJLQnORk0ip'))
               .pipe(gulp.dest(path.dist.img));
}));

gulp.task('fonts:build', gulp.series(() => {
    return gulp.src(path.src.fonts)
               .pipe(gulp.dest(path.dist.fonts));
}));

gulp.task('clear:production', gulp.series(() => {
    return del(path.dist.root);
}));

gulp.task('production', gulp.series(
    'clear:production',
    'html:build',
    'libs-css:build',
    'libs-js:build',
    'style:build',
    'js:build',
    'image:build',
    'fonts:build'
));