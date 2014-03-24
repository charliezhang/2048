var sqlite3 = require('sqlite3').verbose();
var configs = require('./configs.js');
var db = new sqlite3.Database(configs.SQLITE_FILENAME);
var escape = require('escape-html');

function row_to_score_obj(row) {
    return {
        'nickname': escape(row.nickname),
        'score': row.score,
        'max_number': row.max_number,
        'time_used': row.time_used,
        'country': escape(row.country),
        'id': row.rowid,
        'timestamp': row.timestamp,
    };
}

exports.get_scores = function(limit, offset, cb) {
  if (limit > 100) {
    limit = 100;
  }

  var scores = [];
  db.each('SELECT rowid, * FROM scores ORDER BY score DESC LIMIT ? OFFSET ?', limit || 10, offset || 0, function (err, row) {
    scores.push(row_to_score_obj(row));
  }, function() {
    cb(scores);
  });
}

exports.get_scores_by_name = function(nickname, limit, offset, cb) {
  if (!nickname) {
    cb([]);
    return;
  }
  
  if (limit > 100) {
    limit = 100;
  }

  var scores = [];
  db.each('SELECT rowid, * FROM scores WHERE nickname LIKE ? LIMIT ? OFFSET ?', '%' + nickname + '%', limit || 10, offset || 0, function (err, row) {
    scores.push(row_to_score_obj(row));
  }, function() {
    cb(scores);
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

exports.add_score = function(row, ip, cb) {
  var ts = Math.round(Date.now());
  db.serialize(function() {
    db.run('INSERT INTO scores VALUES (?,?,?,?,?,?,?,?,?,?)',
       [row.nickname, row.score, row.max_number, row.time_used, row.country, JSON.stringify(row.payload), row.payload.seed,
        ts, row.contact, ip],
        function(err) {
          if (err) {
            cb(err, null);
            return;
          }

          db.get('SELECT COUNT(score) as rank FROM scores WHERE score < ? OR' +
                 '(score = ? AND timestamp < ?)', [row.score, row.score, ts],
            function(err, row) {
              if (err) {
                cb(err, null);
                return;
              }
              
              var rank = row.rank;
               db.get('SELECT COUNT(*) as count FROM scores', [],
                 function(err, row) {
                  if (err) {
                    cb(err, null);
                    return;
                  }
                  cb(err, {'rank': rank, 'count': row.count})
                });
            });
        }
    );
  });
}
