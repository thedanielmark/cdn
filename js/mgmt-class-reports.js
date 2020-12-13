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

// Listen for full report button click
$("#fullFormButton").click(function () {
    event.preventDefault();
    // disable button
    //document.getElementById("viewsFormButton").setAttribute("disabled", "disabled");
    document.getElementById("viewsFormLoader").style.display = "block";

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    var start_date_non_formatted = document.getElementById("startDate").value;
    var end_date_non_formatted = document.getElementById("endDate").value;

    var start_date = start_date_non_formatted.slice(0, 10);
    var end_date = end_date_non_formatted.slice(0, 10);

    var year = document.getElementById("year").value;

    console.log(email);
    console.log(auth_token);
    console.log(start_date);
    console.log(end_date);
    console.log(year);

    // make AJAX call to get Excel sheet route
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/hod-full-export.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            start_date: start_date,
            end_date: end_date,
            year: year
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
            else if (parsedResponse === '""\n') {
                document.getElementById("viewsError").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
                // document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
            }
            else if (parsedResponse === '"db-fetch-error"\n' || parsedResponse === '"error"\n') {
                document.getElementById("viewsError").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
                // document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
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
                document.getElementById("fullReportDownloadButton").setAttribute("href", downloadUrl.replace(/['"]+/g, ''));
                document.getElementById("fullReportDownloadButton").classList.remove("d-none");
                document.getElementById("consolidatedReportDownloadButton").classList.add("d-none");
                document.getElementById("viewsOptionsContainer").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
            }
        },
        error: function (error) { }
    });
});

// Listen for consolidated report button click
$("#consolidatedFormButton").click(function () {
    event.preventDefault();
    // disable button
    //document.getElementById("viewsFormButton").setAttribute("disabled", "disabled");
    document.getElementById("viewsFormLoader").style.display = "block";

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    var start_date_non_formatted = document.getElementById("startDate").value;
    var end_date_non_formatted = document.getElementById("endDate").value;

    var start_date = start_date_non_formatted.slice(0, 10);
    var end_date = end_date_non_formatted.slice(0, 10);

    var year = document.getElementById("year").value;
    var department = document.getElementById("department").value;

    console.log(email);
    console.log(auth_token);
    console.log(start_date);
    console.log(end_date);
    console.log(department);
    console.log(year);

    // make AJAX call to get Excel sheet route
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/mgmt-class-consolidation.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            start_date: start_date,
            end_date: end_date,
            department: department,
            year: year
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
            else if (parsedResponse === '""\n') {
                document.getElementById("viewsError").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
                // document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
            }
            else if (parsedResponse === '"db-fetch-error"\n' || parsedResponse === '"error"\n') {
                document.getElementById("viewsError").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
                // document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
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
                document.getElementById("consolidatedReportDownloadButton").setAttribute("href", downloadUrl.replace(/['"]+/g, ''));
                document.getElementById("consolidatedReportDownloadButton").classList.remove("d-none");
                document.getElementById("fullReportDownloadButton").classList.add("d-none");
                document.getElementById("viewsOptionsContainer").style.display = "block";
                document.getElementById("viewsFormLoader").style.display = "none";
            }
        },
        error: function (error) { }
    });
});