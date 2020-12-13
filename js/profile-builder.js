// building current user profile
// document.getElementById("current-user-full-name-container").innerHTML = localStorage.full_name;
// document.getElementById("current-user-department-container").innerHTML = localStorage.department_full;
// var unformatted_picture_url = localStorage.picture_url;
// var picture_url = unformatted_picture_url.replace(/\\/g, "");
// document.getElementById("current-user-profile-picture").setAttribute("src", picture_url);
// console.log(picture_url);

// get email from localStorage
// var email = localStorage.enteredEmail;
// var auth_token = localStorage.auth_token;

// $.ajax({
//     type: "POST",
//     url: "https://xstack.azurewebsites.net/left-sidebar-controller.php",
//     datatype: "html",
//     data: {
//         username: email,
//         auth_token: auth_token
//     },
//     success: function (response) {
//         // success
//         var parsedResponse = JSON.parse(response);
//         console.log(parsedResponse);
//         if (parsedResponse === "invalid-auth-or-access") {
//             // handle auth error
//             localStorage.clear();
//             window.location.replace("index.html");
//         }
//         else {
//             console.log(parsedResponse);
//             document.getElementById("u_0_v-side").innerHTML = parsedResponse[0];
//         }
//     },
//     error: function (error) { }
// });


// if(parsedResponse.department === "dit") {
//     localStorage.department_full = "Information Technology";
//   }

//   if(parsedResponse.department === "dcse") {
//     localStorage.department_full = "Computer Science";
//   }

//   if(parsedResponse.department === "deee") {
//     localStorage.department_full = "Electrical and Electronics";
//   }

//   if(parsedResponse.department === "dece") {
//     localStorage.department_full = "Electronics and Communication";
//   }

//   if(parsedResponse.department === "dme") {
//     localStorage.department_full = "Mechanical";
//   }

//   if(parsedResponse.department === "dsh") {
//     localStorage.department_full = "Science & Humanities";
//   }

//   if(parsedResponse.department === "mgmt") {
//     localStorage.department_full = "Management";
//   }