var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('gulpsass', () => {
	return gulp.src('./src/scss/*.scss')
		.pipe(gulpSass())
		.pipe(gulp.dest('./src/css'))
})

gulp.task('webserver', () => {
	gulp.src('./src')
		.pipe(webserver({
			port: 7788,
			open: true,
			livereload: true,
			proxies: [{
					source: '/api/submit',
					target: 'http://localhost:3000/api/submit'
				},
				{
					source: '/api/login',
					target: 'http://localhost:3000/api/login'
				},
				{
					source: '/api/render',
					target: 'http://localhost:3000/api/render'
				},
				{
					source: '/api/remove',
					target: 'http://localhost:3000/api/remove'
				},
				{
					source: '/api/update',
					target: 'http://localhost:3000/api/update'
				},
				{
					source: '/api/search',
					target: 'http://localhost:3000/api/search'
				}
			]
		}))
})

gulp.task('dev', gulp.series('gulpsass', 'webserver'))
