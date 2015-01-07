$(document).ready(function() {

});

function youtubeId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return "//www.youtube.com/embed/" + match[2];
  }
}

function httpConvert(url) {
  return url = url.replace(/^http:\/\//, 'https://')
}