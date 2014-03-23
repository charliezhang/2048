// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var re = /replay=(\d+)/;
  var str = window.location.search.substring(1);
  var arr = re.exec(str);
  if (arr) {
    document.querySelector('.best-container').style.display = "none";
    new ReplayManager(arr[1]);
  } else {
    var gm = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager, AudioManager);
    $.get("http://ipinfo.io", function(r) {
      gm.setCountry(r.country.toLowerCase());
    },"jsonp");
  }
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
  if (language() == 'zh') {
  bShare.addEntry({
        title: '#Go2048# 一个停不下来的游戏！',
        url: 'http://go2048.com',
        summary: '我的最高得分是' + scoreManager.get() + '!',
        pic: "http://go2048.com/2048_files/og_image.png"
  });
  }
  if (navigator.userAgent.indexOf('Android') >= 0) {
    var playStoreEls = document.getElementsByClassName('play-store');
    playStoreEls[0].style.display = 'block';
  }
  


  var rankLink = document.getElementById('rank-link');
  var showingRank = false;
  var offset = 0;
  var rank = document.getElementById('rank-table');
    document.getElementById('rank-more').onclick = function() {
    load_score(offset);
    offset = offset + 10;
  };
  
  if (language() != 'zh') {
    tipLink.style.display = 'none';
    expLink.style.display = 'none';
    document.getElementById('game-tip-toggle').style.display = 'none';
    document.getElementById('how-to').style.display = 'none';
    document.getElementById('wechat').style.display = 'none';
    document.getElementById('bshare').style.display = 'none';
//    document.getElementById('bshareF').style.display = 'none';
    var tt = document.getElementById('tweet');
    tt.href = "https://twitter.com/go2048";
    tt.innerHTML = '@go2048';
  } else {
    document.getElementById('bshare').innerHTML = '<a class="bshareDiv" href="http://www.bshare.cn/share">分享按钮</a><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#uuid=&amp;style=3&amp;fs=4&amp;textcolor=#fff&amp;bgcolor=#9C3&amp;text=分享到&amp;pophcol=1"></script>';
  }
  document.getElementById('rank-link').innerHTML = msg().BOARD;
  document.getElementById('rank-more').innerHTML = msg().MORE;
  document.querySelector('.keep-playing-button').innerHTML = msg().CONTINUE;
  document.querySelector('.retry-button').innerHTML = msg().RETRY;
  document.querySelector('.save-name').innerHTML = msg().POST_NAME;
});


