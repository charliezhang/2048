var controllers = require('../controllers.js')

valid_score =
{"nickname":"test4","score":128,"max_number":32,"payload":{"moves":"1,2,3,2,1,2,3,1,2,3,1,2,1,3,3,2,2,1","seed":13952918328759292}}

invalid_score = {
  "nickname":"a",
  "score":148,
  "max_number":32,
  "payload":{
    "moves":"1,2,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,1,3,2,1,2,1,3",
    "seed":13952875352567535
  }
};

invalid_score2 =
{"nickname":"test4","score":999,"max_number":32,"payload":{"moves":"1,2,3,2,1,2,3,1,2,3,1,2,1,3,3,2,2,1","seed":13952918328759292}};

invalid_score3 =
{"nickname":"刷完啦","score":92009,"max_number":8192,"payload":{"moves":"1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,2,1,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,2,3,1,2,2,3,1,2,3,2,1,3,1,2,3,1,2,3,1,2,3,2,1,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,2,1,3,2,1,3,1,2,3,1,2,3,2,1,3,2,1,3,2,1,3,1,2,3,1,2,3,1,3,2,1,3,1,2,3,1,2,3,1,3,1,2,3,1,3,1,3,1,3,3,1,3,2,3,1,3,2,1,3,3,3,1,2,3,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,2,1,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,2,1,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,1,2,3,2,1,3,1,2,3,1,2,3,1,2","seed":13953877326954752}};

exports.testValid = function(test) {
  test.equal(
      "OK",
      controllers.validate(valid_score, 32)
  );
  test.done();
}

exports.testInValid = function(test) {
  test.equal(
      "SCORE_NOT_MATCH",
      controllers.validate(invalid_score, 32)
  );
  test.done();
}

exports.testInValid2 = function(test) {
  test.equal(
      "SCORE_NOT_MATCH",
      controllers.validate(invalid_score2, 32)
  );
  test.done();
}

exports.testInValid3 = function(test) {
  test.equal(
      "SCORE_NOT_MATCH",
      controllers.validate(invalid_score3, 2048)
  );
  test.done();
}

