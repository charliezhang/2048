var db = require('./db.js');

exports.not_found = function (req, res) {
  res.send(404);
}

exports.get_scores = function (req, res) {
  db.get_scores(req.query.limit || 10, function (scores) {
    res.json({'scores': scores});
  });
}

var validate = function (payload) {
  // TODO: validation.
  return true;
}

exports.post_scores = function (req, res) {
  req.accepts('application/json');
  if (!validate(req.body.payload)) {
    res.send(400);
  }
  
  db.add_score(req.body, function () {
    res.send(200);
  });
}
