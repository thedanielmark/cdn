document.getElementById("uploadSheetLoader").style.display = "none";
document.getElementById("uploadZipLoader").style.display = "none";
document.getElementById("bulkSuccess").style.display = "none";
document.getElementById("bulkFailed").style.display = "none";
document.getElementById("zipSuccess").style.display = "none";
document.getElementById("zipFailed").style.display = "none";

$(document).ready(function (e) {
    // Listen for sheet upload click
    $('#uploadSheetButton').on('click', event => {
        event.preventDefault();
        document.getElementById("uploadSheetLoader").style.display = "block";
        document.getElementById("uploadSheetButton").setAttribute("disabled", "disabled");
        var file_data = $('#sheet').prop('files')[0];
        var form_data = new FormData();
        form_data.append('sheet', file_data);

        var username = localStorage.email;
        var auth_token = localStorage.auth_token;

        form_data.append('username', username);
        form_data.append('auth_token', auth_token);

        $.ajax({
            url: 'https://xstack.azurewebsites.net/bulk-users-upload.php', // point to server-side PHP script 
            dataType: 'html',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (response) {
                var parsedResponse = JSON.parse(response);
                console.log(parsedResponse);
                if (parsedResponse == "invalid-auth-or-access") {
                    localStorage.clear();
                    window.location.replace("index.html");
                }
                else if (parsedResponse == "success") {
                    $('.dropify-clear').click();
                    document.getElementById("bulkSuccess").style.display = "block";
                    document.getElementById("bulkFailed").style.display = "none";
                    document.getElementById("uploadSheetLoader").style.display = "none";
                    document.getElementById("uploadSheetButton").removeAttribute("disabled", "disabled");
                }
                else if (parsedResponse == "db-fetch-error" || parsedResponse == "error" || parsedResponse == "empty" || parsedResponse == "failed") {
                    document.getElementById("bulkSuccess").style.display = "none";
                    document.getElementById("bulkFailed").style.display = "block";
                    document.getElementById("uploadSheetLoader").style.display = "none";
                    document.getElementById("uploadSheetButton").removeAttribute("disabled", "disabled");
                }
            },
            error: function (response) { }
        });
    });

    // // Listen for zip upload click
    $('#uploadZipButton').on('click', event => {
        event.preventDefault();
        document.getElementById("uploadZipLoader").style.display = "block";
        document.getElementById("uploadZipButton").setAttribute("disabled", "disabled");
        var file_data = $('#zip').prop('files')[0];
        var form_data = new FormData();
        form_data.append('zip', file_data);

        var username = localStorage.email;
        var auth_token = localStorage.auth_token;

        form_data.append('username', username);
        form_data.append('auth_token', auth_token);

        $.ajax({
            url: 'https://xstack.azurewebsites.net/zip-upload.php', // point to server-side PHP script 
            dataType: 'html',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (response) {
                console.log(response);
                var parsedResponse = JSON.parse(response);
                console.log(parsedResponse);
                if (parsedResponse == "invalid-auth-or-access") {
                    localStorage.clear();
                    window.location.replace("index.html");
                }
                else if (parsedResponse == "success") {
                    $('.dropify-clear').click();
                    document.getElementById("zipSuccess").style.display = "block";
                    document.getElementById("zipFailed").style.display = "none";
                    document.getElementById("uploadZipLoader").style.display = "none";
                    document.getElementById("uploadZipButton").removeAttribute("disabled", "disabled");
                }
                else if (parsedResponse == "failed" || parsedResponse == "empty") {
                    document.getElementById("zipSuccess").style.display = "none";
                    document.getElementById("zipFailed").style.display = "block";
                    document.getElementById("uploadZipLoader").style.display = "none";
                    document.getElementById("uploadZipButton").removeAttribute("disabled", "disabled");
                }
            },
            error: function (response) { }
        });
    });
});