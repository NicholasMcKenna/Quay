
$(document).ready(function() {

    paginator({
        get_rows: function () {
            return document.getElementById("list").getElementsByTagName("li");
        },
        box: document.getElementById("list_index")
    });


});
