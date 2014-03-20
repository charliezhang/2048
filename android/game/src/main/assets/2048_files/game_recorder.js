// Record game states history for validation.

function GameRecorder(seed) {
  this.moves = [];
  this.seed = seed;
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
