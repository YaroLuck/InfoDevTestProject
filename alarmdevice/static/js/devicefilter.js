var send_data = {}

$(document).ready(function () {
    // bring all the data without any filters
    getAPIData();
})

function putTableData(result) {
    // creating table row for each result and
    // pushing to the html cntent of table body of listing table
    let row;
    if(result["results"].length > 0){
        $("#no_results").hide();
        $("#list_data").show();
        $("#listing").html("");
        $.each(result["results"], function (a, b) {
            row = "<tr> <td>" + b.id + "</td>" +
                "<td>" + b.name + "</td>" +
                "<td>" + b.device_type + "</td>" +
                "<td>" + b.address + "</td>" +
                "<td>" + b.latitude + "</td>" +
                "<td>" + b.longtitude + "</td>" +
                "<td>" + b.cover_radius+ "</td></tr>"
            $("#listing").append(row);
        });
    }
    else{
        // if no result found for the given filter, then display no result
        $("#no_results h5").html("No results found");
        $("#list_data").hide();
        $("#no_results").show();
    }
    // setting previous and next page url for the given result
    let prev_url = result["previous"];
    let next_url = result["next"];
    // disabling-enabling button depending on existence of next/prev page.
    if (prev_url === null) {
        $("#previous").addClass("disabled");
        $("#previous").prop('disabled', true);
    } else {
        $("#previous").removeClass("disabled");
        $("#previous").prop('disabled', false);
    }
    if (next_url === null) {
        $("#next").addClass("disabled");
        $("#next").prop('disabled', true);
    } else {
        $("#next").removeClass("disabled");
        $("#next").prop('disabled', false);
    }
    // setting the url
    $("#previous").attr("url", result["previous"]);
    $("#next").attr("url", result["next"]);
    // displaying result count
    $("#result-count span").html(result["count"]);
}

function getAPIData() {
    let url = $('#list_data').attr("url")
    $.ajax({
        method: 'GET',
        url: url,
        data: send_data,
        beforeSend: function(){
            $("#no_results h5").html("Loading data...");
        },
        success: function (result) {
            putTableData(result);
        },
        error: function (response) {
            $("#no_results h5").html("Something went wrong");
            $("#list_data").hide();
        }
    });
}

$("#next").click(function () {
    let url = $(this).attr("url");
    if (!url)
        $(this).prop('all', true);

    $(this).prop('all', false);
    $.ajax({
        method: 'GET',
        url: url,
        success: function (result) {
            putTableData(result);
        },
        error: function(response){
            console.log(response)
        }
    });
})

$("#previous").click(function () {
    let url = $(this).attr("url");
    if (!url)
        $(this).prop('all', true);

    $(this).prop('all', false);
    $.ajax({
        method: 'GET',
        url: url,
        success: function (result) {
            putTableData(result);
        },
        error: function(response){
            console.log(response)
        }
    });
})