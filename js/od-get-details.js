document.getElementById("odFormContainer").style.display = "none";
document.getElementById("odFormContainerLoader").style.display = "block";
document.getElementById("odFormLoader").style.display = "none";
document.getElementById("departmentInput").style.display = "none";
document.getElementById("departmentSelect").style.display = "none";

// getting auth details from localStorage
var username = localStorage.email;
var auth_token = localStorage.auth_token;
//console.log("Auth Token from Auth status: " + auth_token);

if (auth_token === "" || username === "") {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageName = urlParams.get('page');
  //console.log(pageName);

  window.location.replace("index.html?redirect=" + pageName);
  //window.location.replace("index.html");
}
else {
  $.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/auth-status.php",
    datatype: "html",
    data: {
      username: username,
      auth_token: auth_token
    },
    success: function (response) {
      var parsedResponse = JSON.parse(response);
      console.log(parsedResponse);
      if (parsedResponse != "false") {
        // hide sidebar profile shimmer
        document.getElementById("sidebar-profile-shimmer-container").style.display = "none";

        document.getElementById("current-user-full-name-container").innerHTML = parsedResponse.full_name;

        localStorage.full_name = parsedResponse.full_name;

        localStorage.department = parsedResponse.department;

        // setting department
        if (parsedResponse.department === "dit") {
          localStorage.department_full = "Information Technology";
        }

        if (parsedResponse.department === "dcse") {
          localStorage.department_full = "Computer Science";
        }

        if (parsedResponse.department === "deee") {
          localStorage.department_full = "Electrical and Electronics";
        }

        if (parsedResponse.department === "dece") {
          localStorage.department_full = "Electronics and Communication";
        }

        if (parsedResponse.department === "dme") {
          localStorage.department_full = "Mechanical";
        }

        if (parsedResponse.department === "dsh") {
          localStorage.department_full = "Science & Humanities";
        }

        if (parsedResponse.department === "mgmt") {
          localStorage.department_full = "Management";
        }

        document.getElementById("current-user-department-container").innerHTML = localStorage.department_full;
        var unformatted_picture_url = parsedResponse.picture_url;
        var picture_url = unformatted_picture_url.replace(/\\/g, "");
        document.getElementById("current-user-profile-picture").setAttribute("src", picture_url);
        // hide topbar profile picture loader
        document.getElementById("topbar-profile-picture-loader").style.display = "none";
        // show topbar profile picture
        document.getElementById("current-user-profile-picture").style.display = "block";

        // rendering left sidebar links  
        if (parsedResponse.isClassAdvisor == 1) {
          document.getElementById("class-advisor-views").classList.remove("d-none");
        }

        if (parsedResponse.isManagement == 1) {
          document.getElementById("mgmt-views").classList.remove("d-none");
          document.getElementById("admin-views").classList.remove("d-none");
        }

        if (parsedResponse.user_type == "hod") {
          document.getElementById("hod-views").classList.remove("d-none");
          document.getElementById("admin-views").classList.remove("d-none");
        }

        if (parsedResponse.user_type == "admin") {
          document.getElementById("admin-views").classList.remove("d-none");
        }

        localStorage.user_type = parsedResponse.user_type;

        // hide shimmer
        document.getElementById("u_0_v_sidebar").classList.add("d-none");
        // show links
        document.getElementById("sidebar-links-container").classList.remove("d-none");

        odGetDetails();

      }

      else {
        // clear the auth_token
        localStorage.clear();
        // redirect to index page
        var path = window.location.pathname;
        var pageName = path.split("/").pop();
        console.log(pageName);
        window.location.replace("index.html?redirect=" + pageName);
      }
    },
    error: function (error) { }
  });
}

