// hide loader and error
document.getElementById("formLoader").style.display = "none";
document.getElementById("passwordError").style.display = "none";
document.getElementById("semesterLoader").style.display = "none";
document.getElementById("semesterChangePasswordError").style.display = "none";
document.getElementById("semester-card").style.display = "none";


// listen for "submit" click
var changePasswordForm = document.querySelector("#changePasswordForm");
changePasswordForm.addEventListener("submit", e => {
    console.log("submitted");
    e.preventDefault();
    document.getElementById("formLoader").style.display = "block";
    document.getElementById("changePasswordButton").setAttribute("disabled", "disabled");

    var newPassword = changePasswordForm["newPassword"].value;
    var confirmPassword = changePasswordForm["confirmPassword"].value;
    var oldPassword = changePasswordForm["oldPassword"].value;

    if (newPassword != confirmPassword) {
        // show error
        document.getElementById("passwordError").style.display = "block";
        document.getElementById("formLoader").style.display = "none";
        document.getElementById("changePasswordButton").removeAttribute("disabled", "disabled");
    }

    else {
        // get email from localStorage
        var email = localStorage.enteredEmail;
        localStorage.email = email;
        $.ajax({
            type: "POST",
            url: "https://xstack.azurewebsites.net/reset-password.php",
            datatype: "html",
            data: {
                username: email,
                password: oldPassword,
                newPassword: newPassword
            },
            success: function (response) {
                var parsedResponse = JSON.parse(response);
                console.log(response);
                if (parsedResponse === "invalid-password") {
                    // handle error
                    console.log("invalid-pass");
                    document.getElementById("passwordError").innerHTML = "Your current password is wrong.";
                    document.getElementById("passwordError").style.display = "block";
                    document.getElementById("formLoader").style.display = "none";
                    document.getElementById("changePasswordButton").removeAttribute("disabled", "disabled");
                }
                else if (parsedResponse === "password-update-error") {
                    // handle error
                    console.log("password-update-error");
                    document.getElementById("passwordError").innerHTML = "Sorry, there was an error updating your password. Please try again later.";
                    document.getElementById("passwordError").style.display = "block";
                    document.getElementById("formLoader").style.display = "none";
                    document.getElementById("changePasswordButton").removeAttribute("disabled", "disabled");
                }
                else {
                    localStorage.full_name = parsedResponse.full_name;
                    localStorage.auth_token = parsedResponse.auth_token;
                    localStorage.department = parsedResponse.department;
                    localStorage.picture_url = parsedResponse.picture_url;
                    console.log("Token from login: " + parsedResponse.auth_token);
                    logout();
                    console.log("Logged out");
                }
            },
            error: function (error) { }
        });
    }

});

// if (localStorage.user_type == "admin") {
//     // Get current semester
//     var email = localStorage.enteredEmail;
//     var auth_token = localStorage.auth_token;

//     $.ajax({
//         type: "POST",
//         url: "https://xstack.azurewebsites.net/get-current-semester.php",
//         datatype: "html",
//         success: function (response) {
//             var parsedResponse = JSON.parse(response);
//             console.log(parsedResponse);
//             localStorage.current_semester = parsedResponse;

//             if (parsedResponse == "even") {
//                 $("#even").prop("checked", true);
//             }
//             else {
//                 $("#odd").prop("checked", true);
//             }
//             document.getElementById("semester-card").style.display = "block";
//         },
//         error: function (error) { }
//     });
// }

// Listen for semester form click
var SemesterPasswordForm = document.querySelector("#SemesterPasswordForm");
SemesterPasswordForm.addEventListener("submit", e => {
    console.log("submitted");
    e.preventDefault();
    document.getElementById("semesterLoader").style.display = "block";
    document.getElementById("changeSemesterButton").setAttribute("disabled", "disabled");

    var password = SemesterPasswordForm["adminPassword"].value;
    var semester = $("input[name='semester']:checked").val();

    // get email from localStorage
    var email = localStorage.enteredEmail;

    localStorage.email = email;
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/change-semester.php",
        datatype: "html",
        data: {
            username: email,
            password: password,
            semester: semester
        },
        success: function (response) {
            console.log(response);
            var parsedResponse = JSON.parse(response);
            if (parsedResponse === "invalid-auth-or-access") {
                // handle error
                console.log("invalid-pass");
                localStorage.clear();
            }
            else if (parsedResponse == "update-successful") {
                console.log("Update Successful.");
                document.getElementById("semesterLoader").style.display = "none";
                document.getElementById("changeSemesterButton").removeAttribute("disabled", "disabled");
                document.getElementById("semesterSuccess").classList.remove("d-none");
                document.getElementById("semesterFailed").classList.add("d-none");
            }
            else {
                console.log("Update Failed.");
                document.getElementById("semesterLoader").style.display = "none";
                document.getElementById("changeSemesterButton").removeAttribute("disabled", "disabled");
                document.getElementById("semesterSuccess").classList.add("d-none");
                document.getElementById("semesterFailed").classList.remove("d-none");
            }
        },
        error: function (error) {}
    });
});