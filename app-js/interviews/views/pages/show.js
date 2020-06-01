import Utils from './../../services/utils'

let getInterviewInfo = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`/interviews/` + id, options);
        return await response.json();
    } catch (err) {
        console.log('Error getting documents', err)
    }
};

let requestObj = async () => {
    let request = Utils.parseRequestURL();
    let info = await getInterviewInfo(request.id);
    return {
        interviewData : info.data,
        isAdmin : info.admin,
        id: request.id
    }
};

let appendPrefix = async(uncleanedUrl) => {
  let obj = await requestObj();
  return  '/interviews/' + obj.id + uncleanedUrl
};

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

let putData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'X-CSRF-TOKEN':  $('meta[name="csrf-token"]').attr('content')
        },
        body: data
    });

    return response.json();
};

let postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN':  $('meta[name="csrf-token"]').attr('content')
        },
        body: data
    });

    return response.json();
};

let submitForm = async (event) => {
    event.preventDefault();
    let form = document.querySelector('form');
    let data = new FormData(form);
    let obj = await requestObj();
    putData('/interviews/'+ obj.id , data).then((response) => {
        return response.json();
    }).then((response) => {
        debugger;
    }).catch((error) => {
        console.error(error);
    });
};

let changeStatus = async () => {
    let obj = await requestObj();
    var state = $('select#status_id :selected').text();
    let url = appe
    postData(addIdPrefix('/update_status'), state).then((response) => {
        return response.json();
    }).then((response) => {
        debugger;
    }).catch((error) => {
        console.error(error);
    });
};

let Show = {

    render : async () => {
        let obj = await requestObj();
        let data = obj.interviewData;

         let view  = /*html*/`
          <form method="post">
            <div class="container">
            <h1>Edit Interview</h1>
            <hr>
            <label for="title"><b>Title</b></label>
            <input type="text" placeholder="Enter Title" name="interview[title]" value=${data.title} required>
            <br> <br>
        
            <label for="date"><b>Interview date</b></label>
            <input type="date" placeholder="Enter Interview date"  name="interview[interview_date]" value=${data.interview_date} required>
            <br> <br>
     
            <label for="startTime"><b>Start Time</b></label>
            <input type="time" placeholder="Enter start time" name="interview[start_time]" value=${data.interview_start_time} required>
            <br> <br>
            
            <label for="endTime"><b>End Time</b></label>
            <input type="time" placeholder="Enter end time"  name="interview[end_time]" value=${data.interview_end_time} required>
            <br> <br>
            
            <label for="resume"><b> Resume </b></label>
            <input type="file" name="interview[attachment]"  required>
             <br> <br>
            
            <label for="presence"><b>Presence</b></label>
            <select id="presence" name="interview[user_presence]">
                <option value="Interviewee">Interviewee</option>
                <option value="Interviewer">Interviewer</option>
             </select>
             <br> <br>     
            <input type="submit" id="edit" name="commit" value="Edit Interview">
        </form>
        
         <br/> <br/> <br/> <br/>
        
        <div id="admin">
            <h1>Update Status</h1>
            <select id="status_id">
                <option value="requested">requested</option>
                <option value="approved">approved</option>
                <option value="declined">declined</option>
                <option value="completed">completed</option>
            </select>
            <br/> <br/>
        </div>
    </div>`;

        return view;
    },

    postRender : async () => {
        let obj = await requestObj();
        let isAdmin = obj.isAdmin;
        let info = obj.interviewData;
        let admin = document.getElementById("admin");

        if (admin) {
            if (info.interviewer_name === 'Not Assigned') {
                let element = document.createElement("select");
                element.setAttribute("style", "width: 150px; height: 20px;");
                let option = document.createElement("option");
                element.setAttribute("id", "interviewer_select");
                element.appendChild(option);
                admin.appendChild(element);
                let button = document.createElement("button");
                button.innerHTML = 'Assign Interviewer';
                button.setAttribute("id", 'assign_interviewee');
                button.setAttribute("type", "button");
                admin.appendChild(button);
            }
            if (info.interviewee_name === 'Not Assigned') {
                let element = document.createElement("select");
                element.setAttribute("style", "width: 150px; height: 20px;");
                let option = document.createElement("option");
                element.setAttribute("id", "interviewee_select");
                element.appendChild(option);
                admin.appendChild(element);
                let button = document.createElement("button");
                button.innerHTML = 'Assign Interviewee';
                button.setAttribute("id", 'assign_interviewer');
                button.setAttribute("type", "button");
                admin.appendChild(button);
            }
        }

        document.getElementById("edit").addEventListener("click", submitForm);
        document.getElementById("status_id").addEventListener("change", changeStatus);

        $.ajaxSetup({
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
        });

        let interviewUsers = await appendPrefix('/get_interview_users');
        fetch_auto_complete_info(interviewUsers, "interviewee_select", "Enter interviewee name");
        fetch_auto_complete_info(interviewUsers, "interviewer_select", "Enter interviewer name");

        let assignInterviewee = await appendPrefix('/assign_interviewee');
        let assignInterviewer = await appendPrefix('/assign_interviewer');

        update_unassigned_roles(assignInterviewee, 'assign_interviewee', 'interviewee_select');
        update_unassigned_roles(assignInterviewer, 'assign_interviewer', 'interviewer_select');
    }
};

export default Show