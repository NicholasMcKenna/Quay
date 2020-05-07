

$(document).ready(function() {
    $('.flm_my_basket::after').css('content', 'Basket');
    $('.search-button').click(function(e) { 
        $('#group_Header-fixed #PH_Search_Box').toggle(); 
        $('#group_Header-fixed div[id^="PH_SearchPage"]').toggle();
        e.stopPropagation();
    });
/*
    if ($('#eventPage .infoSection .name:contains(The Lady Boys of Bangkok)')) {

        $(document).on('basketUpdated.esro', function() {
            $('.selectTickets .row .seat>.rowName').text('Table');
        });
    }
    */
});
/*
$(window).click(function() {
    if ($('#group_Header-fixed #PH_Search_Box').is(":visible")) {
        $('#group_Header-fixed #PH_Search_Box').hide(); 
        $('#group_Header-fixed div[id^="PH_SearchPage"]').hide();
    }
});
*/