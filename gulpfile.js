'use strict';

const
    del = require('del'),
    gulp = require('gulp'),
    zip = require('gulp-zip'),
    browsers = ['chrome', 'firefox', 'opera'];

gulp.task('del', function() {
	return del(browsers.map(bro => './addon_' + bro));
});

gulp.task('copy-typograf', ['del'], function() {
    return gulp.src([
            'node_modules/dist/typograf.all.js'
        ])
        .pipe(gulp.dest('addon/popup/'));
});

browsers.forEach(function(browser) {
	gulp.task(`${browser}-copy`, ['copy-typograf'], function() {
		return gulp.src([`./addon/**/*`, `./${browser}/**/*`])
			.pipe(gulp.dest(`./addon_${browser}`));
	});

	gulp.task(`${browser}-pack`, [`${browser}-copy`], function() {
		return gulp.src(`./addon_${browser}/**/*`)
			.pipe(zip(`addon_${browser}.zip`))
			.pipe(gulp.dest('.'));
	});
});

gulp.task('default', browsers.map(browser => browser + '-pack'));
