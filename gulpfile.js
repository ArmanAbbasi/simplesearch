require('babel-core/register');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPref = require('gulp-autoprefixer');
const clip = require('gulp-clip-empty-files');
const concat = require('gulp-concat');
const esLint = require('gulp-eslint');
const browserIfy = require('browserify');
const babelIfy = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const flatten = require('gulp-flatten');
const uglIfy = require('gulp-uglify');
const imageMin   = require('gulp-imagemin');
const deDupe = require('gulp-dedupe');
const jasmine = require('gulp-jasmine');
const util = require('gulp-util');

const SASS_WATCH_PATH = 'src/client/stylesheets/**/*.scss';
const SASS_ENTRY_PATH = 'src/client/stylesheets/main.scss';
const SASS_TASK_NAME = 'sass';

const ES6_ENTRY_FILE = 'src/client/main.js';
const ES6_WATCH_PATH = 'src/client/**/*.js';
const ES6_TASK_NAME = 'babel';

const LINT_WATCH_PATH = ['src/**/*.js', 'test/**/*.js'];
const LINT_TASK_NAME = 'lint';

const IMAGES_WATCH_PATH = 'src/client/images/**/*.{png,ico}';
const IMAGES_TASK_NAME = 'images';
const IMAGES_DISTRIBUTION_PATH = './dist/images';

const DISTRIBUTION_PATH = './dist';
const DEFAULT_TASK_NAME = 'default';

const TEST_PATH = 'test/**/*Spec.js';
const TEST_TASK_NAME = 'test';

/**
 * SASS compiling and compression to dist folder
 * */
gulp.task(SASS_TASK_NAME, () =>
    gulp.src(SASS_ENTRY_PATH)
        .pipe(deDupe())
        .pipe(concat('main.css'))
        .pipe(sass({
            outputStyle: 'compressed'
        })
            .on('error', util.log))
        .pipe(clip())
        .pipe(autoPref())
        .pipe(gulp.dest(DISTRIBUTION_PATH))
);

/**
 * Babel/ES6 compiling and compression to dist folder
 * */
gulp.task(ES6_TASK_NAME, () => {
    const b = browserIfy({
        entries: ES6_ENTRY_FILE,
        debug: true,
        transform: [babelIfy.configure({
            presets: ['es2015', 'babel-preset-stage-3']
        })]
    });

    return b.bundle()
        .pipe(source(ES6_ENTRY_FILE))
        .pipe(buffer())
        .pipe(flatten())
        .pipe(uglIfy())
            .on('error', util.log)
        .pipe(gulp.dest(DISTRIBUTION_PATH));
});

/**
 * Linting of the JS code
 * */
gulp.task(LINT_TASK_NAME, () =>
    gulp.src(LINT_WATCH_PATH)
        .pipe(esLint())
        .pipe(esLint.format())
        .pipe(esLint.failAfterError())
);

/**
 * Compress and move images to dist folder
 * */
gulp.task(IMAGES_TASK_NAME, () =>
    gulp.src(IMAGES_WATCH_PATH)
        .pipe(imageMin())
        .pipe(gulp.dest(IMAGES_DISTRIBUTION_PATH))
);

/**
 * Running the tests.
 * */
gulp.task(TEST_TASK_NAME, () =>
    gulp.src(TEST_PATH)
    .pipe(jasmine())
);

/**
 * One watch to rule them all :)
 * */
gulp.task(DEFAULT_TASK_NAME, () => {
    gulp.watch(SASS_WATCH_PATH, [SASS_TASK_NAME]);
    gulp.watch(ES6_WATCH_PATH, [ES6_TASK_NAME]);
    gulp.watch(LINT_WATCH_PATH, [LINT_TASK_NAME]);
    gulp.watch(IMAGES_WATCH_PATH, [IMAGES_TASK_NAME]);
    gulp.watch(TEST_PATH, [TEST_TASK_NAME]);
});