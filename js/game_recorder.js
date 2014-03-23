// Record game states history for validation.

function GameRecorder(seed) {
  this.reset(seed);
}

GameRecorder.prototype.recordMove = function(direction) {
  this.moves.push(direction);
}

GameRecorder.prototype.serialize = function() {
  return {
    'moves': this.moves.join(),
    'seed': this.seed,
  };
}

GameRecorder.prototype.reset = function(seed) {
  this.moves = [];
  this.seed = seed;
}

if (typeof exports != 'undefined') {
exports.GameRecorder = GameRecorder;
}
