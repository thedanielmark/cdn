document.getElementById("downloadHelperText").style.display = "none";

// dept and sem form
$("#requestSideloadButton").click(function () {
    document.getElementById("requestSideloadButton").innerHTML = "Requesting";
    document.getElementById("requestSideloadButton").setAttribute("disabled", "disabled");

    // getting auth details from localStorage
    var username = localStorage.email;
    var auth_token = localStorage.auth_token;

    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/request-sideload.php",
        datatype: "html",
        data: {
            username: username,
            auth_token: auth_token
        },
        success: function (response) {
            var parsedResponse = JSON.parse(response);
            //console.log(parsedResponse);
            if (parsedResponse === "request-success") {
                document.getElementById("downloadHelperText").innerHTML = "Requested Successfully!";
                document.getElementById("downloadHelperText").classList.remove("text-danger");
                document.getElementById("downloadHelperText").classList.add("text-success");
                document.getElementById("downloadHelperText").style.display = "block";
                document.getElementById("requestSideloadButton").innerHTML = "Request Sideload";
                setTimeout(hideHelperText, 10000);
            }
            else {
                document.getElementById("downloadHelperText").innerHTML = "Request failed. Please try again.";
                document.getElementById("downloadHelperText").classList.remove("text-success");
                document.getElementById("downloadHelperText").classList.add("text-danger");
                document.getElementById("downloadHelperText").style.display = "block";
                document.getElementById("requestSideloadButton").innerHTML = "Request Sideload";
                setTimeout(hideHelperText, 10000);
            }
        },
        error: function (error) { }
    });

    function hideHelperText() {
        document.getElementById("downloadHelperText").style.display = "none";
        document.getElementById("requestSideloadButton").removeAttribute("disabled", "disabled");
    }
});

