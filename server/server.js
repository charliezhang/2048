var http = require('http');
var express = require('express');
var controllers = require('./controllers.js');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.bodyParser());

app.get('/scores', controllers.get_scores);
app.post('/scores', controllers.post_scores);
app.get('*', controllers.not_found);

app.listen(8123);
