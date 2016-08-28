var gulp = require('gulp');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace')
var filter = require('gulp-filter');

// useref
gulp.task('rev', function() {
    var cssFilter = filter('**/*.css', { restore: true });
    var jsFilter = filter('**/*.js', { restore: true });
    
    return gulp.src('./src/views/index.html')
        .pipe(useref({ searchPath: './' }))
        .pipe(cssFilter)
        .pipe(rev())
        .pipe(cssFilter.restore)
        
        .pipe(jsFilter)
        .pipe(rev())
        .pipe(jsFilter.restore)

        .pipe(revReplace())
        .pipe(gulp.dest('./src'))

        // make a manifest
        .pipe(rev.manifest())
        .pipe(gulp.dest('./src'));
});


/**
 * 4. rev rev-replace
 * : Using rev and rev-replace by useref to change a resource version on HTML.
 * npm install --save-dev gulp gulp-rev gulp-rev-replace gulp-rev-manifest gulp-useref
 * - rev: gulp rev
 */