function odGetDetails() {

  $('#datepicker-popup').datepicker({
    format: "yyyy-mm-dd - DD"
  });

  var finalResponse = [];
  var workingResponse = [];

  var email = localStorage.enteredEmail;
  var auth_token = localStorage.auth_token;

  $.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/get-current-datetime-day.php",
    datatype: "html",
    data: {
      username: email,
      auth_token: auth_token
    },
    success: function (response) {
      var parsedResponse = JSON.parse(response);
      var dateFromResponse = parsedResponse.displaydate;
      var date = dateFromResponse.substring(0, 10);
      localStorage.date = date;
      document.getElementById("dateInput").value = parsedResponse.displaydate;

      mainAPI();
    },
    error: function (error) { }
  });


  // // ajax call to get default values
  // if (departmentTemp === "Information Technology") {
  //     var department = "dit";
  // }
  // if (departmentTemp === "Computer Science") {
  //     var department = "dcse";
  // }
  // if (departmentTemp === "Electronics and Communication") {
  //     var department = "dece";
  // }
  // if (departmentTemp === "Electronics and Electrical") {
  //     var department = "deee";
  // }
  // if (departmentTemp === "Mechanical Engineering") {
  //     var department = "dme";
  // }
  // // if (departmentTemp === "Mechanical B") {
  // //     var department = "dmeb";
  // // }
}

