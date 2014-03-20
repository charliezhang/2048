// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var seed = Math.round(Math.random() * 123456789);
  var recorder = new GameRecorder(seed);
  recorder.recordMove(1);
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager,
    recorder, new Rand(seed));
  var toHide;
  window.isApp = navigator.userAgent.indexOf('2048-android') >= 0 || navigator.userAgent.indexOf('2048-ios') >=0;
  if (!isApp) {
    toHide = document.getElementsByClassName('app-share');
    window.shareMode = "web";
  } else {
    toHide = document.getElementsByClassName('web-share');
    window.shareMode = "app";
  }
  for (var i = 0; i < toHide.length; i++) {toHide[i].style.display = "none";}
  var explanation = document.getElementsByClassName('game-explanation');
  var showingExp = false;
  var expLink = document.getElementById('exp-link');
  document.getElementById('how-to').onclick = function () {
    showingExp = !showingExp;
    for (var i = 0; i < explanation.length; i++) {
      explanation[i].style.display = showingExp ? 'block' : 'none';
    }
    expLink.innerText = showingExp ? '收起说明':'玩法说明';
  };

  var showingTip = false;
  var gameTips = document.getElementsByClassName('game-tip');
  var tipLink = document.getElementById('tip-link');
  document.getElementById('game-tip-toggle').onclick = function() {
    showingTip = !showingTip;
    for (var i = 0; i < gameTips.length; i++) {
      gameTips[i].style.display = showingTip ? 'block' : 'none';
    }
    tipLink.innerText = showingTip ? "收起攻略" : "高分技巧";
    
  }
  
  var scoreManager = new LocalScoreManager;
  bShare.addEntry({
        title: '#Go2048 一个停不下来的游戏！',
        url: 'http://go2048.com',
        summary: '我的最高得分是' + scoreManager.get() + '!',
        pic: "http://go2048.com/2048_files/og_image.png"
  });
  if (navigator.userAgent.indexOf('Android') >= 0) {
    var playStoreEls = document.getElementsByClassName('play-store');
    playStoreEls[0].style.display = 'block';
  }
  


  var rankLink = document.getElementById('rank-link');
  var showingRank = false;
  var offset = 0;
  document.getElementById('rank-toggle').onclick = function() {
    showingRank = !showingRank;
    document.getElementById('rank').style.display = showingRank ? 'block' : 'none';
    rankLink.innerText = showingRank ? "收起榜单" : "英雄榜";
    if (showingRank) {
      load_score(offset);
    }
  }
  document.getElementById('rank-more').onclick = function() {
    offset = offset + 10;
    load_score(offset);
  };
});
