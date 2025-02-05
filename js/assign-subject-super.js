// hide error and loading div
hideAllLoadersAndErrors();
function hideAllLoadersAndErrors() {
    document.getElementById("deptSemFormError").style.display = "none";
    document.getElementById("deptSemFormLoader").style.display = "none";
    document.getElementById("subDeptStaffFormError").style.display = "none";
    document.getElementById("subDeptStaffFormLoader").style.display = "none";
    document.getElementById("hourSelectorFormError").style.display = "none";
    document.getElementById("hourSelectorFormLoader").style.display = "none";
}

$('#date-popup').datepicker({
    format: "yyyy-mm-dd"
});

// getting list of staff from default dropdown value
// AJAX to get list
// get email from localStorage
var email = localStorage.enteredEmail;
var auth_token = localStorage.auth_token;

console.log(email + "," + auth_token);

$.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/get-staff-list-by-department.php",
    datatype: "html",
    data: {
        username: email,
        auth_token: auth_token,
        department: "dit"
    },
    success: function (response) {
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse === "invalid-auth-token") {
            // handle auth error
            setTimeout(function () {
                localStorage.clear();
                window.location.reload();
            }, 1000);
        }
        else {
            // success
            for (var i in parsedResponse) {
                // print each response to option
                var option = document.createElement("option");
                option.setAttribute("value", parsedResponse[i].username);

                // create textnode to hold each name
                var staffNameTextNode = document.createTextNode(parsedResponse[i].full_name);

                // assign options to dropdown
                option.appendChild(staffNameTextNode);
                document.getElementById("subDeptStaffFormStaffName").appendChild(option);
            }

            console.log($("#subDeptStaffFormStaffName :selected").text());
        }
    },
    error: function (error) { }
});

// listen for dropdown list changes
$("#subDeptStaffFormStaffDepartment").change(function () {
    // clear dropdown list
    document.getElementById("subDeptStaffFormStaffName").innerHTML = "";
    // AJAX to get list
    var department = document.getElementById("subDeptStaffFormStaffDepartment").value;
    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;
    console.log(email + "," + auth_token, ", " + department);

    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/get-staff-list-by-department.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            department: department
        },
        success: function (response) {
            var parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
            if (parsedResponse === "invalid-auth-token") {
                // handle auth error
                setTimeout(function () {
                    localStorage.clear();
                    window.location.reload();
                }, 1000);
            }
            else {
                // success
                for (var i in parsedResponse) {
                    // print each response to option
                    var option = document.createElement("option");
                    option.setAttribute("value", parsedResponse[i].username);

                    // create textnode to hold each name
                    var staffNameTextNode = document.createTextNode(parsedResponse[i].full_name);

                    // assign options to dropdown
                    option.appendChild(staffNameTextNode);
                    document.getElementById("subDeptStaffFormStaffName").appendChild(option);
                }
                console.log($("#subDeptStaffFormStaffName :selected").text());
            }
        },
        error: function (error) { }
    });
});


// getting list of subjects from default dropdown value
// AJAX to get list
var semester = document.getElementById("semester").value;
// get email from localStorage
var email = localStorage.enteredEmail;
var auth_token = localStorage.auth_token;
$.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/get-subject-list-by-department.php",
    datatype: "html",
    data: {
        username: email,
        auth_token: auth_token,
        department: "dit",
        semester: semester
    },
    success: function (response) {
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse === "invalid-auth-token") {
            // handle auth error
            setTimeout(function () {
                localStorage.clear();
                window.location.reload();
            }, 1000);
        }
        else {
            // success
            for (var i in parsedResponse) {
                // print each response to option
                var option = document.createElement("option");
                option.setAttribute("value", parsedResponse[i].subject_code);

                // create textnode to hold each name
                var staffNameTextNode = document.createTextNode(parsedResponse[i].subject_name);

                // assign options to dropdown
                option.appendChild(staffNameTextNode);
                document.getElementById("subDeptStaffFormSubjectNameCode").appendChild(option);
            }
            var subjectName = $("#subDeptStaffFormSubjectNameCode :selected").text();
            localStorage.subjectNameFinal = subjectName;
        }
    },
    error: function (error) { }
});



