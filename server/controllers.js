var db = require('./db.js');
var game_manager = require('../libs/game_manager.js')
var rand = require('../libs/rand.js')
var countries = require('./countries.js').countries;
var escape = require('escape-html');

exports.not_found = function (req, res) {
  res.send(404);
}

exports.get_scores = function (req, res) {
  if (req.query.nickname) {
    db.get_scores_by_name(req.query.nickname, function (scores) {
      res.json({'scores': scores});
    });
  } else {

    db.get_scores(req.query.limit || 10, req.query.offset || 0, function (scores) {
      res.json({'scores': scores});
    });
  }
}

exports.get_score = function (req, res) {
  db.get_score(req.query.id, function (err, row) {
    if (err) {
      res.status(500);
      res.json(err);
      return;
    } else {
      res.json({'score': {
        'max_number': row.max_number,
        'score': row.score,
        'payload': row.payload,
        'seed': row.seed,
        'nickname': escape(row.nickname),
        'country': escape(row.country),
        'timestamp': row.timestamp,
      }});
    } 
  });
}

validate = function (data, goal) {
  if (data.country && countries.indexOf(data.country) < 0) {
    return 'INVALID_COUNTRY';
  }
  var payload = data.payload;
  var ran = new rand.Rand();
  var seed = payload.seed;
  if (data.nickname.length < 1 || data.nickname.length > 64) {
    return 'NICKNAME_TOO_LONG';
  }
  if (seed == 0 || seed == 0x464fffff) {
    return 'INVALID_SEED';
  }
  if (db.seed_exists(seed)) {
    return 'SEED_IS_USED';
  }

  var legal = false;
  function Actuator() {
    this.actuate = function(grid, meta) {
      if (meta.score == data.score && meta.maxNumber == data.max_number) {
        legal = true;
      } else {
        legal = false;
      }
    };
    this.continue = function() {};
  };
  function MockKeyboardInputManager() {
    this.on = function(a, b) {};
  };
  function MockScoreManager() {
    this.get = function() {},
    this.set = function(s) {}
  }
  function MockAudioManager() {
    this.pause = function() {},
    this.play = function(l) {}
  };
  

  var gm = new game_manager.GameManager(
      4, MockKeyboardInputManager, Actuator, MockScoreManager, MockAudioManager);
  gm.setup(seed);
  if (goal) {
    gm.setGoal(goal);
  }
  var moves = payload.moves.split(',');
  for (var d in moves) {
    gm.move(parseInt(moves[d]));
    if (gm.isGameTerminated()) {
      break;
    }
  }
  if (!gm.isGameTerminated()) {
    return 'GAME_NOT_TERMINATED';
  }
  if ((gm.maxNumber != data.max_number) || (gm.score !== data.score)) {
    return 'SCORE_NOT_MATCH';
  }
  if (!legal) {
    return 'ILLEGAL_MOVES';
  }

  return 'OK';
}

exports.post_scores = function (req, res) {
  req.accepts('application/json');
  if (validate(req.body) != 'OK') {
    res.send(400);
    return;
  }
  
  db.add_score(req.body, function (err, rank) {
    if (err == null) {
      res.json(rank);
    } else {
      res.status(500);
      res.json(err);
    }
  });
}

exports.validate = validate;

