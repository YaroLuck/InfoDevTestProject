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
    // фильтр по максимальному значению радиуса
    $('#max_radius').on('change', function () {
        // get the api data of updated variety
        if(this.value == "all")
            send_data['max_radius'] = "";
        else
            send_data['max_radius'] = this.value;
        getAPIData();
    });
    //upper_left_x
    $('#upper_left_x').on('change', function () {
        var u_l_x = $('#upper_left_x').val();
        var u_l_y = $('#upper_left_y').val();
        var b_r_x = $('#bottom_right_x').val();
        var b_r_y = $('#bottom_right_y').val();
        if(u_l_x.trim() && u_l_y.trim() && b_r_x.trim() && b_r_y.trim()){
            send_data['upper_left_x'] = u_l_x;
            send_data['upper_left_y'] = u_l_y;
            send_data['bottom_right_x'] = b_r_x;
            send_data['bottom_right_y'] = b_r_y;
        }
        else if(this.value == ""){
            send_data['upper_left_x'] = "";
            send_data['upper_left_y'] = "";
            send_data['bottom_right_x'] = "";
            send_data['bottom_right_y'] = "";
        }
        getAPIData();
    });
    //upper_left_y
    $('#upper_left_y').on('change', function () {
        var u_l_x = $('#upper_left_x').val();
        var u_l_y = $('#upper_left_y').val();
        var b_r_x = $('#bottom_right_x').val();
        var b_r_y = $('#bottom_right_y').val();
        if(u_l_x.trim() && u_l_y.trim() && b_r_x.trim() && b_r_y.trim()){
            send_data['upper_left_x'] = u_l_x;
            send_data['upper_left_y'] = u_l_y;
            send_data['bottom_right_x'] = b_r_x;
            send_data['bottom_right_y'] = b_r_y;
        }
        else if(this.value == ""){
            send_data['upper_left_x'] = "";
            send_data['upper_left_y'] = "";
            send_data['bottom_right_x'] = "";
            send_data['bottom_right_y'] = "";
        }
        getAPIData();
    });
    //bottom_right_x
    $('#bottom_right_x').on('change', function () {
        var u_l_x = $('#upper_left_x').val();
        var u_l_y = $('#upper_left_y').val();
        var b_r_x = $('#bottom_right_x').val();
        var b_r_y = $('#bottom_right_y').val();
        if(u_l_x.trim() && u_l_y.trim() && b_r_x.trim() && b_r_y.trim()){
            send_data['upper_left_x'] = u_l_x;
            send_data['upper_left_y'] = u_l_y;
            send_data['bottom_right_x'] = b_r_x;
            send_data['bottom_right_y'] = b_r_y;
        }
        else if(this.value == ""){
            send_data['upper_left_x'] = "";
            send_data['upper_left_y'] = "";
            send_data['bottom_right_x'] = "";
            send_data['bottom_right_y'] = "";
        }
        getAPIData();
    });
    //bottom_right_y
    $('#bottom_right_y').on('change', function () {
        var u_l_x = $('#upper_left_x').val();
        var u_l_y = $('#upper_left_y').val();
        var b_r_x = $('#bottom_right_x').val();
        var b_r_y = $('#bottom_right_y').val();
        if(u_l_x.trim() && u_l_y.trim() && b_r_x.trim() && b_r_y.trim()){
            send_data['upper_left_x'] = u_l_x;
            send_data['upper_left_y'] = u_l_y;
            send_data['bottom_right_x'] = b_r_x;
            send_data['bottom_right_y'] = b_r_y;
        }
        else if(this.value == ""){
            send_data['upper_left_x'] = "";
            send_data['upper_left_y'] = "";
            send_data['bottom_right_x'] = "";
            send_data['bottom_right_y'] = "";
        }
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
        // если резултата нет - показать нет устройств
        $("#no_results h5").html("Устройств не найдено");
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
    // подсчет количества устройств
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
            device_types_option = "<option value='all' selected>Все типы</option>";
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