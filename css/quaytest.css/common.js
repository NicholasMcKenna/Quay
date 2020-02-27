$(document).ready(function() {
    $('.flm_my_basket::after').css('content', 'Basket');
    $('.search-button').click(function() { 
        $('#group_Header-fixed #PH_Search_Box').toggle(); 
        $('#group_Header-fixed div[id^="PH_SearchPage"]').toggle();
    });
})

