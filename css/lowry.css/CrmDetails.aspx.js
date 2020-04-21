$(document).ready(function () {
/*
    if ($('.promoBox button[aria-label="Remove coupon Affliates"]').length > 0) {
        $('.promoBox').hide();
    } else {
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
    }

    $('#zoomContainer').on("mousewheel DOMMouseScroll", function (e) {
        e.stopPropagation()
    });

*/


    if ($('.loginOrRegisterWizard.su_preferences .wizardStepDescription').length) {

        $('.loginOrRegisterWizard.su_preferences .wizardStepDescription').html("The Lowry is committed to protecting your personal data. We will always contact you about any important changes to your booking. We also use our legitimate business interests to process your data in order to provide you with the best experience and most relevant information. If you wish for your data not to be used in this way you can ask us not to. If you would prefer NOT to receive information by a particular channel, please UNTICK the relevant box:");
    }

});
