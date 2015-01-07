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
    resetCounter(contentNum, content)
  })

  // Javascript used to go to go back to the previous piece of content
  $("#back").on('click', function(event) {
    event.preventDefault();
    if (content[--contentNum].type === "video") {
      $("#content iframe").attr("src", youtubeId(content[contentNum].url))
    } else {
      $("#content iframe").attr("src", content[contentNum].url)
    }
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
        $("#" + this.name + "").remove();
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

  var showList = new List('show-list', {
    valueNames: ['title'],
    plugins: [ListFuzzySearch()]
  });

  var editList = new List('edit-list', {
    valueNames: ['title'],
    plugins: [ListFuzzySearch()]
  });

  //The following code starts the animation
  new imageLoader(cImageSrc, 'startAnimation()');

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

// function twitterButton() {
//   $("#twitterDiv").empty();
//   var $clone = $(".twitter-share-button-template").clone();
//   $clone.show();
//   $clone.attr("data-url", httpConvert(content[contentNum].url));
//   $clone.attr("class", "twitter-share-button");
//   $("#twitterDiv").append($clone);
//   $.getScript("http://platform.twitter.com/widgets.js");
// }

function resetCounter(counter, array) {
  if (counter > array.length) {
    counter = -1
  }
}

function searchSetup() {
  $("#search").hide();
  $("#initial").show();
  $(".homepage").hide();
  $("#searchWrapper #loaderImage").show();
}

function searchFinish(response) {
  content = response
  $("#initial").remove();
  $("#searchWrapper #loaderImage").hide();
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

//Facebook SDK function
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


var cSpeed = 9;
var cWidth = 256;
var cHeight = 88;
var cTotalFrames = 11;
var cFrameWidth = 256;
var cImageSrc = '../img/sprites.png';

var cImageTimeout = false;
var cIndex = 0;
var cXpos = 0;
var cPreloaderTimeout = false;
var SECONDS_BETWEEN_FRAMES = 0;

function startAnimation() {

  document.getElementById('loaderImage').style.backgroundImage = 'url(' + cImageSrc + ')';
  document.getElementById('loaderImage').style.width = cWidth + 'px';
  document.getElementById('loaderImage').style.height = cHeight + 'px';

  //FPS = Math.round(100/(maxSpeed+2-speed));
  FPS = Math.round(100 / cSpeed);
  SECONDS_BETWEEN_FRAMES = 1 / FPS;

  cPreloaderTimeout = setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES / 1000);

}

function continueAnimation() {

  cXpos += cFrameWidth;
  //increase the index so we know which frame of our animation we are currently on
  cIndex += 1;

  //if our cIndex is higher than our total number of frames, we're at the end and should restart
  if (cIndex >= cTotalFrames) {
    cXpos = 0;
    cIndex = 0;
  }

  if (document.getElementById('loaderImage'))
    document.getElementById('loaderImage').style.backgroundPosition = (-cXpos) + 'px 0';

  cPreloaderTimeout = setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES * 1000);
}

function stopAnimation() { //stops animation
  clearTimeout(cPreloaderTimeout);
  cPreloaderTimeout = false;
}

function imageLoader(s, fun) //Pre-loads the sprites image
{
  clearTimeout(cImageTimeout);
  cImageTimeout = 0;
  genImage = new Image();
  genImage.onload = function() {
    cImageTimeout = setTimeout(fun, 0)
  };
  genImage.onerror = new Function('alert(\'Could not load the image\')');
  genImage.src = s;
}