// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager);
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
});
