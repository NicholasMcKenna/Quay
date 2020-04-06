$(document).ready(function() {
    $('.DeliveryZipCode').append($('#qasContainer'));

    var promo = $('.promo-info:contains("Affliates")');
    if (promo) {
        promo.hide();
    }
    var basketProp = $('.basketProperty.Details span.small_text_a:contains("Affliates")');
    if (basketProp) {
        basketProp.parent().hide();
    }
    var couponApplied = $('.couponApplied span:contains("Affliates")');
    if (couponApplied) {
        couponApplied.parent().hide();
    }
});