// gulpfile.js
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
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
// const  autoprefixer = require('gulp-autoprefixer');
// 圖片壓縮
const gulpImagemin = require('gulp-imagemin');

// const del = require('del');
// const runSequence = require('run-sequence');
// const ghPages = require('gulp-gh-pages');

// const browserSync = require("browser-sync").create();

// const paths = {
//     src: '',
//     dest: 'dist/'
// };

// //每次編譯前先移除原有檔案
// function clean() {
//     return del();
// }

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
            })
            .on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        // , cssnano()
        .pipe(sourcemaps.write('.', {
            sourceRoot: '../scss/'
            // 寫入Sourcemaps 到當前資料夾(以下下列 dest('assets/css')為基準點，
            // SourceRoot：以匯出的資料夾為基準點找他原本的scss資料夾位置。
        }))
        .pipe(gulp.dest('assets/css'))
    // .pipe(browserSync.stream())
});

gulp.task('watch', () => {
    gulp.watch('assets/scss/*.scss', gulp.series('sass'));
});

// gulp.task('deploy', () => {
//     return gulp
//         .src('dist/**/*')
//         .pipe($.ghPages());
// });



// git clone https://github.com/Barry028/eHrApp.git
// function sass() {
//     return (
//         gulp.src('scss/*.scss')
//         .pipe(sourcemaps.init({
//             loadMaps: true
//         }))
//         // Initialize sourcemaps before compilation starts
//         .pipe(sass({
//             outputStyle: 'expanded' //nested expanded compact compressed
//         }))
//         .on("error", sass.logError)
//         // Use postcss with autoprefixer and compress the compiled file using cssnano
//         .pipe(postcss([autoprefixer(), cssnano()]))
//         // Now add/write the sourcemaps
//         .pipe(sourcemaps.write('.', {
//             includedContent: false,
//             sourceRoot: '../scss'
//         }))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.stream())
//     );
// }


// We don't have to expose the reload function
// It's currently only useful in other functions

// function scripts() {
//     return gulp.src(paths.src, {
//             sourcemaps: true
//         })
//         .pipe(babel()) // 使用babel轉成瀏覽器所看的懂的JavaScript
//         .pipe(uglify()) // 將程式碼壓縮成一行
//         //.pipe(concat('index.min.js')) // 合併所有檔案
//         .pipe(gulp.dest(paths.dest)); // 編譯後產出到指定資料夾中
// }



// function nodemons(done) {
//     nodemon({
//         script: 'dist/index.js' // 使用nodemon監聽指定的程式碼
//             ,
//         ext: 'js' // 監聽JavaScript
//             ,
//         watch: paths.src // watch ES2015 code
//             ,
//         tasks: ['default'] // compile synchronously onChange
//             ,
//         env: {
//             'NODE_ENV': 'development'
//         }
//     })
//     done();
// }



// const build = gulp.series(clean, gulp.parallel(scripts));
// const serve = gulp.series(clean, scripts, nodemons);

// // deploy product
// gulp.task('default', build);
// // development 開發模式
// gulp.task('serve', serve);


// gulp.task('watch', function() {
//     gulp.watch('scss/*.scss', gulp.series('sass'));

// });