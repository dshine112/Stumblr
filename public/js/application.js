$(document).ready(function() {

  //AJAX call for initial search with search bar
  $('#search').on('submit', function(event) {
    event.preventDefault();
    $("#search").hide();
    $("#initial").show();
    $(".homepage").hide();
    $("#searchWrapper img").show();
    var $target = $(event.target);
    $.ajax({
      url: $target.attr('action'),
      type: 'POST',
      data: $target.serialize(),
      dataType: "JSON"
    }).done(function(response) {
      content = response
      $("#initial").remove();
      $("#searchWrapper img").hide();
      $("#search").show();
      $("#likeButtons").show();
      $("#content").show();
      $content = $("#content iframe")
      contentNum = 0;
      if (content[contentNum].type === "video") {
        $content.attr("src", youtubeId(content[contentNum].url))
        $content.attr("contentId", content[contentNum].id)
      } else {
        $content.attr("src", content[contentNum].url)
        $content.attr("contentId", content[contentNum].id)
      }
    })
  })

  //AJAX call for initial search with thumbnail images
  $('.thumbnailSearch').on('click', function(event) {
    event.preventDefault();
    $("#search").hide();
    $("#initial").show();
    $(".homepage").hide();
    $("#searchWrapper img").show();
    var $target = $(event.target);
    $.ajax({
      url: '/search/' + $target.attr('categoryId'),
      type: 'GET',
      dataType: "JSON"
    }).done(function(response) {
      content = response
      $("#initial").hide();
      $("#searchWrapper img").hide();
      $("#search").show();
      $("#likeButtons").show();
      $("#content").show();
      $content = $("#content iframe")
      contentNum = 0;
      if (content[contentNum].type === "video") {
        $content.attr("src", youtubeId(content[contentNum].url))
        $content.attr("contentId", content[contentNum].id)
      } else {
        $content.attr("src", content[contentNum].url)
        $content.attr("contentId", content[contentNum].id)
      }
    })
  })

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