var db = require('../db.js');

db.get_scores(10, function(scores) {console.log(scores);});
