$(document).ready(function() {
    
    $('.flm_my_basket::after').css('content', 'Basket');
	$('.search-button').click(function() { $('#group_Header-fixed #PH_Search_Box').toggle(); });
	
    var basketProp = $('.ph_basketwidget .basketProperty.Details span.small_text_a:contains("Affliates")');
    if (basketProp) {
        basketProp.parent().parent().hide();
    }


});


$(document).ready(function () {


    var suPrefsInt = window.setInterval(processSuPrefs, 1000);


    function processSuPrefs() {
            
        var suPrefTargetCopy = "offers and other relevant information";

        var suPrefTargetCopyDiv = $('.loginOrRegisterWizard.su_preferences .wizardStepDescription');


        if (suPrefTargetCopyDiv.length) {

            if ( suPrefTargetCopyDiv.html().indexOf(suPrefTargetCopy) ) {

             $('.loginOrRegisterWizard.su_preferences .wizardStepDescription').html("The Lowry is committed to protecting your personal data. We will always contact you about any important changes to your booking. We also use our legitimate business interests to process your data in order to provide you with the best experience and most relevant information. If you wish for your data not to be used in this way you can ask us not to. If you would prefer NOT to receive information by a particular channel, please UNTICK the relevant box:");
            
            //clearInterval(suPrefsInt);
            }
        }

    }

});
