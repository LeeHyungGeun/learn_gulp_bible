var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');

// CSS: analytics, autoprefixer and optimization
gulp.task('css', function() {
    var cssFilter = filter('**/*.css', { restore: true });   // restore is turn back to origin.
    gulp.src('./src/**/*.*')
        .pipe(cssFilter)
        .pipe(plumber())    // CSS Analystics
        .pipe(autoprefixer({ browsers: ['last 2 version', '> 5%',]}))    // support for last 2 versions
        .pipe(csso())   // optimization
        .pipe(gulp.dest('./build/'));
});

// JavaScript: analytics and optimization
gulp.task('javascript', function() {
    var jsFilter = filter('**/*.js', { restore: true });    // restore is turn back to origin.
    gulp.src('./src/**/*.*')
        .pipe(jsFilter)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));
});

// Images: optimization
gulp.task('images', function() {
    var imageFilter = filter('**/*.jpeg', { restore: true });   // restore is turn back to origin.
    gulp.src('./src/**/*.*')
        .pipe(imageFilter)
        .pipe(imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest('./build/'));
});


/**
 * 3. Optimize by full option
 * : Introduce about optimization of CSS, JavaScript and Image
 * npm install --save-dev gulp gulp-csso gulp-uglify gulp-imagemin gulp-filter gulp-plumber jshint gulp-jshint jshint-stylish gulp-autoprefixer
 * - css: gulp css
 * - js: gulp javascript
 * - image: gulp images
 */