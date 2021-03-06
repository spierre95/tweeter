
//Appending tweets to container

function renderTweets(tweets) {
  $('.display-tweet').empty()
  for (let tweet of tweets){
    $('.display-tweet').append(createTweetElement(tweet))
  }
}

//Creating HTML of new tweets

function createTweetElement(tweet){

 let $article = $('<article>');

 const $header = $('<header>').addClass('clearfix').appendTo($article);
 const $img = $('<img>').attr("src",tweet.user.avatars.small).appendTo($header);
 const $span = $('<span>').addClass('username').text(tweet.user.handle).appendTo($header);
 const $h2 = $('<h2>').text(tweet.user.name).appendTo($header);

 const $div = $('<div>').addClass('content').text(tweet.content.text).appendTo($article);

 const $footer = $('<footer>').text(moment.unix(tweet.created_at/1000).fromNow()).appendTo($article);
 const $flag = $('<i>').addClass("fas fa-flag").appendTo($footer);
 const $retweet = $('<i>').addClass("fas fa-retweet").appendTo($footer);
 const $heart = $('<i>').addClass("fas fa-heart").appendTo($footer);

 return $article;

}

$(document).ready(function(){

  //press enter to submit form

  $('.new-tweet textarea').keypress(function (enter) {
    if (enter.which == 13) {
      $('.new-tweet').slideToggle();
      $('.new-tweet #submit').submit();
      return false;
    }
  });

  //Compose Button

  $('#nav-bar #compose').on("click",function(){
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').val("");
    $('.new-tweet .counter').text(140);
  })

  //Submit Button

  $('.new-tweet #submit').on("click",function(event){
    if($('.new-tweet textarea').val().trim().length < 1){
      event.preventDefault();
      alert('Its called Tweeter not Crickets! Please enter some text!');
      return false;
    } else if ($('.new-tweet .counter').text() < "0"){
      event.preventDefault();
      alert('Slow down chatty bird! You\'ve entered too many characters!');
      return false;
    } else{
      $('.new-tweet').slideToggle();
    }
  })

  // Ajax Post and Get requests

  $( ".new-tweet form" ).on( "submit", function( event ) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $( this ).serialize(),
      success: function(data){
        loadTweets()
      }

    })
  });

  function loadTweets(){
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(data){
        let reverse = data.reverse()
        renderTweets(data)
      }
    });
  }

  loadTweets();

})