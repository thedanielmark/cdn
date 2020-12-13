// hide error and loading div
hideAllLoadersAndErrors();
function hideAllLoadersAndErrors() {
    document.getElementById("deptSemFormError").style.display = "none";
    document.getElementById("deptSemFormLoader").style.display = "none";
    document.getElementById("studentListFormError").style.display = "none";
    document.getElementById("studentListFormLoader").style.display = "none";
    document.getElementById("subDeptStaffFormError").style.display = "none";
    document.getElementById("subDeptStaffFormLoader").style.display = "none";
    document.getElementById("hourSelectorFormError").style.display = "none";
    document.getElementById("hourSelectorFormLoader").style.display = "none";
}

// LISTEN FOR DEPARTMENT SEMESTER FORM SUBMIT
// dept and sem form
var deptSemForm = document.querySelector("#deptSemForm");
deptSemForm.addEventListener("submit", e => {
    e.preventDefault();

    document.getElementById("deptSemFormLoader").style.display = "block";
    document.getElementById("deptSemFormNext").setAttribute("disabled", "disabled");

    var deptSemFormDepartment = deptSemForm["department"].value;

    if (deptSemFormDepartment === "Information Technology") {
        var department = "dit";
    }
    if (deptSemFormDepartment === "Computer Science and Engineering") {
        var department = "dcse";
    }
    if (deptSemFormDepartment === "Electronics and Communication Engineering") {
        var department = "dece";
    }
    if (deptSemFormDepartment === "Electrical and Electronics Engineering") {
        var department = "deee";
    }
    if (deptSemFormDepartment === "Mechanical Engineering A") {
        var department = "dmea";
    }
    if (deptSemFormDepartment === "Mechanical Engineering B") {
        var department = "dmeb";
    }
    if (deptSemFormDepartment === "Science and Humanities") {
        var department = "dsh";
    }

    localStorage.deptSemFormDepartment = department;

    var semester = deptSemForm["semester"].value;
    // use this in the third and last carousel
    localStorage.deptSemFormSemester = semester;

    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/get-students-by-dept-sem.php",
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
            if (parsedResponse === "db-fetch-error") {
                // handle error
                var error = "There was an error while fetching the student list. The list may not exist or this may be a temporary error with the backend.Please try again."
                showDeptSemFormError(error);
                setTimeout(hideDeptSemFormError, 5000);
            }
            else if (parsedResponse === "invalid-auth-or-user-type") {
                // handle auth error
                var error = "Invalid auth token. Redirecting you to sign in page.";
                showDeptSemFormError(error);
                setTimeout(hideDeptSemFormError, 3000);
                setTimeout(function () {
                    localStorage.clear();
                    window.location.reload();
                }, 3000);
            }
            else {
                // success
                document.getElementById("deptSemFormLoader").style.display = "none";
                document.getElementById("deptSemFormNext").removeAttribute("disabled", "disabled");

                // clearing students list from previous students
                document.getElementById("studentsList").innerHTML = "";

                // student list generation
                for (var i in parsedResponse) {
                    if (parsedResponse[i].user_type == "student") {
                        // div to hold all content
                        var btn = document.createElement("div");
                        btn.classList.add("btn", "btn-outline-success", "col-12", "col-sm-5", "mx-1", "my-1", "py-4", "active");

                        // input
                        var input = document.createElement("input");
                        // setting attributes for input
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("id", parsedResponse[i].register_no);
                        input.setAttribute("value", parsedResponse[i].register_no);
                        input.setAttribute("checked", "checked");

                        // flex div
                        var regNoDiv = document.createElement("div");
                        // setting attributes
                        regNoDiv.classList.add("d-flex", "align-items-center", "student-list-card");

                        // icon div
                        var iconDiv = document.createElement("div");
                        iconDiv.classList.add("icon", "mb-0", "mr-2");

                        // icon
                        var icon = document.createElement("i");
                        icon.classList.add("mdi", "mdi-face");

                        // h5
                        var h5 = document.createElement("h5");
                        h5.classList.add("font-weight-bold", "mb-0");

                        // textnode for register number
                        var regNoTextNode = document.createTextNode(parsedResponse[i].register_no);

                        // name container div
                        var nameContainerDiv = document.createElement("div");
                        nameContainerDiv.classList.add("d-flex", "align-items-center", "mt-3", "flex-wrap");

                        // h4
                        var h4 = document.createElement("h6");
                        h4.classList.add("font-weight-bold", "mb-0", "mr-2");

                        // textnode for name
                        var nameTextNode = document.createTextNode(parsedResponse[i].full_name);

                        // nesting elements
                        iconDiv.appendChild(icon);
                        h5.appendChild(regNoTextNode);
                        regNoDiv.appendChild(iconDiv);
                        regNoDiv.appendChild(h5);
                        h4.appendChild(nameTextNode);
                        nameContainerDiv.appendChild(h4);
                        btn.appendChild(input);
                        btn.appendChild(regNoDiv);
                        btn.appendChild(nameContainerDiv);
                        document.getElementById("studentsList").appendChild(btn);
                    }
                }

                // load second slide
                $("#studentListCarousel").carousel("next");
                document.getElementById("deptSemFormLoader").style.display = "none";
                document.getElementById("deptSemFormNext").removeAttribute("disabled", "disabled");
            }
        },
        error: function (error) { }
    });

});

