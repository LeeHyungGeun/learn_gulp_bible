var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({ lazy: true });
var del = require('del');
var browserSync = require('browser-sync');
var isDev = true;
var config = require('./gulp.config.js')();


gulp.task('clean-dev', function() {
    return clean(config.dev.root);
});
gulp.task('styles', ['clean-dev'], function() {
    log('LESS:');
    return gulp.src(config.src.styles + '*.less')
        .pipe($.plumber())
        .pipe($.less())
        .pipe(gulp.dest(config.dev.css));
});
gulp.task('vet', ['styles'], function() {
    log('vet: jshint, copy-js');
    return gulp.src(config.src.jsFiles)
        .pipe($.print())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(gulp.src(config.src.jsFiles))
        .pipe(gulp.dest(config.dev.js));
});
gulp.task('inject', ['vet'], function() {
    log('Inject:');
    var bowerOptions = config.getWiredepOptions();
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.src.index)
        .pipe(wiredep(bowerOptions))
        .pipe($.inject(gulp.src(config.dev.jsFiles)))
        .pipe($.inject(gulp.src(config.dev.cssFiles)))
        .pipe(gulp.dest(config.dev.root)); 
});
gulp.task('optimize', ['inject'], function() {
    if (!argv.optimize) {
        return true;
    }
    log('Optimize: ');
    var cssFilters = $.filter('**/*.css', { restore: true });
    var jsFilters = $.filter('**/*.js', { restore: true });

    return gulp.src(config.dev.index)
        .pipe($.useref({searchPath: './' }))  
        .pipe(cssFilters)
        .pipe($.csso())
        .pipe($.rev())
        .pipe(cssFilters.restore)
        .pipe(jsFilters)
        .pipe($.uglify())
        .pipe($.rev())
        .pipe(jsFilters.restore)
        .pipe($.revReplace())
        .pipe(gulp.dest(config.dev.root))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.dev.root));
});
gulp.task('serve-dev', ['optimize'], function() {
    var isDev = true;
    var nodeOptions = config.getNodeOptions(isDev);

    return $.nodemon(nodeOptions)
        .on('restart', function(event) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + event);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: true});
            }, config.delay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync();
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
});

gulp.task('build', function() {
    // TODO : to copy on build
});

// Log to write on console by string or object
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}

// Clean to remove a file or directory
function clean(path, done) {
    log('Clean: path -> ' + path);
    return del(path, done);
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
    if(browserSync.active) {
        return;
    }
    var bsOptions = config.getBrowserSyncOptions();
    log('Starting browser-sync on port ' + bsOptions.port);

    gulp.watch([config.src.styles + '**/*.less'], ['optimize'])
        .on('change', function(event) { changeEvent(event); });

    gulp.watch([config.src.js + '**/*.js'], ['optimize'])
        .on('change', function(event) { changeEvent(event); });

    browserSync(bsOptions);
}