// listen for dropdown list changes
$("#subDeptStaffFormSubjectDepartment").change(function () {
    console.log("change-detected");
    // clear dropdown list
    document.getElementById("subDeptStaffFormSubjectNameCode").innerHTML = "";
    // AJAX to get list
    var department = document.getElementById("subDeptStaffFormSubjectDepartment").value;
    var semester = document.getElementById("semester").value;
    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    console.log(email);
    console.log(auth_token);
    console.log(department);
    console.log(semester);

    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/get-subject-list-by-department.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            department: department,
            semester: semester
        },
        success: function (response) {
            var parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
            if (parsedResponse === "invalid-auth-token") {
                // handle auth error
                setTimeout(function () {
                    localStorage.clear();
                    window.location.reload();
                }, 1000);
            }
            else {
                // success
                for (var i in parsedResponse) {
                    // print each response to option
                    var option = document.createElement("option");
                    option.setAttribute("value", parsedResponse[i].subject_code);

                    // create textnode to hold each code
                    var staffNameTextNode = document.createTextNode(parsedResponse[i].subject_name);

                    // assign options to dropdown
                    option.appendChild(staffNameTextNode);
                    document.getElementById("subDeptStaffFormSubjectNameCode").appendChild(option);
                }
                var subjectName = $("#subDeptStaffFormSubjectNameCode :selected").text();
                localStorage.subjectNameFinal = subjectName;
            }
        },
        error: function (error) { }
    });
});
$("#subDeptStaffFormSubjectNameCode").change(function () {
    var subjectName = $("#subDeptStaffFormSubjectNameCode :selected").text();
    localStorage.subjectNameFinal = subjectName;
});

// dept and sem form
var deptSemForm = document.querySelector("#deptSemForm");
deptSemForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("deptSemFormLoader").style.display = "block";
    document.getElementById("deptSemFormNext").setAttribute("disabled", "disabled");

    var finalTransactionDepartment = deptSemForm["department"].value;
    // var department = deptSemForm["department"].value;
    // var dept = department;

    // // switching value of dept
    // switch (dept) {
    //     case "Information Technology":
    //         var finalTransactionDepartment = "dit";
    //         break;
    //     case "Computer Science":
    //         var finalTransactionDepartment = "dcse";
    //         break;
    //     case "Electronics and Communication":
    //         var finalTransactionDepartment = "dece";
    //         break;
    //     case "Electronics and Electrical":
    //         var finalTransactionDepartment = "deee";
    //         break;
    //     case "Mechanical A":
    //         var finalTransactionDepartment = "dmea";
    //         break;
    //     case "Mechanical B":
    //         var finalTransactionDepartment = "dmeb";
    //         break;
    // }

    localStorage.finalTransactionDepartment = finalTransactionDepartment;

    var semester = deptSemForm["semester"].value;

    localStorage.studentListFormDepartment = department;
    localStorage.studentListFormSemester = semester;

    // load second slide
    $("#studentListCarousel").carousel("next");
    document.getElementById("deptSemFormLoader").style.display = "none";
    document.getElementById("deptSemFormNext").removeAttribute("disabled", "disabled");
}
);

// errors
function showDeptSemFormError(error) {
    document.getElementById("deptSemFormError").innerHTML = error;
    document.getElementById("deptSemFormError").style.display = "block";
    document.getElementById("deptSemFormLoader").style.display = "none";
    document.getElementById("deptSemFormNext").removeAttribute("disabled", "disabled");
}

function hideDeptSemFormError(error) {
    document.getElementById("deptSemFormError").style.display = "none";
}


