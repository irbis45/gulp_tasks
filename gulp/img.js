const gulp     = require('gulp'),
      cnf      = require('../package.json').config,
      plumber  = require('gulp-plumber'),
      notify   = require("gulp-notify"),
      imagemin = require('gulp-imagemin');

gulp.task('img', function () {
	gulp.src(cnf.src.img.nocompress)
		.pipe(gulp.dest(cnf.dist.img));
	gulp.src(cnf.src.img.compress)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: false},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(cnf.dist.img));
});

gulp.task('img:watch', function () {
	gulp.watch([cnf.src.img.nocompress, cnf.src.img.compress], ['img']);
});