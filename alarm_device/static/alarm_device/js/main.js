var send_data = {}

$(document).ready(function () {
    // фильтр по минимальному значению радиуса
    $('#min_radius').on('keyup', function () {
        send_data['cover_radius_gt'] = this.value;
        getAPIData();
    });
    // фильтр по максимальному значению радиуса
    $('#max_radius').on('keyup', function () {
        send_data['cover_radius_lt'] = this.value;
        getAPIData();
    });
    // выбор списка устройств
    $('#device_types').on('change', function () {
        // обновить выбранные устройства
        if(this.value == "all")
            send_data['device_type'] = "";
        else
            send_data['device_type'] = this.value;
        getAPIData();
    });
    //поиск по Адресу или Названию
    $("#search_name_address").on('keyup', function (){
        if (this.value == ""){
            send_data['search'] = "";
        }
        else{
            send_data['search'] = this.value;
        }
        getAPIData();
    });

    $('#upper_left_x').on('keyup', function () {
        sendRecAreaData();
        getAPIData();
    });

    $('#upper_left_y').on('keyup', function () {
        sendRecAreaData();
        getAPIData();
    });

    $('#bottom_right_x').on('keyup', function () {
        sendRecAreaData();
        getAPIData();
    });

    $('#bottom_right_y').on('keyup', function () {
        sendRecAreaData();
        getAPIData();
    });

    getAPIData();
})

function sendRecAreaData(){
    //отправка данных "попадание в прямоугольную область"
    send_data['longtitude_gt'] = $('#upper_left_x').val();
    send_data['latitude_lt'] = $('#upper_left_y').val();
    send_data['longtitude_lt'] = $('#bottom_right_x').val();
    send_data['latitude_gt'] = $('#bottom_right_y').val();
}

function getAPIData() {
    //полученние данных с апи
    let url = $('#devices_table').attr("url")
    $.ajax({
        method: 'GET',
        url: url,
        data: send_data,
        success: function (result) {
            putTableData(result);
        },
        error: function (response) {
            $("#no_results h5").html("Ошибка");
            $("#devices_table").hide();
        }
    });
}

function putTableData(result) {
    // создание строки для каждого результата
    let row;
    if(result["results"].length > 0){
        $("#no_results").hide();
        $("#devices_table").show();
        $("#devices_table_body").html("");
        $.each(result["results"], function (a, b) {
            row = "<tr> <td>" + b.id + "</td>" +
                "<td>" + b.name + "</td>" +
                "<td>" + b.device_type + "</td>" +
                "<td>" + b.address + "</td>" +
                "<td>" + b.latitude + "</td>" +
                "<td>" + b.longtitude + "</td>" +
                "<td>" + b.cover_radius+ "</td></tr>"
            $("#devices_table_body").append(row);
        });
    }
    else{
        // если резултата нет - показать нет устройств
        $("#no_results h5").html("Устройств не найдено");
        $("#devices_table").hide();
        $("#no_results").show();
    }
    let prev_url = result["previous"];
    let next_url = result["next"];
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
    $("#previous").attr("url", result["previous"]);
    $("#next").attr("url", result["next"]);
    // подсчет количества устройств
    $("#result-count span").html(result["count"]);
}
//кнопка "Вперед" пагинации
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
//кнопка "Назад" пагинации
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