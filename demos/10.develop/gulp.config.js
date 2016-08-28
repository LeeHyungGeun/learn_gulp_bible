module.exports = function() {
    var root = './';
    var dev = './dev/';
    var build = './build/';
    var src = root + 'src/';
    var server = src + 'server/';
    var client = src + 'client/';
    var options = {};
    var nodeport = process.env.PORT || 8000;
    var bsport = 3000; 
    var delay = 1;

    var config = {
        delay: delay, 
        server: server,

        packages: [
            'package.json',
            'bower.json'
        ],

        // Source
        src: {
            styles: client + 'styles/',
            js: client + 'js/',
            jsFiles: [
                client + 'js/**/*.js',
                client + 'js/**/*.module.js',
                '!' + client + 'js/**/*.spec.js'
            ],
            index: client + 'views/index.html'
        },

        // Develop
        dev: {
            css: dev + 'css/',
            js: dev + 'js/',
            jsFiles: [
                dev + 'js/**/*.js',
                dev + 'js/**/*.module.js',
                '!' + dev + 'js/**/*.spec.js'
            ],
            cssFiles: [
                dev + 'css/**/*.css'
            ],
            index: dev + 'index.html',
            root: dev
        },
        
        // Build
        build: {
            css: build + 'css/',
            js: build + 'js/',
            index: build + 'index.html',
            root: build
        },

        // filters
        filters: {
            js: [
                '/**/*.js',
                '/**/*.module.js'
                // '!' + client + 'js/**/*.spec.js'
            ],
            css: [
                '/**/*.css'
            ]
        }
    }

    config.getWiredepOptions = function() {
        options = {
            bowerJson: require(root + 'bower.json'),
            directory: root + 'bower_components',
            ignorePath: '../../..'
        };
        return options;
    };

    config.getBowerOptions = function() {
        options = {
            
        };
        return options;
    };

    config.getNodeOptions = function(_isDev) {
        var isDev = _isDev || true;
        options = {
            nodeServer: server + 'app.js',
            script: server + 'app.js',
            delayTime: 1, 
            env: {
                'PORT': nodeport,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [config.server]

        };
        return options;
    };

    config.getBrowserSyncOptions = function() {
        options = {
            proxy: 'localhost:' + nodeport,
            port: bsport,
            files: [
                dev + '**.*'
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
            reloadDelay: delay
        };
        return options;
    };

    return config;
};