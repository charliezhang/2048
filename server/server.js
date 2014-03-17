var http = require('http');
var express = require('express');
var controllers = require('./controllers.js');
var app = express();

app.use(express.bodyParser());

app.get('/scores', controllers.get_scores);
app.post('/scores', controllers.post_scores);
app.get('*', controllers.not_found);

app.listen(8123);
