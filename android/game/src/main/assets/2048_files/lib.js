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

post_json = function(path, obj) {
  console.log(obj); // TODO
  xmlhttp = new XMLHttpRequest();
  var url = "/" + path;
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify(obj));
}

load_score = function(offset) {
  var myConn = new XHConn();

  if (myConn) {
    var fnWhenDone = function (oXML) { 
      var scoreObject = JSON.parse(oXML.responseText); 
      var rank = document.getElementById('rank-list');
      for(var i = 0; i < scoreObject.scores.length; i++) {
        var span = document.createElement('span');
        span.innerText = scoreObject.scores[i].nickname;
        var li = document.createElement('li');

        li.appendChild(span);
        span = document.createElement('span');
        span.innerText = scoreObject.scores[i].score;
        li.appendChild(span);

        rank.appendChild(li);
      }
    };
    myConn.connect("scores", "GET", 'offset=' + offset, fnWhenDone);
  }
}
