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

let interviewsHtml = (interviewData) => {
    var html = '';

    if (interviewData.length > 0) {
        html += '<div class="table-responsive">'
        html += '<table class="table">';
        html += '<tbody>';
        var firstObj = interviewData[0];

        html += '<tr>';

        for(var key in firstObj){
            switch(key) {
                case 'interview_start_time':
                    html +=  '<th>' + 'start_time' + '</th>'
                    break;
                case 'interview_end_time':
                    html +=  '<th>' + 'end_time' + '</th>'
                    break;
                case 'attachment_url':
                    html += '<th>' + 'resume_link' + '</th>'
                    break;
                default:
                    html +=  '<th>' + key.toString() + '</th>'
            }
        }

        html += '</tr>';

        interviewData.forEach(function(obj){
            html += '<tr>';
            for(var k in obj){
                switch(k) {
                case 'resume_url':
                    html += '<th>' + '<a href = ' + obj[k] + '>' + 'Link' + '</a>' + '</th>'
                    break;
                default:
                    html += '<td>' + obj[k] + '</td>'
                }
            }
            html += '</tr>'
        });

        html += '</tbody>'
        html += '</table>'
        html += '<div>'
    }

    return html
};


let Interviews = {

    render : async () => {
        let interviewsJson = await getInterviewsList();
        let interviewData = interviewsJson.data;
        let html = await interviewsHtml(interviewData);

        let view =  /*html*/`
            ${html}
        `;
        return view
    },

    postRender : async () => {

    },

    interviewData : async () => {
        let interviewsJson = await getInterviewsList();
        return interviewsJson.data
    }
};

export default Interviews;