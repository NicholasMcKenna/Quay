$(document).ready(function() {
    if ($('.hallMap').length > 0) {
        $('#hallMap').after($('.promoBox'));
    } else if ($('.selected').length > 0) {
        if ($(window).width() <= 780) {
            $('.seatingPlanContainer').after('<div class="promo-container"></div>');
            $('.promo-container').after($('.promoBox'));
        } else {
            $('.eventDetails').after($('.promoBox'));
        }
    }

    if ($('.promoBox button[aria-label="Remove coupon Affliates"]').length > 0) {
        $('.promoBox').hide();
    }
});