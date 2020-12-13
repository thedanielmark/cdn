// hide container loader
document.getElementById("viewsPageLoader").style.display = "none";
document.getElementById("viewsFormLoader").style.display = "none";
document.getElementById("viewsError").style.display = "none";
document.getElementById("viewsIframe").style.display = "none";
document.getElementById("viewsOptionsContainer").style.display = "none";

$('#startDate-popup').datepicker({
    format: "yyyy-mm-dd - DD"
});

$('#endDate-popup').datepicker({
    format: "yyyy-mm-dd - DD"
});

// get email from localStorage
var email = localStorage.enteredEmail;
var auth_token = localStorage.auth_token;
$.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/get-subject-list-for-views.php",
    datatype: "html",
    data: {
        username: email,
        auth_token: auth_token
    },
    success: function (response) {
        var parsedResponse = JSON.parse(response);
        if (parsedResponse === "invalid-auth-or-access") {
            // handle auth error
            localStorage.clear();
            window.location.reload();
        }
        else {
            // success
            for (var i in parsedResponse) {
                // create dropdown options
                var option = document.createElement("option");
                var subject_name_textnode = document.createTextNode(parsedResponse[i].subject_name);
                option.appendChild(subject_name_textnode);
                option.value = parsedResponse[i].subCode_dept_sem;

                document.getElementById("subject_list_dropdown").appendChild(option);
            }
        }
    },
    error: function (error) { }
});


// Listen for view range selector button click
$("#viewsFormButton").click(function () {
    event.preventDefault();
    // disable button
    //document.getElementById("viewsFormButton").setAttribute("disabled", "disabled");
    document.getElementById("viewsFormLoader").style.display = "block";

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    // get form inputs
    var subCode_dept_sem = document.getElementById("subject_list_dropdown").value;

    var start_date_non_formatted = document.getElementById("startDate").value;
    var end_date_non_formatted = document.getElementById("endDate").value;

    var start_date = start_date_non_formatted.slice(0, 10);
    var end_date = end_date_non_formatted.slice(0, 10);

    console.log(email);
    console.log(auth_token);
    console.log(subCode_dept_sem);
    console.log(start_date);
    console.log(end_date);

    // make AJAX call to get Excel sheet route
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/subject-view-xport.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            subCode_dept_sem: subCode_dept_sem,
            start_date: start_date,
            end_date: end_date
        },
        success: function (response) {
            console.log(response);
            var stringifiedResponse = JSON.stringify(response);
            console.log(stringifiedResponse);
            var parsedResponse = JSON.parse(stringifiedResponse);

            console.log(parsedResponse.concat("hi"));
 
            if (parsedResponse === "invalid-auth-or-access") {
                // handle auth error
                localStorage.clear();
                window.location.reload();
            }
            else if(parsedResponse === '""\n') {
                document.getElementById("viewsError").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
                document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
            }
            else if (parsedResponse === '"db-fetch-error"\n' || parsedResponse === '"error"\n') {
                document.getElementById("viewsError").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
                document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
            }
            else {
                // success
                var fileName = parsedResponse.replace(/\\/g, "/");
                var api = "https://view.officeapps.live.com/op/embed.aspx?src=xstack.azurewebsites.net/";
                var filePath = "https://xstack.azurewebsites.net/";
                var iframeUrl = (api).concat(fileName);
                var downloadUrl = (filePath).concat(fileName);
                document.getElementById("viewsIframe").setAttribute("src", iframeUrl.replace(/['"]+/g, ''));
                document.getElementById("viewsIframe").setAttribute("scrolling", "no");
                document.getElementById("viewsError").style.display = "none";
                document.getElementById("viewsIframe").style.display = "block";
                document.getElementById("reportDownloadButton").setAttribute("href", downloadUrl.replace(/['"]+/g, ''));
                document.getElementById("viewsOptionsContainer").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
            }
        },
        error: function (error) { }
    });
});