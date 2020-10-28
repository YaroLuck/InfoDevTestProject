var send_data = {}

$(document).ready(function () {
    // все данные без фильтров
    getAPIData();
    // получить список устройств
    getDeviceTypes();
    // выбор списка устройств
    $('#device_types').on('change', function () {
        // since province and region is dependent
        // on country select, emty all the options from select input
        //$("#province").val("all");
        //$("#region").val("all");
        //send_data['province'] = '';
        //send_data['region'] = '';

        // обновить выбранные устройства
        if(this.value == "all")
            send_data['device_type'] = "";
        else
            send_data['device_type'] = this.value;

        //get province of selected country
        //getProvince(this.value);
        // get api data of updated filters
        getAPIData();
    });
    // фильтр по минимальному значению радиуса
    $('#min_radius').on('change', function () {
        // get the api data of updated variety
        if(this.value == "all")
            send_data['min_radius'] = "";
        else
            send_data['min_radius'] = this.value;
        getAPIData();
    });
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

function getDeviceTypes() {
    let url = $("#device_types").attr("url");
    $.ajax({
        method: 'GET',
        url: url,
        data: {},
        success: function (result) {
            device_types_option = "<option value='all' selected>All Types</option>";
            $.each(result["device_types"], function (a, b) {
                device_types_option += "<option>" + b + "</option>"
            });
            $("#device_types").html(device_types_option)
        },
        error: function(response){
            console.log(response)
        }
    });
}