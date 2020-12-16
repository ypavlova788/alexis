const { watch, src, dest } = require('gulp');
const sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

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
  css();
  watch('src/scss/*.scss', css);
};