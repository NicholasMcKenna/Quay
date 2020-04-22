/* thingu v1
 * Need to define the date format defined in dateGroup, this could be different on each system
 * This needs to be checked when returning the ID as it will send a text in the onSelect
 * */
$(document).ready(function () {
    var availableDates = new Array();

    for (var property in dateGroups) {
        var obj = {};
        var newDate = property.split("/");
        obj.date = new Date(newDate[2], newDate[1] - 1, newDate[0]);
        obj.position = new Array(dateGroups[property]);
        availableDates.push(obj);
    }

    $.datepicker.setDefaults($.datepicker.regional['']);

    $('#date').datepicker({
        beforeShowDay: available,
        onSelect: function (dateText, inst) {
            var ID = returnID(dateText);
            $("#dateSelect").val(ID.toString()).change();
            $("#eventslist").show();
            //$("html, body").animate({ scrollTop: $('.itemsList').offset().top }, 1000);
        },
        defaultDate: get_default_date(),
    });

    function available(date) {
        var found = false;
        availableDates.forEach(function (item) {
            if (item.date.getTime() === date.getTime()) {
                found = true;
            }
        });

        if (found === true) {
            return [true, "", "Available"];
        } else {
            return [false, "", "unAvailable"];
        }
    }

    function get_default_date() {
        return availableDates[0].date;
    }

    function returnID(date) {
        var ID = new Array();
        var newDate = date.split("/");
        var formattedDate = new Date(newDate[2], newDate[0] - 1, newDate[1]);


        availableDates.forEach(function (item) {
            if (item.date.getTime() === formattedDate.getTime()) {
                ID = item.position;
            }
        });
        if (ID !== null) {
            return ID;
        }
    }

    $("#eventslist").before($("#pickadate"));
    $("#pickadate").before($("#PH_Message"));
    //$("#eventslist").hide();

    $(".extras .MediumSeatsOccupancy").each(function () {
        $(this).closest(".dataItem").addClass("medium-seats");
    });

    $(".extras .LowSeatsOccupation").each(function () {
        $(this).closest(".dataItem").addClass("low-seats");
    });

    $(".extras .SoldOut").each(function () {
        $(this).closest(".dataItem").addClass("sold-out");
    });

    $(".extras .HighSeatsOccupancy").each(function () {
        $(this).closest(".dataItem").addClass("high-seats");
    });
});

//require(["../UserContent/js/jquery.simplePagination.js"]);