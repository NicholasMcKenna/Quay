$(document).ready(function() {
    //$('.suppPaymentsSection').before($('#leftToPayContainer, #paymentSection'));
    $('#leftToPayContainer').after($('.suppPaymentsSection'));
    $('#lblChoosePayment').after($('.ph_partner-text'));

    var basketProp = $('.basketProperty.Details span.small_text_a:contains("Affliates")');
    if (basketProp) {
        basketProp.parent().parent().hide();
    }
});

$(document).on('basketUpdated.esro', function() {
    setTimeout(function() {
        $('#leftToPayContainer').after($('.suppPaymentsSection'));
        $('#lblChoosePayment').after($('.ph_partner-text'));
    }, 300);    
});
