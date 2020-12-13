// Hide error and loading
document.getElementById("newUserSuccess").style.display = "none";
document.getElementById("newUserError").style.display = "none";
document.getElementById("addUserFormLoader").style.display = "none";

// Listen for add users form click
var addUserForm = document.querySelector("#addUserForm");
addUserForm.addEventListener("submit", e => {
  e.preventDefault();
  // Show loader
  document.getElementById("addUserFormLoader").style.display = "block";
  // Disable submit button
  document.getElementById("addUserSubmitButton").setAttribute("disabled", "disabled");

  // Get values from form
  var newUserEmail = document.getElementById("newUserEmail").value + "@licet.ac.in";

  var registerNo = "3111" + document.getElementById("newUserRegno").value;

  var newUserFullName = document.getElementById("newUserFullName").value;

  var newUserDepartment = document.getElementById("newUserDepartment").value;

  var newUserSemester = document.getElementById("newUserSemester").value;

  var accessLevel = document.getElementById("newUserAccessLevel").value;

  var isClassAdvisorCheck = document.getElementById("isClassAdvisor");

  var isManagementCheck = document.getElementById("isManagement");

  if (isManagementCheck.checked == 1) {
    var isManagement = true;
  }
  else {
    var isManagement = false;
  }

  if (isClassAdvisorCheck.checked == 1) {
    var isClassAdvisor = true;
  }
  else {
    var isClassAdvisor = false;
  }

  console.log(newUserEmail);
  console.log(newUserFullName);
  console.log(newUserDepartment);
  console.log(newUserSemester);
  console.log(accessLevel);
  console.log(isClassAdvisor);
  console.log(isManagement);

  // Post to create-user API
  var username = localStorage.email;
  var auth_token = localStorage.auth_token;
  $.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/create-user.php",
    datatype: "html",
    data: {
      username: username,
      auth_token: auth_token,
      newUserEmail: newUserEmail,
      newUserRegNo: registerNo,
      newUserFullName: newUserFullName,
      newUserDepartment: newUserDepartment,
      newUserSemester: newUserSemester,
      newUserAccessLevel: accessLevel,
      isClassAdvisor: isClassAdvisor,
      isManagement: isManagement
    },
    success: function (response) {
      var parsedResponse = JSON.parse(response);
      console.log(parsedResponse);
      if (parsedResponse == "success") {
        document.getElementById("newUserSuccess").style.display = "block";
        document.getElementById("newUserError").style.display = "none";
        document.getElementById("addUserFormLoader").style.display = "none";
        document.getElementById("addUserSubmitButton").removeAttribute("disabled", "disabled");
      }
      else if (parsedResponse == "failed" || parsedResponse == "user-exists") {
        document.getElementById("newUserSuccess").style.display = "none";
        document.getElementById("newUserError").style.display = "block";
        document.getElementById("addUserFormLoader").style.display = "none";
        document.getElementById("addUserSubmitButton").removeAttribute("disabled", "disabled");
      }
      else {
        localStorage.clear();
        window.location.replace("index.html?redirect=user-management.php");
      }
    },
    error: function (error) { }
  });

});

// BULK UPLOAD
