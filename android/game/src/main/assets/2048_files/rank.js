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

  var load_score = function(offset) {
      var fnWhenDone = function (scoreObject) { 
        var rank = document.getElementById('rank-table');
        for(var i = 0; i < scoreObject.scores.length; i++) {
          var tr= document.createElement('tr');
          var td = document.createElement('td');
          td.className = "rank-td";
          var d1 = document.createElement('div');
          d1.className = 'rank-tile tile tile-' + scoreObject.scores[i].max_number;
          var d2 = document.createElement('div');
          d2.className = 'rank-tile tile-inner';
          d1.appendChild(d2);
          $(d2).text(offset+i+1);
          td.appendChild(d1);
          tr.appendChild(td);

          add_row(tr, scoreObject.scores[i].nickname, scoreObject.scores[i].score);
          rank.appendChild(tr);
        }
      }

      $.get('/scores', {'offset': offset, 'limit': 100}, function(data) {fnWhenDone(data);});
    }
  var offset = parseInt($.QueryString['offset']);
  load_score(offset);
  $('#more').click(function(e) {
    window.location = '/rank.html?offset=' + (offset+100);
  });
});
