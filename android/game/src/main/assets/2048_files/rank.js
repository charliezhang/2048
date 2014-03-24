(function($) {
      $.QueryString = (function(a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i)
      {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
  })(window.location.search.substr(1).split('&'))
})(jQuery);

$(document).ready(function() {
  var fnWhenDone = function (scoreObject) { 
        var rank = $('#rank-table');
        if (scoreObject.scores.length == 0) {
          rank.text('No result found!');
          return;
        }
        for(var i = 0; i < scoreObject.scores.length; i++) {
          var score = scoreObject.scores[i];
          var tr= $('<div id="' + score.id+ '">');
	  tr.addClass('tr-' + i%2);
          var td = $('<div>');
          td.addClass("rank-td td-1");
          var d1 = $('<div>');
          d1.addClass('rank-tile tile tile-' + scoreObject.scores[i].max_number);
          var d2 = $('<div>');
          d2.addClass('rank-tile tile-inner');
          d1.append(d2);
          $(d2).text(offset+i+1);
          td.append(d1);
          tr.append(td);
          var nickName = $('<div class="td-2">');
	  nickName.text(scoreObject.scores[i].nickname);
          $(tr).append(nickName);
	  var scoreEl = $('<div class="td-3">'); 
          scoreEl.text(scoreObject.scores[i].score);
          $(tr).append(scoreEl);
	  var country = $('<img class="td-3">');
          var countryUrl = 'http://www.kidlink.org//icons/f0-cn.gif';
	  if (score.country && score.country != 'null') {
		countryUrl ='http://www.kidlink.org//icons/f0-' + score.country + '.gif';
	}
	  country.attr('src', countryUrl);
	  $(tr).append(country);
	    $(rank).append(tr);
	$(tr).click(function(e) {
		window.open("/?replay=" + this.id);
		});
        }
  }

  var nickname = $.QueryString['nickname'];
  var offset = parseInt($.QueryString['offset']);
  if (isNaN(offset) || offset < 0) {
        offset = 0;
  }

  $.get('/scores', {'nickname': nickname, 'offset': offset, 'limit': 100}, function(data) {fnWhenDone(data);});
  $('#search').click(function(e) {
    window.location = '/rank.html?nickname=' + $('#nickname').val();
    e.preventDefault();
  });
  $('.previous').click(function(e) {
      offset = offset - 100;
      if (offset <= 0) {
          offset = 0;
      }

      window.location = '/rank.html?offset=' + offset + '&nickaname=' + nickname;
      e.preventDefault(); 
    });
  $('.next').click(function(e) {
            offset = offset + 100;
            window.location = '/rank.html?offset=' + offset + '&nickname=' + nickname;
      e.preventDefault(); 
  });
});
