/** XHConn - Simple XMLHTTP Interface - bfults@gmail.com - 2005-04-08        **
 ** Code licensed under Creative Commons Attribution-ShareAlike License      **
 ** http://creativecommons.org/licenses/by-sa/2.0/                           **/
function XHConn()
{
  var xmlhttp, bComplete = false;
  try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
  catch (e) { try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
  catch (e) { try { xmlhttp = new XMLHttpRequest(); }
  catch (e) { xmlhttp = false; }}}
  if (!xmlhttp) return null;
  this.connect = function(sURL, sMethod, sVars, fnDone)
  {
    if (!xmlhttp) return false;
    bComplete = false;
    sMethod = sMethod.toUpperCase();

    try {
      if (sMethod == "GET")
      {
        xmlhttp.open(sMethod, sURL+"?"+sVars, true);
        sVars = "";
      }
      else
      {
        xmlhttp.open(sMethod, sURL, true);
        xmlhttp.setRequestHeader("Method", "POST "+sURL+" HTTP/1.1");
        xmlhttp.setRequestHeader("Content-Type",
          "application/x-www-form-urlencoded");
      }
      xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && !bComplete)
        {
          bComplete = true;
          fnDone(xmlhttp);
        }};
      xmlhttp.send(sVars);
    }
    catch(z) { return false; }
    return true;
  };
  return this;
}

post_json = function(path, obj, cb) {
  xmlhttp = new XMLHttpRequest();
  var url = "/" + path;
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.onload = function(e) {
    cb(this.status);
  }
  xmlhttp.send(JSON.stringify(obj));
}

add_row = function(tr, c1, c2) {
  var td = document.createElement('td');
  setContent(td, c1);
  tr.appendChild(td);

  td = document.createElement('td');
  setContent(td, c2);
  tr.appendChild(td);

  return tr;
}

load_score = function(offset) {
  var myConn = new XHConn();

  if (myConn) {
    var fnWhenDone = function (oXML) { 
      var scoreObject = JSON.parse(oXML.responseText); 
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
        setContent(d2, offset+i+1);
        td.appendChild(d1);
        tr.appendChild(td);

        add_row(tr, scoreObject.scores[i].nickname, scoreObject.scores[i].score);
        rank.appendChild(tr);
      }
    };
    myConn.connect("scores", "GET", 'offset=' + offset, fnWhenDone);
  }
}

get_score = function(id, cb) {
  var myConn = new XHConn();
  if (myConn) {
    myConn.connect("score", "GET", 'id=' + id, function(oXML) {
       var scoreObject = JSON.parse(oXML.responseText).score;
       scoreObject.payload = JSON.parse(scoreObject.payload);
       cb(scoreObject);
    });
  }
}

setContent = function(el, text) {
    if (el.textContent != "undefined") {
        el.textContent = text;
    } else {
       el.innerText = text;
    }
}

