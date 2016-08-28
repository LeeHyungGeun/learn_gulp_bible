var gulp = require('gulp');
var inject = require('gulp-inject');
var filter = require('gulp-filter');

// inject
gulp.task('inject', function() {
    var config = getConfig();
    var options = getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    
    return gulp.src(config.index)
        .pipe(wiredep(options)) // this is to inject Bower Libraries
        .pipe(inject(gulp.src(config.css))) // this is to inject customer CSS
        .pipe(inject(gulp.src(config.js)))  // this is to inject customer JavaScript
        .pipe(gulp.dest(config.src));
});

// This is options of injecting a bower library for wiredep.
function getWiredepDefaultOptions() {
    var options = {
        bowerJson: require('./bower.json'),
        directory: './bower_components/',
        ignorePath: '../../'    // this is important. It can be removed don't need path from index.html to bower_components. For example: ../../ of  ../../bower_components/
    };
    return options;
}

// config to set to inject
function getConfig() {
    var src = './src/';
    var config = {
        src: './src/',
        js: [
            src + '**/*.js',
            src + '**/*.module.js',
            '!' + src + '**/*.spec.js'  // '!' mean is that exclude
        ],
        css: src + '**/*.css',
        index: src + 'views/index.html'
    };
    return config;
}

/**
 * 4. Inject
 * : Inject a resource on HTML.
 * npm install --save-dev gulp gulp-inject gulp-filter wiredep
 * - inject: gulp inject
 */