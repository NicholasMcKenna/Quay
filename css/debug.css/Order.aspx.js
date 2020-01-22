(function () {

    function couponAttach() {
        if ($('.couponLabel').length > 0) {
            $('.couponLabel').click(function () {
                $('#couponId').toggleClass('visible');
                $('.addCouponCtl .button').toggleClass('visible');
                $('.addCouponCtl').toggleClass('code-active');
                $('.couponLabel').toggleClass('code-active');
            });
        } else {
            console.log('Error: Cannot find coupon control ', $('.couponLabel').length > 0);
            // Add revert controls
        }


        // make the delivery address form 
        $("input[name=DeliveryMethod]").change(function () {
            $('#deliveryMethodSelection .DeliveryZipCode').append($('#deliveryMethodSelection #qasContainer'));
            $('#qasLink>span>a').css('padding', '4px');
        });
    }

    $(document).ready(function () {
        couponAttach();
    });

    $('#basketContainer').on("afterBasketUpdated.esro", function () {
        couponAttach();
    });
})();