function mainAPI() {
  // var year = $("input[name='year']:checked").val();
  var year = document.getElementById("yearInput").value;
  var date = localStorage.date;
  // var hour = $("input[name='hour']:checked").val();
  //var hour = document.getElementById("hour").value;

  // get email from localStorage
  var email = localStorage.enteredEmail;
  var auth_token = localStorage.auth_token;

  // Check department
  if (localStorage.department == "dme") {
    // Handle Mech
    document.getElementById("departmentInput").style.display = "none";
    document.getElementById("departmentSelect").style.display = "block";

    var department = document.getElementById("departmentSelect").value;

    console.log(email);
    console.log(auth_token);
    console.log(department);
    console.log(year);
    console.log(date);
    console.log(1);

    $.ajax({
      type: "POST",
      url: "https://xstack.azurewebsites.net/od-superuser.php",
      datatype: "html",
      data: {
        username: email,
        auth_token: auth_token,
        department: department,
        year: year,
        date: date,
        hour: 1
      },
      success: function (response) {
        // success
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse === "invalid-auth-or-access") {
          // handle auth error
          localStorage.clear();
          window.location.reload();
        }
        else if (parsedResponse === "no-class") {
          document.getElementById("subjectDropdown").innerHTML = "";
          document.getElementById("subjectDropdown").classList.add("disabledDivOpacity");
          document.getElementById("takeAttendanceError").style.display = "block";
          document.getElementById("odFormButton").setAttribute("disabled", "disabled");
          // Make page visible
          document.getElementById("odFormContainer").style.display = "block";
          document.getElementById("odFormContainerLoader").style.display = "none";
        }
        else {
          // success
          finalResponse = [];
          workingResponse = [];

          // copying over parsedResponse to workingResponse
          workingResponse = parsedResponse;

          for (var i in workingResponse) {
            var working_subCode_dept_sem = workingResponse[i].subCode_dept_sem;

            // checking if the subCode_dept_sem exists in finalResponse
            if (
              finalResponse.some(
                (finalResponse) =>
                  finalResponse.subCode_dept_sem === working_subCode_dept_sem
              )
            ) {
              var sourceIndex = finalResponse.findIndex(obj => obj.subCode_dept_sem == working_subCode_dept_sem);

              // checking if the source is super
              if (finalResponse[sourceIndex].source === "regular") {
                console.log(finalResponse[sourceIndex], 1, workingResponse[i]);
                finalResponse.splice(sourceIndex, 1, workingResponse[i]);
              }
            } else {
              finalResponse.push(workingResponse[i]);
            }
          }

          document.getElementById("subjectDropdown").innerHTML = "";

          for (var i in finalResponse) {
            var option = document.createElement("option");
            var optionTextNode = document.createTextNode(finalResponse[i].subject_name);
            option.setAttribute("data-pk", finalResponse[i].subCode_dept_sem);
            option.setAttribute("data-timestamp", finalResponse[i].required_timestamp);
            option.appendChild(optionTextNode);
            document.getElementById("subjectDropdown").appendChild(option);
          }
          // making the dropdown accessible
          document.getElementById("subjectDropdown").classList.remove("disabledDivOpacity");
          document.getElementById("takeAttendanceError").style.display = "none";
          document.getElementById("odFormButton").removeAttribute("disabled", "disabled");
          // This is where the entire page is visible
          console.log("Visible");
          document.getElementById("odFormContainer").style.display = "block";
          document.getElementById("odFormContainerLoader").style.display = "none";
        }
      },
      error: function (error) { }
    });
  }
  else {
    // Do the usual crap
    document.getElementById("departmentInput").style.display = "block";
    document.getElementById("departmentSelect").style.display = "none";

    document.getElementById("departmentInput").value = localStorage.department_full;
    console.log(email);
    console.log(auth_token);
    console.log(localStorage.department);
    console.log(year);
    console.log(date);
    console.log(1);

    $.ajax({
      type: "POST",
      url: "https://xstack.azurewebsites.net/od-superuser.php",
      datatype: "html",
      data: {
        username: email,
        auth_token: auth_token,
        department: localStorage.department,
        year: year,
        date: date,
        hour: 1
      },
      success: function (response) {
        // success
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse === "invalid-auth-or-access") {
          // handle auth error
          localStorage.clear();
          window.location.reload();
        }
        else if (parsedResponse === "no-class") {
          document.getElementById("subjectDropdown").innerHTML = "";
          document.getElementById("subjectDropdown").classList.add("disabledDivOpacity");
          document.getElementById("takeAttendanceError").style.display = "block";
          document.getElementById("odFormButton").setAttribute("disabled", "disabled");
          // Make page visible
          document.getElementById("odFormContainer").style.display = "block";
          document.getElementById("odFormContainerLoader").style.display = "none";
        }
        else {
          // success
          finalResponse = [];
          workingResponse = [];

          // copying over parsedResponse to workingResponse
          workingResponse = parsedResponse;

          for (var i in workingResponse) {
            var working_subCode_dept_sem = workingResponse[i].subCode_dept_sem;

            // checking if the subCode_dept_sem exists in finalResponse
            if (
              finalResponse.some(
                (finalResponse) =>
                  finalResponse.subCode_dept_sem === working_subCode_dept_sem
              )
            ) {
              var sourceIndex = finalResponse.findIndex(obj => obj.subCode_dept_sem == working_subCode_dept_sem);

              // checking if the source is super
              if (finalResponse[sourceIndex].source === "regular") {
                console.log(finalResponse[sourceIndex], 1, workingResponse[i]);
                finalResponse.splice(sourceIndex, 1, workingResponse[i]);
              }
            } else {
              finalResponse.push(workingResponse[i]);
            }
          }

          document.getElementById("subjectDropdown").innerHTML = "";

          for (var i in finalResponse) {
            var option = document.createElement("option");
            var optionTextNode = document.createTextNode(finalResponse[i].subject_name);
            option.setAttribute("data-pk", finalResponse[i].subCode_dept_sem);
            option.setAttribute("data-timestamp", finalResponse[i].required_timestamp);
            option.appendChild(optionTextNode);
            document.getElementById("subjectDropdown").appendChild(option);
          }
          // making the dropdown accessible
          document.getElementById("subjectDropdown").classList.remove("disabledDivOpacity");
          document.getElementById("takeAttendanceError").style.display = "none";
          document.getElementById("odFormButton").removeAttribute("disabled", "disabled");
          // This is where the entire page is visible
          console.log("Visible");
          document.getElementById("odFormContainer").style.display = "block";
          document.getElementById("odFormContainerLoader").style.display = "none";
        }
      },
      error: function (error) { }
    });
  }

  // DETECTING CHANGES IN INPUTS
  // $('#odForm').on('keyup change paste', 'input', function () {
  $('#dateInput, #yearInput, #hour, #departmentSelect').change(function () {
    console.log("changed");
    document.getElementById("odFormLoader").style.display = "block";
    document.getElementById("odFormButton").setAttribute("disabled", "disabled");

    if(localStorage.department == "dme") {
      // Get department from localStorage
      var department = document.getElementById("departmentSelect").value;
    }
    else {
      // Get department from dropdown
      var department = localStorage.department;
    }

    // var year = $("input[name='year']:checked").val();
    var year = document.getElementById("yearInput").value;
    var dateTemp = document.getElementById("dateInput").value;
    var date = dateTemp.substring(0, 10);
    // var hour = $("input[name='hour']:checked").val();
    var hour = document.getElementById("hour").value;

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token

    $.ajax({
      type: "POST",
      url: "https://xstack.azurewebsites.net/od-superuser.php",
      datatype: "html",
      data: {
        username: email,
        auth_token: auth_token,
        department: department,
        year: year,
        date: date,
        hour: hour
      },
      success: function (response) {
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse === "invalid-auth-or-access") {
          // handle auth error
          localStorage.clear();
          window.location.reload();
        }
        else if (parsedResponse === "no-class") {
          document.getElementById("subjectDropdown").innerHTML = "";
          document.getElementById("subjectDropdown").classList.add("disabledDivOpacity");
          document.getElementById("takeAttendanceError").style.display = "block";
          document.getElementById("odFormButton").setAttribute("disabled", "disabled");
          document.getElementById("odFormLoader").style.display = "none";
        }
        else {
          // success
          finalResponse = [];
          workingResponse = [];

          // copying over parsedResponse to workingResponse
          workingResponse = parsedResponse;

          for (var i in workingResponse) {
            var working_subCode_dept_sem = workingResponse[i].subCode_dept_sem;

            // checking if the subCode_dept_sem exists in finalResponse
            if (
              finalResponse.some(
                (finalResponse) =>
                  finalResponse.subCode_dept_sem === working_subCode_dept_sem
              )
            ) {
              var sourceIndex = finalResponse.findIndex(obj => obj.subCode_dept_sem == working_subCode_dept_sem);

              // checking if the source is super
              if (finalResponse[sourceIndex].source === "regular") {
                console.log(finalResponse[sourceIndex], 1, workingResponse[i]);
                finalResponse.splice(sourceIndex, 1, workingResponse[i]);
              }
            } else {
              finalResponse.push(workingResponse[i]);
            }
          }

          document.getElementById("subjectDropdown").innerHTML = "";

          for (var i in finalResponse) {
            var option = document.createElement("option");
            var optionTextNode = document.createTextNode(finalResponse[i].subject_name);
            option.setAttribute("data-pk", finalResponse[i].subCode_dept_sem);
            option.setAttribute("data-timestamp", finalResponse[i].required_timestamp);
            option.appendChild(optionTextNode);
            document.getElementById("subjectDropdown").appendChild(option);
          }
          // making the dropdown accessible
          document.getElementById("subjectDropdown").classList.remove("disabledDivOpacity");
          document.getElementById("takeAttendanceError").style.display = "none";
          document.getElementById("odFormButton").removeAttribute("disabled", "disabled");
          document.getElementById("odFormLoader").style.display = "none";
        }
      },
      error: function (error) { }
    });
  });


  // LISTEN FOR FORM SUBMISSION
  var odForm = document.querySelector("#odForm");
  odForm.addEventListener("submit", e => {
    e.preventDefault();

    document.getElementById("odFormLoader").style.display = "block";
    document.getElementById("odFormButton").setAttribute("disabled", "disabled");

    var select = document.getElementById("subjectDropdown");
    localStorage.subCode_dept_sem = select.options[select.selectedIndex].dataset.pk;
    localStorage.required_timestamp = select.options[select.selectedIndex].dataset.timestamp;

    window.location.replace("on-duty-page-cards.php");
  });
}