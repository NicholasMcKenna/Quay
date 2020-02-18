$(document).ready(function() {
    if ($('.hallMap').length > 0) {
        $('#hallMap').after($('.promoBox::first'));
    } else if ($('.selected').length > 0) {
        if ($(window).width() <= 780) {
            $('.seatingPlanContainer').after('<div class="promo-container"></div>');
            $('.promo-container').after($('.promoBox::first'));
        } else {
            //$('#ticketsPane').prepend($('.promoBox'));
            $('.eventDetails').after($('.promoBox::first'));
        }
    }
});