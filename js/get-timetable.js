// Call dashboard API
$.ajax({
    type: "POST",
    url: "https://xstack.azurewebsites.net/staff-timetable.php",
    datatype: "html",
    data: {
        username: localStorage.email,
        auth_token: localStorage.auth_token
    },
    success: function (response) {
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse);

        // Generate timetable
        for(var i in parsedResponse) {
            // Create row
            var row = document.createElement("tr");
            
            // Create hour td
            var hourTd = document.createElement("td");
            // Create hour textnode
            var hour = document.createTextNode(parsedResponse[i].hour);
            // Add hour to td
            hourTd.appendChild(hour);

            // Create Subject td
            var subjectTd = document.createElement("td");
            // Create subject textnode
            var subject = document.createTextNode(parsedResponse[i].subject_name);
            // Add subject to td
            subjectTd.appendChild(subject);

            // Create code td
            var codeTd = document.createElement("td");
            var code = document.createTextNode(parsedResponse[i].subject_code);
            codeTd.appendChild(code);

            // Add all tds to tr
            row.appendChild(hourTd);
            row.appendChild(subjectTd);
            row.appendChild(codeTd);

            // check day
            if(parsedResponse[i].day == "mon") {
                document.getElementById("default-mon").classList.add("d-none");
                document.getElementById("timetable-body-mon").appendChild(row);
            }
            else if(parsedResponse[i].day == "tue") {
                document.getElementById("default-tue").classList.add("d-none");
                document.getElementById("timetable-body-tue").appendChild(row);
            }
            else if(parsedResponse[i].day == "wed") {
                document.getElementById("default-wed").classList.add("d-none");
                document.getElementById("timetable-body-wed").appendChild(row);
            }
            else if(parsedResponse[i].day == "thu") {
                document.getElementById("default-thu").classList.add("d-none");
                document.getElementById("timetable-body-thu").appendChild(row);
            }
            else {
                document.getElementById("default-fri").classList.add("d-none");
                document.getElementById("timetable-body-fri").appendChild(row);
            }
        }

        // Hide shimmer cards
        $("#shimmer-container").fadeOut("slow", function () {
            // Fade out animation completed
            // Show actual cards
            AOS.init({
                once: true
            });
        });
    },
    error: function (error) { }
});