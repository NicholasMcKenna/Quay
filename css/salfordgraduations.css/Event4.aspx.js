$(document).ready(function () {
    if ($('.hallMap').length > 0) {
        $('#hallMap').after($('.promoBox'));
    } else if ($('.selected').length > 0) {
        if ($(window).width() <= 780 && $('#eventPage.seated').length > 0) {
            $('.seatingPlanContainer:first').after('<div class="promo-container"></div>');
            $('.promo-container').after($('.promoBox'));
        } else if ($(window).width() <= 780 && $('#eventPage.non-seated').length > 0) {
            $('.buttonsContainer').before($('.promoBox'));
        } else {
            //$('#ticketsPane').prepend($('.promoBox'));
            $('.eventDetails:first').after($('.promoBox'));
        }
    }

    $('#zoomContainer').on("mousewheel DOMMouseScroll", function (e) {
        e.stopPropagation()
    });
});