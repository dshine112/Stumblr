$(document).ready(function() {

  //AJAX call for initial search with search bar
  $('#search').on('submit', function(event) {
    event.preventDefault();
    searchSetup();
    var $target = $(event.target);
    $.ajax({
      url: $target.attr('action'),
      type: 'POST',
      data: $target.serialize(),
      dataType: "JSON"
    }).done(function(response) {
      searchFinish(response);
      twitterButton();
    })
  })

  //AJAX call for initial search with thumbnail images
  $('.thumbnailSearch').on('click', function(event) {
    event.preventDefault();
    searchSetup();
    var $target = $(event.target);
    $.ajax({
      url: '/search/' + $target.attr('categoryId'),
      type: 'GET',
      dataType: "JSON"
    }).done(function(response) {
      searchFinish(response);
      twitterButton();
    })
  })

  //AJAX call to update likeCount of content and create Like
  $("#like").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/' + content[contentNum].type + '/' + content[contentNum].id,
      type: 'POST'
    }).done(function(response) {
      console.log(response)
      if (response === "exists") {
        var n = noty({
          text: 'Like Already Exists!',
          type: 'warning',
          layout: 'topCenter',
          theme: 'relax',
          timeout: 1000
        });
      } else {
        var n = noty({
          text: 'Like Successful!',
          type: 'success',
          layout: 'topCenter',
          theme: 'relax',
          timeout: 1000
        });
      }
    }).fail(function(response) {
      var n = noty({
        text: 'Like Failed!',
        type: 'error',
        layout: 'topCenter',
        theme: 'relax',
        timeout: 1000
      });
    });
  })

  // Javascript used to go to the next piece of content
  $("#next").on('click', function(event) {
    event.preventDefault();
    if (content[++contentNum].type === "video") {
      $("#content iframe").attr("src", youtubeId(content[contentNum].url))
    } else {
      $("#content iframe").attr("src", content[contentNum].url)
    }
    twitterButton();
  })

  // Javascript used to go to go back to the previous piece of content
  $("#back").on('click', function(event) {
    event.preventDefault();
    if (content[--contentNum].type === "video") {
      $("#content iframe").attr("src", youtubeId(content[contentNum].url))
    } else {
      $("#content iframe").attr("src", content[contentNum].url)
    }
    twitterButton();
  })

  // JavaScript used to toggle between show and edit partials on profile page
  $("#editButton").on('click', function(event) {
    var $target = $(event.target);
    $target.text($target.text() === "Edit List" ? "Show List" : "Edit List");
    $("#showListDiv").toggle();
    $("#editListDiv").toggle();
  });

  //AJAX call to delete videos and articles from posts
  $("#editList").on('submit', function(event) {
    event.preventDefault();
    var $target = $(event.target);
    $.ajax({
      url: $target.attr('action'),
      type: 'DELETE',
      data: $target.serialize()
    }).done(function(response) {
      var n = noty({
        text: 'List Update Successful!',
        type: 'success',
        layout: 'topCenter',
        theme: 'relax',
        timeout: 1000
      });
      $("input:checked").each(function() {
        $("a[href='" + $(this).prev().attr('href') + "']").remove();
        $(this).remove();
      });
    }).fail(function(response) {
      var n = noty({
        text: 'List Update Failed!',
        type: 'error',
        layout: 'topCenter',
        theme: 'relax',
        timeout: 1000
      });
    });
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

function twitterButton() {
  $("#twitterDiv").empty();
  var $clone = $(".twitter-share-button-template").clone();
  $clone.show();
  $clone.attr("data-url", httpConvert(content[contentNum].url));
  $clone.attr("class", "twitter-share-button");
  $("#twitterDiv").append($clone);
  $.getScript("http://platform.twitter.com/widgets.js");
}

function searchSetup() {
  $("#search").hide();
  $("#initial").show();
  $(".homepage").hide();
  $("#searchWrapper img").show();
}

function searchFinish(response) {
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
}