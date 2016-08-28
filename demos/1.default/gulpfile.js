var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {   // default task is default on gulp, for example, if you command gulp, the gulp just look for default task.
    var jsfiles = ['a.js', 'b.js', 'c.js'];
    gulp.src(jsfiles)   // src is gulp's own method, to get a file onto stream
        .pipe(concat('all.js')) // concat is to make a stream as one file 
        .pipe(gulp.dest('./')); // dest is also gulp's own method, to store as file with path
});

/**
 * 1. Default
 * : Introduce about default of gulp
 * npm install --save-dev  gulp gulp-concat
 * - src
 * - pipe
 * - concat
 * - dest
 */