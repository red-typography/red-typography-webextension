'use strict';

const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('del', function() {
    return del(['./addon_chrome', './addon_firefox']);
});

gulp.task('copy-typograf', ['del'], function() {
    return gulp.src([
            'node_modules/dist/typograf.all.js'
        ])
        .pipe(gulp.dest('addon/popup/'));
});

gulp.task('chrome-copy', ['copy-typograf'], function() {
    return gulp.src(['./addon/**/*', './chrome/**/*'])
        .pipe(gulp.dest('./addon_chrome'));
});

gulp.task('firefox-copy', ['copy-typograf'], function() {
    return gulp.src(['./addon/**/*', './firefox/**/*'])
        .pipe(gulp.dest('./addon_firefox'));
});

gulp.task('chrome-pack', ['chrome-copy'], function() {
    return gulp.src('./addon_chrome/**/*')
        .pipe(zip('addon_chrome.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('firefox-pack', ['firefox-copy'], function() {
    return gulp.src('./addon_firefox/**/*')
        .pipe(zip('addon_firefox.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['chrome-pack', 'firefox-pack']);
