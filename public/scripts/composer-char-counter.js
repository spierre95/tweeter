$( document ).ready(function() {
  $(".new-tweet textarea" ).on("keyup", function(event) {

   if($('.new-tweet .counter').text() < "0" ){
    $('.new-tweet .counter').css("color","red");
  } else {
    $('.new-tweet .counter').css("color","#00a087");
  }

  let $counter = $(this).parent().children('.counter');
  let $length = $(this).val().length;
  $counter.text(140 - $length);

});
});

