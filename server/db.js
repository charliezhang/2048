var sqlite3 = require('sqlite3').verbose();
var configs = require('./configs.js');
var db = new sqlite3.Database(configs.SQLITE_FILENAME);

exports.get_scores = function(limit, cb) {
  var scores = [];
  db.each('SELECT * FROM scores ORDER BY score DESC LIMIT ?', limit || 10, function (err, row) {
    scores.push({
        'nickname': row.nickname,
        'score': row.score,
        'max_number': row.max_number,
        'time_used': row.time_used,
        'country': row.country,
    });
  }, function() {
    cb(scores)
  });
}

exports.seed_exists = function(seed) {
  // TODO
  return false;
  //  db.get('SELECT seed FROM scores WHERE seed = ?', seed, function(row, err) {
  // }
}

exports.add_score = function(row, cb) {
  db.run('INSERT INTO scores VALUES (?,?,?,?,?,?)',
     [row.nickname, row.score, row.max_number, row.time_used, row.country, row.payload],
     cb
  );
}
