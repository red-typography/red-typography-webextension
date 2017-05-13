'use strict';

const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('copy-typograf', function() {
    return gulp.src([
            'node_modules/dist/typograf.all.js'
        ])
        .pipe(gulp.dest('addon/popup/'));
});

gulp.task('pack-extension', ['copy-typograf'], function() {
    return gulp.src('./addon/**/*')
        .pipe(zip('addon.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['pack-extension']);

