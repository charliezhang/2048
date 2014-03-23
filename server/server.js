var http = require('http');
var express = require('express');
var controllers = require('./controllers.js');
var handlers = require('./handlers.js');
var cors = require('cors');
var app = express();

process.on('uncaughtException', function(err) {
  console.log('Uncaught exception: ' + err);
});

app.use(cors());
app.use(express.bodyParser());
app.use(express.errorHandler());

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.get('/score', controllers.get_score);
app.get('/scores', controllers.get_scores);
app.post('/scores', controllers.post_scores);
app.get('*', controllers.not_found);

app.listen(8123);
