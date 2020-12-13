// getting auth details from localStorage
var username = localStorage.email;
$.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/api-auth-status.php",
    datatype: "html",
    data: {
        username: username
    },
    success: function (response) {
        var parsedResponse = JSON.parse(response);
        //console.log(parsedResponse);
        if (parsedResponse === "yes") {
            // show content
            document.getElementById("mainContentContainer").classList.remove("d-none");
        }
        else {
            // failed
            document.getElementById("contentError").classList.add("d-none");
        }
    },
    error: function (error) { }
});
