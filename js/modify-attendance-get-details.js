// hide error divs
document.getElementById("modifyAttendanceFormContainer").style.display = "none";
document.getElementById("modifyAttendanceFormLoader").style.display = "none";

var email = localStorage.enteredEmail;
var auth_token = localStorage.auth_token;
var subCode_dept_sem = localStorage.subCode_dept_sem;
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
    //console.log(parsedResponse);
    document.getElementById("modifyAttendanceDateInput").value = parsedResponse.displaydate;
  },
  error: function (error) { }
});

// to get first hour subject
$.ajax({
  type: "POST",
  url: "https://xstack.azurewebsites.net/modify-attendance.php",
  datatype: "html",
  data: {
    username: email,
    auth_token: auth_token,
    hour: 1
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
    else if (parsedResponse === "no-class" || parsedResponse === "not-taken") {
      document.getElementById("modifyAttendanceFormSecondHalf").classList.add("d-none");
      document.getElementById("modifyAttendanceFormContainerLoader").classList.add("d-none");
      document.getElementById("modifyAttendanceFormContainer").style.display = "block";
      document.getElementById("modifyAttendanceFormButton").setAttribute("disabled", "disabled");
    }
    else {
      window.parsedResponse = Array.from(parsedResponse);
      if (parsedResponse.length > 1) {
        console.log("More than 1");

        // Generate all options in the select dropdown
        for (var i in parsedResponse) {
          var option = document.createElement("option");
          option.innerHTML = parsedResponse[i].subject_code + " - " + parsedResponse[i].subject_name;
          option.setAttribute("value", i);
          document.getElementById("modifyAttendanceSubjectInput").appendChild(option);
        }

        // Fill inputs with the first option
        document.getElementById("modifyAttendanceYearInput").value = parsedResponse[0].year;
        document.getElementById("modifyAttendanceSemesterInput").value = parsedResponse[0].semester;

        // get department
        if (parsedResponse[0].department === "dit") {
          var department = "Information Technology";
        }
        if (parsedResponse[0].department === "dcse") {
          var department = "Computer Science";
        }
        if (parsedResponse[0].department === "dece") {
          var department = "Electronics and Communication";
        }
        if (parsedResponse[0].department === "deee") {
          var department = "Eelctronics and Electrical";
        }
        if (parsedResponse[0].department === "dmea") {
          var department = "Mechanical Engineering A";
        }
        if (parsedResponse[0].department === "dmeb") {
          var department = "Mechanical Engineering B";
        }

        document.getElementById("modifyAttendanceDepartmentInput").value = department;

        // Setup card
        document.getElementById("modifyAttendanceFormContainerLoader").classList.add("d-none");
        document.getElementById("modifyAttendanceFormContainer").style.display = "block";
        document.getElementById("modifyAttendanceFormSecondHalf").classList.remove("d-none");
        document.getElementById("modifyAttendanceError").classList.add("d-none");
        document.getElementById("modifyAttendanceFormLoader").style.display = "none";
        document.getElementById("modifyAttendanceFormButton").removeAttribute("disabled", "disabled");
      }
      else {
        console.log("1");
        var option = document.createElement("option");
        option.innerHTML = parsedResponse[0].subject_code + " - " + parsedResponse[0].subject_name;
        option.setAttribute("value", 0);
        document.getElementById("modifyAttendanceSubjectInput").appendChild(option);

        // Fill other inputs
        document.getElementById("modifyAttendanceYearInput").value = parsedResponse[0].year;
        document.getElementById("modifyAttendanceSemesterInput").value = parsedResponse[0].semester;

        // get department
        if (parsedResponse[0].department === "dit") {
          var department = "Information Technology";
        }
        if (parsedResponse[0].department === "dcse") {
          var department = "Computer Science";
        }
        if (parsedResponse[0].department === "dece") {
          var department = "Electronics and Communication";
        }
        if (parsedResponse[0].department === "deee") {
          var department = "Eelctronics and Electrical";
        }
        if (parsedResponse[0].department === "dmea") {
          var department = "Mechanical Engineering A";
        }
        if (parsedResponse[0].department === "dmeb") {
          var department = "Mechanical Engineering B";
        }

        document.getElementById("modifyAttendanceDepartmentInput").value = department;

        // Setup card
        document.getElementById("modifyAttendanceFormContainerLoader").classList.add("d-none");
        document.getElementById("modifyAttendanceFormContainer").style.display = "block";
        document.getElementById("modifyAttendanceFormSecondHalf").classList.remove("d-none");
        document.getElementById("modifyAttendanceError").classList.add("d-none");
        document.getElementById("modifyAttendanceFormLoader").style.display = "none";
        document.getElementById("modifyAttendanceFormButton").removeAttribute("disabled", "disabled");
      }
    }
  },
  error: function (error) { }
});

