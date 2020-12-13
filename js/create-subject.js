// hide error and loader
document.getElementById("subjectError").style.display = "none";
document.getElementById("subjectSuccess").style.display = "none";
document.getElementById("formLoader").style.display = "none";


// listen for "submit" click
var addSubjectForm = document.querySelector("#addSubjectForm");
addSubjectForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("formLoader").style.display = "block";
    document.getElementById("addSubjectButton").setAttribute("disabled", "disabled");

    var subjectNamePreEdit = addSubjectForm["subject_name"].value;
    var subjectCodeLowercase = addSubjectForm["subject_code"].value;
    var subjectCodePreEdit = subjectCodeLowercase.toUpperCase();
    var subjectType = addSubjectForm["subject_type"].value;
    var subjectAbbrLowercase = addSubjectForm["subject_abbr"].value;
    var subjectAbbr = subjectAbbrLowercase.toUpperCase();
    var department = addSubjectForm["department"].value;
    var semester = addSubjectForm["semester"].value;

    if (subjectType === "Laboratory Batch A") {
        var subjectCode = subjectCodePreEdit + "a";
        var subjectName = subjectNamePreEdit + " A";
        var subjectName = subjectName[0].toUpperCase() + subjectName.slice(1);
    }
    else if (subjectType === "Laboratory Batch B") {
        var subjectCode = subjectCodePreEdit + "b";
        var subjectName = subjectNamePreEdit + " B";
        var subjectName = subjectName[0].toUpperCase() + subjectName.slice(1);
    }
    else {
        var subjectCode = subjectCodePreEdit;
        var subjectName = subjectNamePreEdit;
        var subjectName = subjectName[0].toUpperCase() + subjectName.slice(1);
    }

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/create-subject.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            subject_name: subjectName,
            subject_type: subjectType,
            subject_code: subjectCode,
            subject_abbr: subjectAbbr,
            department: department,
            semester: semester
        },
        success: function (response) {
            var parsedResponse = JSON.parse(response);
            console.log(response);
            if (parsedResponse === "failed") {
                // handle error
                document.getElementById("subjectSuccess").style.display = "none";
                document.getElementById("subjectError").style.display = "block";
                document.getElementById("formLoader").style.display = "none";
                document.getElementById("addSubjectButton").removeAttribute("disabled", "disabled");
                setTimeout(function () {
                    document.getElementById("subjectError").style.display = "none";
                }, 5000);
            }
            else if (parsedResponse === "invalid-auth-token") {
                // handle auth error
                document.getElementById("subjectError").innerHTML = "Invalid auth token. Redirecting you to sign in page.";
                document.getElementById("subjectError").style.display = "block";
                setTimeout(function () {
                    localStorage.clear();
                    window.location.replace("index.html");
                }, 3000);
            }
            else {
                // success
                document.getElementById("subjectError").style.display = "none";
                document.getElementById("subjectSuccess").style.display = "block";
                document.getElementById("formLoader").style.display = "none";
                document.getElementById("addSubjectButton").removeAttribute("disabled", "disabled");
                document.getElementById("subject_name").value = "";
                document.getElementById("subject_code").value = "";
                document.getElementById("subject_abbr").value = "";
                document.getElementById("subject_type").value = "Regular";
                setTimeout(function () {
                    document.getElementById("subjectSuccess").style.display = "none";
                }, 5000);
            }
        },
        error: function (error) { }
    });

});
