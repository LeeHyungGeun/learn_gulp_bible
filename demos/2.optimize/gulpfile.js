var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('javascript', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('images', function() {
    return gulp.src('./src/images/*.jpeg')
        .pipe(imagemin({ optimizationLevel: 4 }))   // optimization level for 4
        .pipe(gulp.dest('./build/images'));
});

/**
 * 2. Optimize
 * : Introduce about optimization of CSS, JavaScript and Image
 * npm install --save-dev gulp gulp-csso gulp-uglify gulp-imagemin
 * - css: gulp css
 * - js: gulp javascript
 * - image: gulp images
 */
