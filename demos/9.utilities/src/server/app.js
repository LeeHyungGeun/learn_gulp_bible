var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;

var client = '../client/';

var clientOptions = {
    index: path.join(__dirname, client + 'views/index.html'),
    client: path.join(__dirname, client)
};

app.engine('html', require('ejs').renderFile);
app.use(express.static(clientOptions.client));
app.get('/', function(req, res) {
    res.render(clientOptions.index);
    // res.write('alesrt');
    res.end();
});

http.createServer(app).listen(port);