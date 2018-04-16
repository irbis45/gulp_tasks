const gulp         = require('gulp'),
      cnf          = require('../package.json').config,
      plumber      = require('gulp-plumber'),
      notify       = require("gulp-notify"),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano      = require('gulp-cssnano'),
      rename       = require('gulp-rename');

gulp.task('sass', function () {
	return gulp.src(cnf.src.sass.single)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 10'],
			cascade : false
		}))
		.pipe(cssnano())
		.pipe(rename({
			dirname : "",
			basename: "main",
			prefix  : "",
			suffix  : ".min",
			extname : ".css"
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(cnf.dist.css));
});

gulp.task('sass:watch', function () {
	gulp.watch(cnf.src.sass.watch, ['sass']);
});