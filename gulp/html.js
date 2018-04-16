const gulp        = require('gulp'),
      cnf         = require('../package.json').config,
      plumber     = require('gulp-plumber'),
      notify      = require("gulp-notify"),
      fileinclude = require('gulp-file-include');

gulp.task('html', function () {
	return gulp.src(cnf.src.html.single)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(fileinclude({
			prefix  : '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(cnf.dist.html));
});

gulp.task('html:watch', function () {
	gulp.watch(cnf.src.html.watch, ['html']);
});