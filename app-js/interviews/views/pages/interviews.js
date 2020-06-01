let getInterviewsList = async  () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('/interviews', options);
        return await response.json();
    } catch (err) {
        console.log('Error getting documents', err);
    }
};

let getId = async (title) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('/fetchInterview' + '?' + $.param({title: title}), options);
        return await response.json();
    } catch (err) {
        console.log('Error getting documents', err);
    }
};

let showInterviewPage = async (title) => {
    let data = await getId(title);
    let id = data.id;
    location.href = "/#/interviews/" + id;
};

let interviewsHtml = (interviewData) => {
    var html = '';

    if (interviewData.length > 0) {
        html += '<div class="table-responsive">';
        html += '<table class="table">';
        html += '<tbody>';
        var firstObj = interviewData[0];

        html += '<tr>';

        for(var key in firstObj){
            switch(key) {
                case 'interview_start_time':
                    html +=  '<th>' + 'start_time' + '</th>';
                    break;
                case 'interview_end_time':
                    html +=  '<th>' + 'end_time' + '</th>';
                    break;
                case 'attachment_url':
                    html += '<th>' + 'resume_link' + '</th>';
                    break;
                default:
                    html +=  '<th>' + key.toString() + '</th>';
            }
        }

        html += '<th>' + 'Overview'  + '</th>';
        html += '</tr>';

        let id = 0;
        interviewData.forEach(function(obj){
            html += '<tr>';
            for(var k in obj){
                switch(k) {
                case 'resume_url':
                    html += '<td>' + '<a href = ' + obj[k] + '>' + 'Link' + '</a>' + '</td>';
                    break;
                default:
                    html += '<td>' + obj[k] + '</td>';
                }
            }
            html += '<td>' + '<button id =' + id.toString() + '>' + 'View' + '</button>' + '</td>';
            id++;
        });

        html += '</tbody>';
        html += '</table>';
        html +=  '<div>';
    }

    return html
};


let Interviews = {

    render : async () => {
        let interviewList = await getInterviewsList();
        let interviewData = interviewList.data;

        let html = await interviewsHtml(interviewData);

        let view =  /*html*/`
            ${html}
        `;
        return view
    },

    postRender : async () => {
        let interviewList = await getInterviewsList();
        let interviewData = interviewList.data;
        let id = 0;
        interviewData.forEach(function(obj){
            let title = obj['title'];
            document.getElementById(id.toString()).addEventListener("click", () => { showInterviewPage(title) }, false);
            id++;
        });
    },

    interviewData : async () => {
        let interviewList = await getInterviewsList();
        return interviewList.data;
    }
};

export default Interviews;