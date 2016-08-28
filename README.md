# Learn_gulp_bible
You can get a sample of gulp from basic to development environment.

## Demo
### 1. default
```
introduce a default of gulp

:src, pipe, dest, concat, default
``` 

### 2. optimize
```
optimize by uglify, csso and imagemin

:gulp-uglify, gulp-csso, gulp-imagemin
```

### 3. optimize_full
```
optimize with code analytics: jshint and plumber

:gulp-uglify, gulp-csso, gulp-imagemin, gulp-plumber, gulp-jshint
```

### 4. inject
```
inject a library into index.html file

:gulp-inject, gulp-filter, wiredep
```

### 5. useref
```
get a reference file from index.html

:gul-useref, gulp-filter
```

### 6. rev 
```
manage a reference version and change the name of it's

:gulp-rev, gulp-rev-replace, gulp-useref, gul-filter
```

### 7. node-server
```
open a node server

:gulp-nodemon, express, ejs
```

### 8. node-server_browsersync
```
open a node server with browser-sync

:gulp-nodemon, browser-sync, express, ejs 
```

### 9. utilities
```
introduce gulp utilities

:gulp-util, del, gulp-print, yargs, gulp-jshint, gulp-bump, gulp-load-plugins
```

### 10. develop
```
Development environment with all:optimize, inject, rev, node-server and browser-sync

command: gulp develop
options: --optimize -> do optimize
```

### Introduce
```
gulpfile.js: a default gulp file.
gulpconfig.js: a config file of gulp.
bower.json: a package file of bower
package.json: a pacakge file of npm
src: a source directory
- styles: Less
- js: JavaScript
- views: HTML:index.html
dev: a result directory after gulp develop --optimize 
```

### Conclusion
You can make a development environment with command: 
```
gulp develop --optimize
``` 


### References
- JavaScript Build Automation With Gulp.js <br />
https://app.pluralsight.com/library/courses/javascript-build-automation-gulpjs