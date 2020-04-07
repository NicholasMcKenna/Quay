
define(function ($) {

    $('.ShowEventsitemsList').before($('<div class="pagingControl"></div>'));
    $('.pagingControl').after($('<div class="pagingDataContainer"></div>'));

    function template(data) {
        $(data).show();
    }

    var showlist = $('.ShowEventsitemsList .dataItem').clone().toArray()

    $('.pagingControl').pagination({
        dataSource: showlist,
        callback: function(data, pagination) {
            template(data);
            $('.pagingDataContainer').html(data);
        }
    })
});