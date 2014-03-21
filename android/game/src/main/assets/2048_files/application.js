// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager, AudioManager);
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
        title: '#Go2048# 一个停不下来的游戏！',
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
  var rank = document.getElementById('rank-table');
  add_row(rank, '排名', '姓名', '最高得分', '最大砖块');
  document.getElementById('rank-toggle').onclick = function() {
    showingRank = !showingRank;
    document.getElementById('rank').style.display = showingRank ? 'block' : 'none';
    rankLink.innerText = showingRank ? "收起榜单" : "英雄榜";
    if (showingRank && offset == 0) {
      load_score(offset);
      offset = offset + 10;
    }
  }
  document.getElementById('rank-more').onclick = function() {
    load_score(offset);
    offset = offset + 10;
  };
  
  if (language() != 'zh') {
    tipLink.style.display = 'none';
    expLink.style.display = 'none';
    for (i in gameTips) gameTips[i].style.display = 'none';
    document.getElementById('game-tip-toggle').style.display = 'none';
    document.getElementById('how-to').style.display = 'none';
    document.getElementById('tweet').innerHtml = '<a href="https://twitter.com/go2048" target="_blank">@go2048</a>';
  } else {
  }
});


