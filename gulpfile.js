const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');
const browsers = ['chrome', 'firefox', 'opera'];

gulp.task('del', function() {
	return del(browsers.map(bro => './addon_' + bro));
});

gulp.task('copy-typograf', function() {
    return gulp.src([
            'node_modules/typograf/dist/typograf.all.js'
        ])
        .pipe(gulp.dest('addon/popup/'));
});

browsers.forEach(function(browser) {
	gulp.task(`${browser}-copy`, function() {
		return gulp.src([`./addon/**/*`, `./${browser}/**/*`])
			.pipe(gulp.dest(`./addon_${browser}`));
	});

	gulp.task(`${browser}-pack`, function() {
		return gulp.src(`./addon_${browser}/**/*`)
			.pipe(zip(`addon_${browser}.zip`))
			.pipe(gulp.dest('.'));
	});
});

gulp.task('default', gulp.series(
    'del',
    'copy-typograf',
    gulp.parallel(...browsers.map(browser => browser + '-copy')),
    gulp.parallel(...browsers.map(browser => browser + '-pack'))
));