// errorswindow.studentsArray

function showDeptSemFormError(error) {
    document.getElementById("deptSemFormError").innerHTML = error;
    document.getElementById("deptSemFormError").style.display = "block";
    document.getElementById("deptSemFormLoader").style.display = "none";
    document.getElementById("deptSemFormNext").removeAttribute("disabled", "disabled");
}

function hideDeptSemFormError(error) {
    document.getElementById("deptSemFormError").style.display = "none";
}


// LISTEN FOR STUDENT LIST FORM SUBMIT
// dept and sem form
var studentListForm = document.querySelector("#studentListForm");
studentListForm.addEventListener("submit", e => {
    e.preventDefault();

    // show loader
    document.getElementById("studentListFormLoader").style.display = "block";
    document.getElementById("studentListFormNext").setAttribute("disabled", "disabled");

    window.students = [];
    $("#studentsList input[type='checkbox']:checked").each((_, {
        value
    }) => {
        students.push(value);
        studentsArray = JSON.stringify(students);
        console.log(studentsArray);
    });

    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    // getting department
    var subDeptStaffFormDepartment = subDeptStaffForm["subDeptStaffFormStaffDepartment"].value;

    if (subDeptStaffFormDepartment === "Information Technology") {
        var department = "dit";
    }
    if (subDeptStaffFormDepartment === "Computer Science and Engineering") {
        var department = "dcse";
    }
    if (subDeptStaffFormDepartment === "Electronics and Communication Engineering") {
        var department = "dece";
    }
    if (subDeptStaffFormDepartment === "Electrical and Electronics Engineering") {
        var department = "deee";
    }
    if (subDeptStaffFormDepartment === "Mechanical Engineering") {
        var department = "dme";
    }
    if (subDeptStaffFormDepartment === "Science and Humanities") {
        var department = "dsh";
    }

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
                console.log("invalid-auth-token. Redirecting to index.");
                window.location.replace("index.html?redirect=create-class-page.php");
            }
            else {
                // success
                document.getElementById("subDeptStaffFormStaffName").innerHTML = "";
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

                // change slide to next one
                // show loader
                $("#studentListCarousel").carousel("next");
                document.getElementById("studentListFormLoader").style.display = "none";
                document.getElementById("studentListFormNext").removeAttribute("disabled", "disabled");
            }
        },
        error: function (error) { }
    });

    var semester = localStorage.deptSemFormSemester;
    var department = localStorage.deptSemFormDepartment;

    // GETTING DEFAULT SUBJECT LIST
    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/get-subject-list-by-department.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            semester: semester,
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
                    option.setAttribute("value", parsedResponse[i].subject_code);

                    // create textnode to hold each name
                    var staffNameTextNode = document.createTextNode(parsedResponse[i].subject_name);

                    // assign options to dropdown
                    option.appendChild(staffNameTextNode);
                    document.getElementById("subDeptStaffFormSubjectNameCode").appendChild(option);
                }
            }
        },
        error: function (error) { }
    });
});


