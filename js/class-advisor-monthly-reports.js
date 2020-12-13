// hide container loader
document.getElementById("viewsPageLoader").style.display = "none";
document.getElementById("viewsFormLoader").style.display = "none";
document.getElementById("viewsError").style.display = "none";
document.getElementById("viewsIframe").style.display = "none";
document.getElementById("viewsOptionsContainer").style.display = "none";

// Listen for full report button click
$("#fullFormButton").click(function () {
    event.preventDefault();
    // disable button
    //document.getElementById("viewsFormButton").setAttribute("disabled", "disabled");
    document.getElementById("viewsFormLoader").style.display = "block";

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    var dateFunction = new Date();
    var year = dateFunction.getFullYear();

    var month = document.getElementById("date").value;

    var date = year + "-" + month + "-01";

    console.log(email);
    console.log(auth_token);
    console.log(date);

    // make AJAX call to get Excel sheet route
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/monthly-consolidation.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            date: date
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

    var dateFunction = new Date();
    var year = dateFunction.getFullYear();

    var month = document.getElementById("date").value;

    var date = year + "-" + month + "-01";

    console.log(email);
    console.log(auth_token);
    console.log(date);

    // make AJAX call to get Excel sheet route
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/cumulative-monthly-consolidation.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            date: date
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