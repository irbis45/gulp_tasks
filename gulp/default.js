const gulp        = require('gulp'),
      runSequence = require('run-sequence');

gulp.task('default', function () {
	runSequence(
		'build',
		[
			'sass:watch',
			'js:watch',
			'html:watch',
			'libs:watch',
			'fonts:watch',
			'img:watch',
		],
		'server'
	);
});