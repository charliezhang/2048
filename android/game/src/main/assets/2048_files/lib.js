post_json = function(path, obj) {
  console.log(obj); // TODO
  xmlhttp = new XMLHttpRequest();
  var host = "go2048.com";
  var host = 'localhost:8123';
  var url = "http://" + host + "/" + path;
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify(obj));
}
