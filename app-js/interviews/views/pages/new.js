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
    postData('/interviews', data).then((response) => {
        return response.json();
    }).then((response) => {
        debugger;
    }).catch((error) => {
        console.error(error);
    });
};

let New = {
    render : async () => {
        let view =  /*html*/`
          <form method="post">
            <div class="container">
            <h1>Create a Interview</h1>
            <hr>
            <label for="title"><b>Title</b></label>
            <input type="text" placeholder="Enter Title" name="interview[title]" required>
            <br> <br>
        
            <label for="date"><b>Interview date</b></label>
            <input type="date" placeholder="Enter Interview date"  name="interview[interview_date]" required>
            <br> <br>
     
            <label for="startTime"><b>Start Time</b></label>
            <input type="time" placeholder="Enter start time" name="interview[start_time]" required>
            <br> <br>
            
            <label for="endTime"><b>End Time</b></label>
            <input type="time" placeholder="Enter end time"  name="interview[end_time]" required>
            <br> <br>
            
            <label for="resume"><b>Resume </b></label>
            <input type="file" name="interview[attachment]" required>
             <br> <br>
            
            <label for="presence"><b>Presence</b></label>
            <select id="presence" name="interview[user_presence]">
                <option value="Interviewee">Interviewee</option>
                <option value="Interviewer">Interviewer</option>
             </select>
             <br> <br>
             
            <input type="submit" id="submit" name="commit" value="Create Interview">
          </div>
        
        </form>`;

        return view;
    },

    postRender : async () => {
        document.getElementById("submit").addEventListener("click", submitForm)
    }
};

export default New