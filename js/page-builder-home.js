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

        // hide shimmer
        document.getElementById("u_0_v_sidebar").classList.add("d-none");
        // show links
        document.getElementById("sidebar-links-container").classList.remove("d-none");

        buildHomePage();

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