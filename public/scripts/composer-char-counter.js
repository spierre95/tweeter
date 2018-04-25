$( document ).ready(function() {

  $(".new-tweet textarea" ).on("keyup", function() {
    let $parent = $(this).parent();
    let $length = $(this).val().length;
    let $counter = $parent.children('.counter').text(140 - length);

});


});

