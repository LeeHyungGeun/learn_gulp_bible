var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var port = process.env.PORT || 8000;   // port set same as port of /server/app.js

var browserSyncOptions = {
    delay: 10    // 1 sec for delay to reload
};

gulp.task('node-server', function() {
     var isDev = true;
     
     var nodeOptions = {
         script: './src/server/app.js', // server file path
         delayTime: 1,
         env: {
             'PORT': port,
             'NODE_ENV': isDev ? 'dev' : 'build'    // is it dev or build
         },
         watch: ['./src/server']    // which path to watch
     };

     return nodemon(nodeOptions)
        .on('restart', function(ev) {
            console.log('*** nodemon restarted');
            console.log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now...');
                browserSync.reload({ stream: false });
            }, browserSyncOptions.delay); 
        })
        .on('start', [], function(ev) {
            console.log('*** nodemon started');
            startBrowserSync();
        })
        .on('crash', [], function(ev) {
            console.log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', [], function(ev) {
            console.log('*** nodemon exited cleanly');
        });
});

function startBrowserSync() {
    if (browserSync.active) {   // if it is already active, do not need to start again.
        return;
    }

    // special watch for less to compile and to call the task.
    gulp.watch(['./src/client/less/']/*['styles']*/)
        .on('change', function(event) { changeEvent(event)});

    var options = {
        proxy: 'localhost:' + port,
        files: [
            './src/client/' + '**/*.*',
            '!' + './src/client/less/'  // exclude path
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: browserSyncOptions.delay
    };

    browserSync(options);
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    console.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}


/**
 * 7. node-server with browsersync
 * npm install --save-dev gulp gulp-nodemon browser-sync express ejs
 * node-server: gulp node-server
 */