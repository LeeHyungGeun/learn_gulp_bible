var gulp = require('gulp');
var useref = require('gulp-useref');
var filter = require('gulp-filter');

// useref
gulp.task('useref', function() {
    var cssFilter = filter('**/*.css', { restore: true });
    var jsFilter = filter('**/*.js', { restore: true });
    
    return gulp.src('./src/views/index.html')
        .pipe(useref({ searchPath: './' }))
        .pipe(cssFilter)
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(jsFilter.restore)
        .pipe(gulp.dest('./src'));
});


/**
 * 4. Useref
 * : Using useref to build a resources as one file on html.
 * npm install --save-dev gulp gulp-useref
 * - useref
 */