// LISTEN FOR CHANGES TO THE DEPARTMENT DROPDOWN ON SUBJECT DEPARTMENT STAFF FORM

$("#subDeptStaffFormStaffDepartment").change(function () {
    // clear dropdown list
    document.getElementById("subDeptStaffFormStaffName").innerHTML = "";

    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    // getting department
    var subDeptStaffFormDepartment = subDeptStaffForm["subDeptStaffFormStaffDepartment"].value;

    if (subDeptStaffFormDepartment === "Information Technology") {
        var department = "dit";
    }
    if (subDeptStaffFormDepartment === "Computer Science and Engineering") {
        var department = "dcse";
    }
    if (subDeptStaffFormDepartment === "Electronics and Communication Engineering") {
        var department = "dece";
    }
    if (subDeptStaffFormDepartment === "Electrical and Electronics Engineering") {
        var department = "deee";
    }
    if (subDeptStaffFormDepartment === "Mechanical Engineering") {
        var department = "dme";
    }
    if (subDeptStaffFormDepartment === "Science and Humanities") {
        var department = "dsh";
    }
    if (subDeptStaffFormDepartment === "Management") {
        var department = "mgmt";
    }

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
                console.log("invalid-auth-token. Redirecting to index.");
                window.location.replace("index.html?redirect=create-class-page.php");
            }
            else {
                // success
                document.getElementById("subDeptStaffFormStaffName").innerHTML = "";
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
            }
        },
        error: function (error) { }
    });
});

// STORING DEPARTMENT STAFF SUBJECT FORM VALUES
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

    var subjectName = $("#subDeptStaffFormSubjectNameCode :selected").text();
    localStorage.subjectNameFinal = subjectName;

    // load second slide
    $("#studentListCarousel").carousel("next");

    document.getElementById("subDeptStaffFormLoader").style.display = "none";
    document.getElementById("subDeptStaffFormNext").removeAttribute("disabled", "disabled");

});

// GETTING HOURS AND CREATING CLASS
// hour selector form
var hourSelectorForm = document.querySelector("#hourSelectorForm");
hourSelectorForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("hourSelectorFormLoader").style.display = "block";
    document.getElementById("hourSelectorFormNext").setAttribute("disabled", "disabled");

    window.hours = [];
    $("#hourSelectorForm input[type='checkbox']:checked").each((_, {
        value
    }) => {
        hours.push(value);
        hoursArrayRaw = hours;
        hoursArray = JSON.stringify(hoursArrayRaw);
        console.log(window.hoursArray);
    });

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    // outputting values
    console.log("Final Values to be sent");
    console.log(localStorage.subDeptStaffFormStaffUsername);
    console.log(localStorage.subjectNameFinal);
    console.log(localStorage.subDeptStaffFormSubjectCode);
    console.log(localStorage.deptSemFormDepartment);
    console.log(localStorage.deptSemFormSemester);
    console.log(window.studentsArray);
    console.log(window.hoursArray);

    $.ajax({
        type: "POST",
        url: "https://xstack.azurewebsites.net/create-class.php",
        datatype: "html",
        data: {
            username: email,
            auth_token: auth_token,
            staff: localStorage.subDeptStaffFormStaffUsername,
            subject_name: localStorage.subjectNameFinal,
            subject_code: localStorage.subDeptStaffFormSubjectCode,
            department: localStorage.deptSemFormDepartment,
            semester: localStorage.deptSemFormSemester,
            students: window.studentsArray,
            hours: window.hoursArray
        },
        success: function (response) {
            var parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
            if (parsedResponse === "timetable-failed" || parsedResponse === "pk-failed") {
                // handle error
                window.location.replace("create-class-page.php?popup=error");
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
                window.location.replace("create-class-page.php?popup=success");
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
        showToastPosition('Done!', 'You have successfully created the class!', 'bottom-right', 'success');
    }
    if (popup === "error") {
        // toast here
        showToastPosition('Oops!', 'That did\'t work.', 'bottom-right', 'error');
    }
}