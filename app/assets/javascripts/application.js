// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require jquery
//= require select2
//= require_tree .

document.addEventListener('turbolinks:load', function(){
    $.ajaxSetup({
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
    });

    $("#status_id").change(function() {
        var state = $('select#status_id :selected').text();
        $.post('update_status',
            {
                status: state
            },
         function (data, status) {
            if (status === 'success') {
                alert("Status successfully updated")
            }
         }
        )
    });

    fetch_auto_complete_info('/get_interview_users', "interviewee_select", "Enter interviewee name");
    fetch_auto_complete_info('/get_interview_users', "interviewer_select", "Enter interviewer name");

    update_unassigned_roles('assign_interviewee', 'assign_interviewee', 'interviewee_select');
    update_unassigned_roles('assign_interviewer', 'assign_interviewer', 'interviewer_select');

});

function update_unassigned_roles(url, id, box_id) {
    $("#" + id).click( function () {
        var val =  $("#" + box_id ).val();
        $.post( url,
            {
                user_id: val
            },
            function (data, status) {
                if (status === 'success') {
                    alert("Role successfully assigned")
                }
            }
        )
    });
}


function fetch_auto_complete_info(url, id, placeholder = "Select Here...") {
    $("#" + id).select2({
        minimumInputLength: 2,
        placeholder: placeholder,
        allowClear: true,
        tags: "true",
        ajax: {
            url: url,
            dataType: 'json',
            type: "GET",
            quietMillis: 50,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            id: item.value,
                            text: item.label
                        }
                    })
                };
            },
        }
    });
}




