const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
// 合併檔案
const concat = require('gulp-concat');
// Sass
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
// const  autoprefixer = require('gulp-autoprefixer');
const autoprefixer = require('autoprefixer');

const cssnano = require('cssnano');

// 圖片壓縮
const gulpImagemin = require('gulp-imagemin');
// const browserSync = require("browser-sync").create();

gulp.task('img', () => {
    return gulp
        .src('assets/img/**')
        .pipe(gulpImagemin())
        .pipe(gulp.dest('assets/dist/img/'));
});

// 將編譯器調整為 Dart Sass
// sass.compiler = require('dart-sass');

// Sass 編譯
gulp.task('sass', () => {
    return gulp
        .src('assets/scss/*.scss')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass({
                outputStyle: 'expanded'
            }).on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.', {
            sourceRoot: '../scss/'
            // 寫入Sourcemaps 到當前資料夾(以下下列 dest('assets/css')為基準點，
            // SourceRoot：以匯出的資料夾為基準點找他原本的scss資料夾位置。
        }))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('watch', () => {
    gulp.watch('assets/scss/*.scss', gulp.series('sass'));
});












