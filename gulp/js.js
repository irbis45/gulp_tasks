const gulp       = require('gulp'),
      cnf        = require('../package.json').config,
      plumber    = require('gulp-plumber'),
      notify     = require("gulp-notify"),
      sourcemaps = require('gulp-sourcemaps'),
      rename     = require('gulp-rename'),
      include    = require("gulp-include"),
      uglify     = require('gulp-uglify'),
      babel      = require('gulp-babel');

gulp.task('js', function () {
	return gulp.src(cnf.src.js.single)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sourcemaps.init({loadMaps: true}))
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
			basename: "main",
			prefix  : "",
			suffix  : ".min",
			extname : ".js"
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(cnf.dist.js));
});

gulp.task('js:watch', function () {
	gulp.watch([cnf.src.js.single, cnf.src.js.watch], ['js']);
});