
$(document).ready(function() {

    paginator({
        get_rows: function () {
            return document.getElementsByClassName("dataItem");
        },
        box: document.getElementsByClassName("pagingContainer")
    });


});
