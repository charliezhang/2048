function ReplayManager(id) {
  console.log("Replay " + id);
  this.interval = 100;
  var that = this;
  data = get_score(id, function(score) {
    that.run(score);
  });   
}

ReplayManager.prototype.run = function(score) {
  function MockKeyboardInputManager() {
    this.on = function(a, b) {};
  };
  function MockScoreManager() {
    this.get = function() {},
    this.set = function(s) {}
  }

  var gm = new GameManager(4,
      MockKeyboardInputManager, HTMLActuator, MockScoreManager, AudioManager);
  gm.setup(score.seed);
  gm.setReplay(true);
  var moves = score.payload.moves.split(',');
  var that = this;

  var cb = function(moves, idx) {
    if (idx++ < moves.length) {
      that.timerId = window.setTimeout(function() {
        cb(moves, idx);
      }, that.interval);
      gm.move(moves[idx]);
    }
  };
  
  this.move = cb;

  cb(moves, 0);
}

ReplayManager.prototype.pause = function() {
  window.clearTimeout(this.timerId);
};

ReplayManager.prototype.resume = function() {
  this.start = new Date();
  var that = this;
  this.timerId = window.setTimeout(function() {
    that.move,
    that.interval
  });
}

ReplayManager.prototype.accelerate = function() {
  this.interval /= 2;
}

ReplayManager.prototype.decelerate = function() {
  this.interval *= 2;
}
