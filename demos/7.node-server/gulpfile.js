var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('node-server', function() {
     var isDev = true;
     var port = process.env.PORT || 8000;   // port set same as port of /server/app.js
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
        .on('restart', [], function(ev) {

        })
        .on('start', [], function(ev) {
            
        })
        .on('crash', [], function(ev) {
            
        })
        .on('exit', [], function(ev) {
            
        })
});


/**
 * 7. node-server
 * npm install --save-dev gulp gulp-nodemon express ejs
 */