$( document ).ready(function() {
  $(".new-tweet textarea" ).on("keyup", function(event) {
    let $counter = $(this).parent().children('.counter')
    let $length = $(this).val().length;

    $counter.text(140 - $length);
  });
});

