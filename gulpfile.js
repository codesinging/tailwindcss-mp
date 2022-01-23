const {src, dest, watch, series} = require('gulp')
const sass = require('gulp-sass')(require('node-sass'))
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const del = require('del')

const clear = () => {
    return del([
        'dist/*.css',
        'dist/*.css.map'
    ])
}
const css = () => {
    return src('src/index.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(dest('dist'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('dist'))
}

const dev = () => {
    watch('src/**/*.scss', {ignoreInitial: false}, series(clear, css))
}

exports.dev = dev
exports.build = series(clear, css)