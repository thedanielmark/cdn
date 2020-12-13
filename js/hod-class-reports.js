// hide container loader
document.getElementById("viewsFormLoader").style.display = "none";
document.getElementById("viewsError").style.display = "none";
document.getElementById("viewsIframe").style.display = "none";
document.getElementById("viewsOptionsContainer").style.display = "none";
document.getElementById("viewsPageLoader").style.display = "block";
document.getElementById("viewsPageContainer").style.display = "none";

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
          document.getElementById("odNavLink").classList.remove("d-none");
        }

        if (parsedResponse.user_type == "admin") {
          document.getElementById("admin-views").classList.remove("d-none");
        }

        localStorage.user_type = parsedResponse.user_type;

        localStorage.department = parsedResponse.department;

        // hide shimmer
        document.getElementById("u_0_v_sidebar").classList.add("d-none");
        // show links
        document.getElementById("sidebar-links-container").classList.remove("d-none");

        mainScript();
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


function mainScript() {

  if (localStorage.department == "dme") {
    document.getElementById("departmentMech").classList.remove("d-none");
  }
  else {
    document.getElementById("department").classList.remove("d-none");
    document.getElementById("department").value = localStorage.department_full;
  }

  document.getElementById("viewsPageLoader").style.display = "none";
  document.getElementById("viewsPageContainer").style.display = "block";

  $('#startDate-popup').datepicker({
    format: "yyyy-mm-dd - DD"
  });

  $('#endDate-popup').datepicker({
    format: "yyyy-mm-dd - DD"
  });

  // Listen for full report button click
  $("#fullFormButton").click(function () {
    event.preventDefault();
    // disable button
    //document.getElementById("viewsFormButton").setAttribute("disabled", "disabled");
    document.getElementById("viewsFormLoader").style.display = "block";

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    var start_date_non_formatted = document.getElementById("startDate").value;
    var end_date_non_formatted = document.getElementById("endDate").value;

    var start_date = start_date_non_formatted.slice(0, 10);
    var end_date = end_date_non_formatted.slice(0, 10);

    var year = document.getElementById("year").value;

    // Getting department

    if (localStorage.department == "dme") {
      var department = document.getElementById("departmentMech").value;
    }
    else {
      var department = localStorage.department;
    }

    console.log(email);
    console.log(auth_token);
    console.log(start_date);
    console.log(end_date);
    console.log(year);
    console.log(department);

    // make AJAX call to get Excel sheet route
    $.ajax({
      type: "POST",
      url: "https://xstack.azurewebsites.net/mgmt-full-export.php",
      datatype: "html",
      data: {
        username: email,
        auth_token: auth_token,
        start_date: start_date,
        end_date: end_date,
        year: year,
        department: department
      },
      success: function (response) {
        console.log(response);
        var stringifiedResponse = JSON.stringify(response);
        console.log(stringifiedResponse);
        var parsedResponse = JSON.parse(stringifiedResponse);

        console.log(parsedResponse.concat("hi"));

        if (parsedResponse === "invalid-auth-or-access") {
          // handle auth error
          localStorage.clear();
          window.location.reload();
        }
        else if (parsedResponse === '""\n') {
          document.getElementById("viewsError").style.display = "block";
          document.getElementById("viewsFormLoader").style.display = "none";
          // document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
        }
        else if (parsedResponse === '"db-fetch-error"\n' || parsedResponse === '"error"\n') {
          document.getElementById("viewsError").style.display = "block";
          document.getElementById("viewsFormLoader").style.display = "none";
          // document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
        }
        else {
          // success
          var fileName = parsedResponse.replace(/\\/g, "/");
          var api = "https://view.officeapps.live.com/op/embed.aspx?src=xstack.azurewebsites.net/";
          var filePath = "https://xstack.azurewebsites.net/";
          var iframeUrl = (api).concat(fileName);
          var downloadUrl = (filePath).concat(fileName);
          document.getElementById("viewsIframe").setAttribute("src", iframeUrl.replace(/['"]+/g, ''));
          document.getElementById("viewsIframe").setAttribute("scrolling", "no");
          document.getElementById("viewsError").style.display = "none";
          document.getElementById("viewsIframe").style.display = "block";
          document.getElementById("fullReportDownloadButton").setAttribute("href", downloadUrl.replace(/['"]+/g, ''));
          document.getElementById("fullReportDownloadButton").classList.remove("d-none");
          document.getElementById("consolidatedReportDownloadButton").classList.add("d-none");
          document.getElementById("viewsOptionsContainer").style.display = "block";
          document.getElementById("viewsFormLoader").style.display = "none";
        }
      },
      error: function (error) { }
    });
  });

  // Listen for consolidated report button click
  $("#consolidatedFormButton").click(function () {
    event.preventDefault();
    // disable button
    //document.getElementById("viewsFormButton").setAttribute("disabled", "disabled");
    document.getElementById("viewsFormLoader").style.display = "block";

    // get email from localStorage
    var email = localStorage.enteredEmail;
    var auth_token = localStorage.auth_token;

    var start_date_non_formatted = document.getElementById("startDate").value;
    var end_date_non_formatted = document.getElementById("endDate").value;

    var start_date = start_date_non_formatted.slice(0, 10);
    var end_date = end_date_non_formatted.slice(0, 10);

    var year = document.getElementById("year").value;

    // Getting department

    if (localStorage.department == "dme") {
      var department = document.getElementById("departmentMech").value;
    }
    else {
      var department = localStorage.department;
    }


    console.log(email);
    console.log(auth_token);
    console.log(start_date);
    console.log(end_date);
    console.log(year);
    console.log(department);

    // make AJAX call to get Excel sheet route
    $.ajax({
      type: "POST",
      url: "https://xstack.azurewebsites.net/mgmt-class-consolidation.php",
      datatype: "html",
      data: {
        username: email,
        auth_token: auth_token,
        start_date: start_date,
        end_date: end_date,
        year: year,
        department: department
      },
      success: function (response) {
        console.log(response);
        var stringifiedResponse = JSON.stringify(response);
        console.log(stringifiedResponse);
        var parsedResponse = JSON.parse(stringifiedResponse);

        console.log(parsedResponse.concat("hi"));

        if (parsedResponse === "invalid-auth-or-access") {
          // handle auth error
          localStorage.clear();
          window.location.reload();
        }
        else if (parsedResponse === '""\n') {
          document.getElementById("viewsError").style.display = "block";
          document.getElementById("viewsFormLoader").style.display = "none";
          // document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
        }
        else if (parsedResponse === '"db-fetch-error"\n' || parsedResponse === '"error"\n') {
          document.getElementById("viewsError").style.display = "block";
          document.getElementById("viewsFormLoader").style.display = "none";
          // document.getElementById("viewsFormButton").removeAttribute("disabled", "disabled");
        }
        else {
          // success
          var fileName = parsedResponse.replace(/\\/g, "/");
          var api = "https://view.officeapps.live.com/op/embed.aspx?src=xstack.azurewebsites.net/";
          var filePath = "https://xstack.azurewebsites.net/";
          var iframeUrl = (api).concat(fileName);
          var downloadUrl = (filePath).concat(fileName);
          document.getElementById("viewsIframe").setAttribute("src", iframeUrl.replace(/['"]+/g, ''));
          document.getElementById("viewsIframe").setAttribute("scrolling", "no");
          document.getElementById("viewsError").style.display = "none";
          document.getElementById("viewsIframe").style.display = "block";
          document.getElementById("consolidatedReportDownloadButton").setAttribute("href", downloadUrl.replace(/['"]+/g, ''));
          document.getElementById("consolidatedReportDownloadButton").classList.remove("d-none");
          document.getElementById("fullReportDownloadButton").classList.add("d-none");
          document.getElementById("viewsOptionsContainer").style.display = "block";
          document.getElementById("viewsFormLoader").style.display = "none";
        }
      },
      error: function (error) { }
    });
  });
}