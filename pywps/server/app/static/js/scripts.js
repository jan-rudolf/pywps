function pywps_pause_process(uuid) {

    var xhr = $.ajax( {
        url: "/processes/" + uuid,
        method: "PUT",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"action": "pause"})

    } );

    xhr.done( function (data) {

        if (!data.error) {
            $("#pause-btn-" + uuid).removeClass("display-block");
            $("#resume-btn-" + uuid).addClass("display-block");

            $("#status-text-" + uuid).html("Paused");

        } else{
            alert("Error - " + data.error);

        }

    } );

    xhr.fail( function () {
        console.log("Error - pywps_pause_process");

    } );

}


function pywps_stop_process(uuid) {
    var xhr = $.ajax( {
      url: "/processes/" + uuid,
      method: "DELETE"

    } );

    xhr.done( function( data ) {
        console.log("DONE stop " + uuid);

        if (!data.error) {
            $("#pause-btn-" + uuid).removeClass("display-block");
            $("#resume-btn-" + uuid).removeClass("display-block");
            $("#stop-btn-" + uuid).removeClass("display-block");

            $("#action-btn-" + uuid).html("-");

            $("#status-text-" + uuid).html("Stopped");

        } else{
            alert("Error - " + data.error);

        }

    } );

    xhr.fail( function () {
        console.log("Error - pywps_stop_process");

    } );

}

function pywps_resume_process(uuid) {
    var xhr = $.ajax( {
      url: "/processes/" + uuid,
      method: "PUT",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify({"action": "resume"})
    } );

    xhr.done(function (data) {
        console.log("DONE resume " + uuid);

        if (!data.error) {
            $("#pause-btn-" + uuid).addClass("display-block");
            $("#resume-btn-" + uuid).removeClass("display-block");

            $("#status-text-" + uuid).html("Running");

        } else {
            alert("Error - " + data.error);

        }

    } );

    xhr.fail( function() {
        alert("Error - pywps_resume_process");

    } );

}

function get_filter() {
    var filter = {
        status: $('#filter-status').val(),
        operation: $('#filter-operation').val(),
        identifier: $('#filter-identifier').val(),
        uuid: $('#filter-uuid').val(),
        pid: $('#filter-pid').val()
    }

    return filter;
}

function clear_filter() {
    $('#filter-status').val(0);
    $('#filter-operation').val(0);
    $('#filter-identifier').val(0);
    $('#filter-uuid').val("");
    $('#filter-pid').val("");
}

function pywps_refresh_processes_table () {
    var filter = get_filter();

    var xhr = $.ajax( {
      url: "/manage/table-entries",
      method: "POST",
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify(filter)
    } );

    xhr.done(function (data) {
        $('#processes_table').html(data);

    } );

    xhr.fail( function() {
        console.log("Error - pywps_refresh_processes_table");

    } );
}

//check the processes data every second (1000ms)
window.setInterval(pywps_refresh_processes_table, 1000);



