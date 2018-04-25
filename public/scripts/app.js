/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const POST_URL = "http://localhost:8080/";



const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  $('.display-tweet').empty()
  for (let tweet of tweets){
    $('.display-tweet').append(createTweetElement(tweet))
}
}

function createTweetElement(tweet){


 let $article = $('<article>')

 const $header = $('<header>').addClass('clearfix').appendTo($article);
 const $img = $('<img>').attr("src",tweet.user.avatars.small).appendTo($header);
 const $span = $('<span>').addClass('username').text(tweet.user.handle).appendTo($header);
 const $h2 = $('<h2>').text(tweet.user.name).appendTo($header);

 const $div = $('<div>').addClass('content').text(tweet.content.text).appendTo($article);

 const $footer = $('<footer>').text(tweet.created_at).appendTo($article);
 const $flag = $('<i>').addClass("fas fa-flag").appendTo($footer);
 const $retweet = $('<i>').addClass("fas fa-retweet").appendTo($footer);
 const $heart = $('<i>').addClass("fas fa-heart").appendTo($footer);

 return $article;

}

$(document).ready(function(){

$('#nav-bar #compose').on("click",function(){
$('.new-tweet').slideToggle();
$('.new-tweet textarea').val("");
})

$('.new-tweet #submit').on("click",function(){
  if($('.new-tweet textarea').val().trim().length < 1){
  alert('Its called Tweeter not Crickets! Please tell us what you\'re humming about.')
}
$('.new-tweet').slideToggle();
})

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

loadTweets()


})