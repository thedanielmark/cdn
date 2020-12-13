document.getElementById("sendToMailButton").style.cursor = "pointer";
document.getElementById("mail-success").classList.add("mt-4");
document.getElementById("mail-danger").classList.add("mt-4");

function sendToMail() {
    document.getElementById("sendToMailButton").innerHTML = `
    <div class="dot-opacity-loader-inside-button">
        <span></span>
        <span></span>
        <span></span>
    </div>`;
    document.getElementById("sendToMailButton").setAttribute("disabled", "disabled");

    var iframeLink = $("#viewsIframe").attr("src");
    console.log(iframeLink.length);
    var link = iframeLink.slice(51, 128);
    console.log(link);

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;
    // Post to API
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/mail-report.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            link: link
        },
        success: function (response) {
            var parsedResponse = JSON.parse(response);
            console.log(response);
            if (parsedResponse === "mail-success") {
                document.getElementById("mail-success").classList.remove("d-none");
                document.getElementById("mail-danger").classList.add("d-none");
                document.getElementById("sendToMailButton").innerHTML = "Send to Mail";
                document.getElementById("sendToMailButton").removeAttribute("disabled", "disabled");
            }
            else {
                // handle error
                document.getElementById("mail-success").classList.add("d-none");
                document.getElementById("mail-danger").classList.remove("d-none");
                document.getElementById("sendToMailButton").innerHTML = "Send to Mail";
                document.getElementById("sendToMailButton").removeAttribute("disabled", "disabled");
            }
        },
        error: function (error) { }
    });
}