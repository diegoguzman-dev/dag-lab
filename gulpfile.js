var config = require('./dag-lab-config.js'),
	endTaskMsg = config.endTaskMsg,
	fileChangedMsg = config.fileChangedMsg,
	handleError = config.handleError,
	paths;
	if (config.paths) { paths = config.paths;}
	
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	prefix = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
		connect = require('connect'),
		server = connect(),
		serveStatic = require('serve-static'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass');

gulp.task('index', function(){
	gulp.src(paths.htm)
	.pipe(concat('index.html'))
		.on('error', handleError)
	.pipe(gulp.dest(paths.html));
});

gulp.task('sass', function () {
	gulp.src(paths.sass)
	.pipe(sass({sourcemap: true}))
		.on('error', handleError)
	.pipe(prefix('last 2 versions'))
	.pipe(gulp.dest(paths.css));

	endTaskMsg();
});

gulp.task('server', function(next) {

  server.use(serveStatic('./dist/')).listen(process.env.PORT || 80, next);
});


gulp.task('uglify', function () {
	gulp.src(paths.js)
		.pipe(uglify())
			.on('error', handleError)
		.pipe(gulp.dest(paths.jsmin));
});

gulp.task('uglify-dbug', function () {
	gulp.src(paths.js)
		.pipe(gulp.dest(paths.jsmin));
});

gulp.task('watch', ['server'], function() {
  livereload.listen();

	gulp.watch(paths.css + '/*.css').on('change', livereload.changed);

	gulp.watch(paths.htm, ['index']).on('change', function(file){
		fileChangedMsg(file);
	});

	gulp.watch(paths.html + '**/*.html').on('change', livereload.changed);

	gulp.watch(paths.jsmin + '**/*.js').on('change', livereload.changed);

	gulp.watch(paths.sass, ['sass']).on('change', function(file){
		fileChangedMsg(file);
	});
});

gulp.task('default', ['server', 'watch']);