/* DT207G - Backend-baserad webbutveckling
 * Moment 4
 * Linn Eriksson, VT24
 */

//Variables to include in NPM-packages
const {src, dest, watch, series, parallel} = require("gulp");
const browserSync = require('browser-sync').create();
const htmlminify = require('gulp-html-minifier-terser');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;

//Paths
const files = {
    htmlPath: "src/**/*.html",
    sassPath: "src/css/**/*.scss",
    jsPath: "src/js/**/*.js",
    imagePath: "src/images/*"
}

//HTML-task
function htmlTask() {
    return src(files.htmlPath)
    .pipe(htmlminify({collapseWhitespace:true, removeComments:true, removeEmptyElements:false}))
    .pipe(dest('pub'))
}

//SASS-task
function sassTask() {
    return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest("pub/css"))
    .pipe(browserSync.stream());
}


//JS-task
function jsTask() {
    return src(files.jsPath)
    .pipe(uglify())
    .pipe(dest('pub/js'));
}

//Image-task
function imageTask() {
    return src(files.imagePath)
    .pipe(dest('pub/images'));
}

//Watcher
function watchTask() {

    browserSync.init({
        server: "./pub"
    });

    watch([files.htmlPath, files.sassPath, files.jsPath, files.imagePath], parallel(htmlTask, sassTask, jsTask, imageTask)).on('change', browserSync.reload);
}

//Run all tasks above
exports.default = series(
    parallel(htmlTask, sassTask, jsTask, imageTask),
    watchTask
);