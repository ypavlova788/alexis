const { watch, src, dest } = require('gulp');
const sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

function copyJsLibraries() {
    return src([
        'node_modules/animate-scroll-to-hash/dist/animate-scroll-to-hash.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
        'node_modules/wowjs/dist/wow.min.js',
    ])
        .pipe(dest('build/js'));
}

function copyCssLibraries() {
    return src([
        'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
        'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
        'node_modules/animate.css/animate.min.css',
    ])
        .pipe(dest('build/css'));
}

function css() {
  // body omitted
  return src('src/scss/*.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoPrefixer({
      cascade: false
    }))
    .pipe(dest('build/css'));
}

exports.default = function() {
  // You can use a single task
  copyJsLibraries();
  copyCssLibraries();
  css();
  watch('src/scss/*.scss', css);
};