// sub, dept and staff form
var subDeptStaffForm = document.querySelector("#subDeptStaffForm");
subDeptStaffForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("subDeptStaffFormLoader").style.display = "block";
    document.getElementById("subDeptStaffFormNext").setAttribute("disabled", "disabled");

    //var staffUsername = subDeptStaffForm["staffUsername"].value;
    //var subjectCode = subDeptStaffForm["subjectCode"].value;
    var subDeptStaffFormStaffName = document.getElementById("subDeptStaffFormStaffName");
    var staffUsername = subDeptStaffFormStaffName.options[subDeptStaffFormStaffName.selectedIndex].value;
    var subDeptStaffFormSubjectNameCode = document.getElementById("subDeptStaffFormSubjectNameCode");
    var subjectCode = subDeptStaffFormSubjectNameCode.options[subDeptStaffFormSubjectNameCode.selectedIndex].value;

    localStorage.subDeptStaffFormStaffUsername = staffUsername;
    localStorage.subDeptStaffFormSubjectCode = subjectCode;

    // load second slide
    $("#studentListCarousel").carousel("next");

    document.getElementById("subDeptStaffFormLoader").style.display = "none";
    document.getElementById("subDeptStaffFormNext").removeAttribute("disabled", "disabled");

});


// hour selector form
var hourSelectorForm = document.querySelector("#hourSelectorForm");
hourSelectorForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("hourSelectorFormLoader").style.display = "block";
    document.getElementById("hourSelectorFormNext").setAttribute("disabled", "disabled");

    // get hour
    // var date_non_formatted = document.getElementById("date").value;
    // var date = date_non_formatted.slice(0, 10);
    var date = document.getElementById("date").value;
    var day = document.getElementById("day").value;
    var hour = document.getElementById("hour").value;

    // hours = [];
    // $("#hourSelectorForm input[type='checkbox']:checked").each((_, {
    //     value
    // }) => {
    //     hours.push(value);
    //     hoursArrayRaw = hours;
    //     hoursArray = JSON.stringify(hoursArrayRaw);
    //     console.log(window.hoursArray);
    // });

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    console.log(email);
    console.log(auth_token);
    console.log(localStorage.subDeptStaffFormStaffUsername);
    console.log(localStorage.subjectNameFinal);
    console.log(localStorage.subDeptStaffFormSubjectCode);
    console.log(localStorage.finalTransactionDepartment);
    console.log(localStorage.studentListFormSemester);
    console.log(hour);
    console.log(day);
    console.log(date);

    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/assign-subject-super.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            staff: localStorage.subDeptStaffFormStaffUsername,
            subject_name: localStorage.subjectNameFinal,
            subject_code: localStorage.subDeptStaffFormSubjectCode,
            department: localStorage.finalTransactionDepartment,
            semester: localStorage.studentListFormSemester,
            hour: hour,
            day: day,
            date: date
        },
        success: function (response) {
            var parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
            if (parsedResponse === "failed") {
                // handle error
                window.location.replace("permissions-page.php?popup=error");
            }
            else if (parsedResponse === "invalid-auth-or-access") {
                // handle auth error
                var error = "Invalid auth token. Redirecting you to sign in page.";
                showHourSelectorFormError(error);
                setTimeout(hideHourSelectorFormError, 3000);
                setTimeout(function () {
                    localStorage.clear();
                    window.location.reload();
                }, 3000);
            }
            else {
                // success
                window.location.replace("permissions-page.php?popup=success");
            }
        },
        error: function (error) { }
    });

});

// error functions
function showHourSelectorFormError(error) {
    document.getElementById("subDeptStaffFormError").innerHTML = error;
    document.getElementById("subDeptStaffFormError").style.display = "block";
    document.getElementById("subDeptStaffFormLoader").style.display = "none";
    document.getElementById("subDeptStaffFormNext").removeAttribute("disabled", "disabled");
}
function hideHourSelectorFormError() {
    document.getElementById("subDeptStaffFormError").style.display = "none";
}

// to check if the url has parameters
var url = window.location.href;
if (url.indexOf("?") > -1) {
    console.log("Url has params");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const popup = urlParams.get('popup');
    if (popup === "success") {
        // toast here
        showToastPosition('Done!', 'You have successfully assigned a substitute teacher to the class!', 'bottom-right', 'success');
    }
    if (popup === "error") {
        // toast here
        showToastPosition('Oops!', 'That did\'t work', 'bottom-right', 'error');
    }
}