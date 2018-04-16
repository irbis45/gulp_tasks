const gulp      = require('gulp'),
      cnf       = require('../package.json').config,
      plumber   = require('gulp-plumber'),
      notify    = require("gulp-notify"),
      cssnano   = require('gulp-cssnano'),
      rename    = require('gulp-rename'),
      importCss = require('gulp-import-css'),
      babel     = require('gulp-babel'),
      uglify    = require('gulp-uglify'),
      include   = require("gulp-include");

gulp.task('libs', function () {
	gulp.src(cnf.libs.css)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(importCss())
		.pipe(cssnano())
		.pipe(rename({
			dirname : "",
			basename: "libs",
			prefix  : "",
			suffix  : ".min",
			extname : ".css"
		}))
		.pipe(gulp.dest(cnf.dist.css));


	gulp.src(cnf.libs.js)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(include({
			extensions: "js",
			hardFail  : true
		}))
		.pipe(babel({
			presets: ['env', 'stage-0'],
			plugins: ['transform-decorators']
		}))
		.pipe(uglify())
		.pipe(rename({
			dirname : "",
			basename: "libs",
			prefix  : "",
			suffix  : ".min",
			extname : ".js"
		}))
		.pipe(gulp.dest(cnf.dist.js));
});

gulp.task('libs:watch', function () {
	gulp.watch(cnf.libs.css, ['libs']);
	gulp.watch(cnf.libs.js, ['libs']);
});