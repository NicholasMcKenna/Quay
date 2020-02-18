$(document).ready(function() {
    if ($('.hallMap').length > 0) {
        $('#hallMap').after($('.promoBox'));
    } else if ($('.selected').length > 0) {
        
        if ($(window).width() <= 780) {
            $('#ticketsPane').prepend($('.promoBox'));
        }
        
    }

    $('#zoomContainer').on( "mousewheel DOMMouseScroll", function(e) {
        e.stopPropagation()
    });
});