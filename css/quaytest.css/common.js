$(document).ready(function() {
    $('.flm_my_basket::after').css('content', 'Basket');
    $('.search-button').click(function(e) { 
        $('#group_Header-fixed #PH_Search_Box').toggle(); 
        $('#group_Header-fixed div[id^="PH_SearchPage"]').toggle();
        e.stopPropagation();
    });
})

$(window).click(function() {
    if ($('#group_Header-fixed #PH_Search_Box').is(":visible")) {
        $('#group_Header-fixed #PH_Search_Box').hide(); 
        $('#group_Header-fixed div[id^="PH_SearchPage"]').hide();
    }
});