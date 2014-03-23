var sqlite3 = require('sqlite3').verbose();
var configs = require('./configs.js');
var db = new sqlite3.Database(configs.SQLITE_FILENAME);

exports.get_scores = function(limit, offset, cb) {
  var scores = [];
  db.each('SELECT rowid, * FROM scores ORDER BY score DESC LIMIT ? OFFSET ?', limit || 10, offset || 0, function (err, row) {
    scores.push({
        'nickname': row.nickname,
        'score': row.score,
        'max_number': row.max_number,
        'time_used': row.time_used,
        'country': row.country,
        'id': row.rowid,
        'timestamp': row.timestamp,
    });
  }, function() {
    cb(scores)
  });
}

exports.get_score = function(id, cb) {
  if (!id) {
    cb(null, "Invalid id");
  }
  db.get('SELECT * FROM scores WHERE rowid = ?', id, cb);
}

exports.seed_exists = function(seed) {
  // TODO
  return false;
  //  db.get('SELECT seed FROM scores WHERE seed = ?', seed, function(row, err) {
  // }
}

exports.add_score = function(row, cb) {
  db.run('INSERT INTO scores VALUES (?,?,?,?,?,?,?,?,?)',
     [row.nickname, row.score, row.max_number, row.time_used, row.country, JSON.stringify(row.payload), row.payload.seed,
      Math.round(Date.now()), row.contact],
     cb
  );
}
