$(document).ready(function() {

    $('.imgContainer img').click(function() {

        var loc = $(this).attr("src");
        window.open(loc, '_blank');
    });

});