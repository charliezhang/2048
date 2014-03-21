
function language() {
  var l_lang;
  if (navigator.userLanguage) // Explorer
      l_lang = navigator.userLanguage;
  else if (navigator.language) // FF
      l_lang = navigator.language;
  else
      l_lang = "zh";
  return l_lang.substring(0, 2);
} 

messages = {
  'en': {
    'SCORE': 'SCORE',
    'BEST': 'BEST',
    'BOARD': 'Leader Board',
    'HIDE_BOARD': 'Hide',
    'RETRY': 'Try again',
    'GAME_OVER': 'Game over',
    'WIN': 'You won',
    'CONTINUE': 'Continue',
    'POST_NAME': 'Submit',
    'POST_NAME_SUCCEED': 'Succeed',
    'NAME_PLACEHOLDER': 'Your name',
    'MORE': 'More...',
    'EMPTY_NICKNAME': 'Name can not be empty',
  },
  'zh': {
    'SCORE': '当前得分',
    'BEST': '最高得分',
    'BOARD': '英雄榜',
    'HIDE_BOARD': '收起榜单',
    'RETRY': '重来',
    'GAME_OVER': '你输了',
    'WIN': '你赢了',
    'CONTINUE': '继续',
    'POST_NAME': '提交',
    'POST_NAME_SUCCEED': '提交成功',
    'NAME_PLACEHOLDER': '贵姓大名',
    'MORE': '更多...',
    'EMPTY_NICKNAME': '昵称不能为空',
  },
}

function msg() {
  if (language() == 'en') {
    return messages.en;
  }
  return messages.zh;
}
