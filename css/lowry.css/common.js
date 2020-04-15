$(document).ready(function() {
    
    $('.flm_my_basket::after').css('content', 'Basket');
	$('.search-button').click(function() { $('#group_Header-fixed #PH_Search_Box').toggle(); });
	
    var basketProp = $('.ph_basketwidget .basketProperty.Details span.small_text_a:contains("Affliates")');
    if (basketProp) {
        basketProp.parent().parent().hide();
    }
})

