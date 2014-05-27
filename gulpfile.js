var gulp = require('gulp');

var gutil = require('gulp-util');

var less = require('gulp-less'),
	minify = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean');

gulp.task('less', function() {
	return gulp.src('./less/theme.less')
		.pipe(less())
		.on('error', gutil.log)
		.pipe(gulp.dest('./dist'))
});

gulp.task('minify', ['clean-minified'], function() {
	return gulp.src('./dist/*.css')
		.pipe(minify({
			keepBreaks: true
		}))
		.pipe(rename(function(path) {
			path.extname = '.min.css';
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('./dist'))
});

gulp.task('clean-minified', function() {
	return gulp.src('./dist/*.min.css')
		.on('error', gutil.log)
		.pipe(clean());
});

gulp.task('build', ['less', 'minify']);

gulp.task('watch', ['less'], function() {
	gulp.watch('less/**/*.less', ['less']);
});