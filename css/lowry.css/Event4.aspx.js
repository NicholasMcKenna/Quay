$(document).ready(function () {
    if ($('.hallMap').length > 0) {
        $('#hallMap').after($('.promoBox'));
    } else if ($('.selected').length > 0) {
        if ($(window).width() <= 780) {
            $('.seatingPlanContainer::first').after('<div class="promo-container"></div>');
            $('.promo-container').after($('.promoBox'));
        } else {
            //$('#ticketsPane').prepend($('.promoBox'));
            $('.eventDetails::first').after($('.promoBox'));
        }
    }

    $('#zoomContainer').on("mousewheel DOMMouseScroll", function (e) {
        e.stopPropagation()
    });
});