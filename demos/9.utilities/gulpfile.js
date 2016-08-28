var gulp = require('gulp');
var util = require('gulp-util')
var del = require('del');
var print = require('gulp-print');
var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var bump = require('gulp-bump');
var $ = require('gulp-load-plugins')({ lazy: true });


// log to show log by string and object
gulp.task('log', function() {
    log('*** Log ');
});

// log support for string and object
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var key in msg) {
            if (msg.hasOwnProperty(key)) {
                util.log(util.colors.blue(msg[key]));
            }
        }
    }
    else {
        util.log(util.colors.yellow(msg));
    }
}

// del to remove files
gulp.task('clean', function() {
    var filePath = './files';
    return del(filePath);
});

function clean(path, done) {
    log('Cleaning: ' + util.colors.blue(path));
    return del(path, done);
}

// print: print a name of filepaths to the console.
// yargs
gulp.task('print', function() {
    var premsg = '';
    
    gulp.src('./files')
        .pipe(print(function(filepath) {
            if (argv.premsg) {  // if with --premsg argument
                premsg = 'File name: ';
            }
            return premsg + filepath;
        }));
});

// jshint: JavaScript Code Analytics
gulp.task('jshint', function() {
    gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// bump: manage a version of package.json and bower.json 
/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the major version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific and ignore other flags
 */
gulp.task('bump', function() {
    var msg = 'Bump versions';
    var type = argv.type;
    var version = argv.version;
    var options = {};

    if (version) {
        options.version = version;
        msg += ' to ' + version;
    }
    else {
        options.type = type;
        msg += ' for a ' + type; 
    }

    return gulp.src(['package.json', 'bower.json'])
        .pipe(print())
        .pipe(bump(options))
        .pipe(gulp.dest('./'));    
});

/**
 * 9. Utilities
 * npm install --save-dev gulp gulp-util del gulp-print yargs jshint gulp-jshint jshint-sylish gulp-bump
 * - log gulp log
 * - clean gulp clean
 * - print gulp print
 * - yargs gulp print --premsg
 * - jshint gulp jshint
 * - bump gulp bump
 * - load-plugins
 */