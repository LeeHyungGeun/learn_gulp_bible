var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;
var dev = '../../dev/';
var bower_components = './bower_components';

var clientOptions = {
    index: path.join(__dirname, dev + 'index.html'),
    dev: path.join(__dirname, dev),
    bower_components: bower_components
};

app.engine('html', require('ejs').renderFile);
app.use(express.static(clientOptions.dev));
app.use('/dev', express.static(clientOptions.dev));
app.use('/bower_components', express.static(clientOptions.bower_components));
app.get('/index', function(req, res) {
    res.render(clientOptions.index);
    res.end();
});

http.createServer(app).listen(port);