// listen for hour changes
$("#modifyAttendanceHourInput").change(function () {
  document.getElementById("modifyAttendanceSubjectInput").innerHTML = "";
  document.getElementById("modifyAttendanceFormLoader").style.display = "block";
  document.getElementById("modifyAttendanceFormButton").setAttribute("disabled", "disabled");
  var hour = document.getElementById("modifyAttendanceHourInput").value;
  console.log("function called with hour " + hour);
  // get email from localStorage
  var email = localStorage.enteredEmail;
  var auth_token = localStorage.auth_token;
  $.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/modify-attendance.php",
    datatype: "html",
    data: {
      username: email,
      auth_token: auth_token,
      hour: hour
    },
    success: function (response) {
      console.log(response);
      var parsedResponse = JSON.parse(response);
      // console.log(parsedResponse);
      if (parsedResponse === "invalid-auth-token") {
        // handle auth error
        setTimeout(function () {
          localStorage.clear();
          window.location.reload();
        }, 1000);
      }
      else if (parsedResponse === "no-class" || parsedResponse === "not-taken") {
        document.getElementById("modifyAttendanceFormSecondHalf").classList.add("d-none");
        document.getElementById("modifyAttendanceError").classList.remove("d-none");
        document.getElementById("modifyAttendanceFormLoader").style.display = "none";
        document.getElementById("modifyAttendanceFormButton").setAttribute("disabled", "disabled");
      }
      else {
        window.parsedResponse = Array.from(parsedResponse);
        if (parsedResponse.length > 1) {
          console.log("More than 1");

          // Generate all options in the select dropdown
          for (var i in parsedResponse) {
            var option = document.createElement("option");
            option.innerHTML = parsedResponse[i].subject_code + " - " + parsedResponse[i].subject_name;
            option.setAttribute("value", i);
            document.getElementById("modifyAttendanceSubjectInput").appendChild(option);
          }

          // Fill inputs with the first option
          document.getElementById("modifyAttendanceYearInput").value = parsedResponse[0].year;
          document.getElementById("modifyAttendanceSemesterInput").value = parsedResponse[0].semester;

          // get department
          if (parsedResponse[0].department === "dit") {
            var department = "Information Technology";
          }
          if (parsedResponse[0].department === "dcse") {
            var department = "Computer Science";
          }
          if (parsedResponse[0].department === "dece") {
            var department = "Electronics and Communication";
          }
          if (parsedResponse[0].department === "deee") {
            var department = "Eelctronics and Electrical";
          }
          if (parsedResponse[0].department === "dmea") {
            var department = "Mechanical Engineering A";
          }
          if (parsedResponse[0].department === "dmeb") {
            var department = "Mechanical Engineering B";
          }

          document.getElementById("modifyAttendanceDepartmentInput").value = department;

          // Setup card
          document.getElementById("modifyAttendanceFormSecondHalf").classList.remove("d-none");
          document.getElementById("modifyAttendanceError").classList.add("d-none");
          document.getElementById("modifyAttendanceFormLoader").style.display = "none";
          document.getElementById("modifyAttendanceFormButton").removeAttribute("disabled", "disabled");
        }
        else {
          console.log("1");
          var option = document.createElement("option");
          option.innerHTML = parsedResponse[0].subject_code + " - " + parsedResponse[0].subject_name;
          option.setAttribute("value", 0);
          document.getElementById("modifyAttendanceSubjectInput").appendChild(option);

          // Fill other inputs
          document.getElementById("modifyAttendanceYearInput").value = parsedResponse[0].year;
          document.getElementById("modifyAttendanceSemesterInput").value = parsedResponse[0].semester;

          // get department
          if (parsedResponse[0].department === "dit") {
            var department = "Information Technology";
          }
          if (parsedResponse[0].department === "dcse") {
            var department = "Computer Science";
          }
          if (parsedResponse[0].department === "dece") {
            var department = "Electronics and Communication";
          }
          if (parsedResponse[0].department === "deee") {
            var department = "Eelctronics and Electrical";
          }
          if (parsedResponse[0].department === "dmea") {
            var department = "Mechanical Engineering A";
          }
          if (parsedResponse[0].department === "dmeb") {
            var department = "Mechanical Engineering B";
          }

          document.getElementById("modifyAttendanceDepartmentInput").value = department;

          // Setup card
          document.getElementById("modifyAttendanceFormSecondHalf").classList.remove("d-none");
          document.getElementById("modifyAttendanceError").classList.add("d-none");
          document.getElementById("modifyAttendanceFormLoader").style.display = "none";
          document.getElementById("modifyAttendanceFormButton").removeAttribute("disabled", "disabled");
        }
      }
    },
    error: function (error) { }
  });
});

// dept and sem form
var modifyAttendanceForm = document.querySelector("#modifyAttendanceForm");
modifyAttendanceForm.addEventListener("submit", e => {
  e.preventDefault();
  // store values in localStorage
  var arrayPosition = document.getElementById("modifyAttendanceSubjectInput").value;
  localStorage.subCode_dept_sem = window.parsedResponse[arrayPosition].subCode_dept_sem;
  localStorage.required_timestamp = window.parsedResponse[arrayPosition].required_timestamp;
  document.getElementById("modifyAttendanceFormLoader").style.display = "block";
  document.getElementById("modifyAttendanceFormButton").setAttribute("disabled", "disabled");
  window.location.replace("modify-attendance-page-list.php");
});

// Listen for change of subject

$("#modifyAttendanceSubjectInput").change(function () {
  console.log("changed");
  var arrayPosition = document.getElementById("modifyAttendanceSubjectInput").value;
  // Get value of subject
  document.getElementById("modifyAttendanceYearInput").value = window.parsedResponse[arrayPosition].year;
  document.getElementById("modifyAttendanceSemesterInput").value = window.parsedResponse[arrayPosition].semester;
  // get department
  if (window.parsedResponse[arrayPosition].department === "dit") {
    var department = "Information Technology";
  }
  if (window.parsedResponse[arrayPosition].department === "dcse") {
    var department = "Computer Science";
  }
  if (window.parsedResponse[arrayPosition].department === "dece") {
    var department = "Electronics and Communication";
  }
  if (window.parsedResponse[arrayPosition].department === "deee") {
    var department = "Eelctronics and Electrical";
  }
  if (window.parsedResponse[arrayPosition].department === "dmea") {
    var department = "Mechanical Engineering A";
  }
  if (window.parsedResponse[arrayPosition].department === "dmeb") {
    var department = "Mechanical Engineering B";
  }
  document.getElementById("modifyAttendanceDepartmentInput").value = department;
});