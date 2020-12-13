function buildHomePage() {
    $.ajax({
        type: "POST",
        url: "https://thedanielmark.com/status.php",
        datatype: "html",
        success: function (response) {
            var parsedData = JSON.parse(response);
            if (parsedData.status == "online") {
                // xStack online
                document.getElementById("partial-outage-card").classList.add("d-none");
                document.getElementById("offline-card").classList.add("d-none");
            }
            if (parsedData.status == "partial-outage") {
                // Some services down
                document.getElementById("online-card").classList.add("d-none");
                document.getElementById("offline-card").classList.add("d-none");
            }
            if (parsedData.status == "offline") {
                // xStack down
                document.getElementById("online-card").classList.add("d-none");
                document.getElementById("partial-outage-card").classList.add("d-none");
            }

            buildCards();
        },
        error: function (error) { }
    });

    // BUILD CARDS
    function buildCards() {
        // Build account info card
        document.getElementById("account-info-full-name").innerHTML = localStorage.full_name;
        document.getElementById("account-info-email").innerHTML = localStorage.email;

        // Getting access level and switching it
        if (localStorage.user_type == "student") {
            var user_type = "Student";
        }
        if (localStorage.user_type == "staff") {
            var user_type = "Staff";
        }
        if (localStorage.user_type == "hod") {
            var user_type = "Head of Department";
        }
        if (localStorage.user_type == "admin") {
            var user_type = "Administrator";
        }
        if (localStorage.user_type == "mgmt") {
            var user_type = "Management";
        }
        document.getElementById("account-info-access-level").innerHTML = user_type;

        // Call dashboard API
        $.ajax({
            type: "POST",
            url: "https://xstack.azurewebsites.net/dashboard-mobile.php",
            datatype: "html",
            data: {
                username: localStorage.email,
                auth_token: localStorage.auth_token
            },
            success: function (response) {
                var parsedData = JSON.parse(response);
                console.log(parsedData);

                // Building card for current hour
                if (parsedData.current_hour == "none") {
                    document.getElementById("currently-progressing-class-details").innerHTML = "You're free this hour! :)";
                }
                else {
                    document.getElementById("currently-progressing-class-details").innerHTML = "<p class='font-weight-bold mb-0'>Hour - " + parsedData.current_hour.hour + "</p><p>" + parsedData.current_hour.subject_name + ", " + parsedData.current_hour.year + ",<br>" + parsedData.current_hour.department + "</p>";
                }

                // Building card for upcoming hour
                if (parsedData.next_hour == "none") {
                    document.getElementById("upcoming-class-details").innerHTML = "You're free the next hour! :)";
                }
                else {
                    document.getElementById("upcoming-class-details").innerHTML = "<p class='font-weight-bold mb-0'>Hour - " + parsedData.next_hour.hour + "</p><p>" + parsedData.next_hour.subject_name + ", " + parsedData.next_hour.year + ",<br>" + parsedData.next_hour.department + "</p>";
                }


                // Generating card for full-day schedule
                for (var i in parsedData) {
                    if (i == "current_hour" || i == "next_hour") {
                        // Do nothing
                    }
                    else {
                        var defaultPara = document.getElementById("all-classes-default-content");
                        if(defaultPara.style.display == "none") {
                            // do nothing
                        }
                        else {
                            document.getElementById("all-classes-default-content").style.display = "none";
                        }

                        console.log(parsedData[i].hour);
                        // Create paras
                        var hourPara = document.createElement("p");
                        hourPara.classList.add("font-weight-bold", "mb-0");
                        hourPara.innerHTML = "Hour - " + parsedData[i].hour;
                        var classDetails = document.createElement("p");
                        classDetails.innerHTML = parsedData[i].subject_name + ", " + parsedData[i].year + ",<br>" + parsedData[i].department;
                        document.getElementById("all-classes-container").appendChild(hourPara);
                        document.getElementById("all-classes-container").appendChild(classDetails);
                    }
                }

                // Hide shimmer cards
                $("#home-shimmer-cards-container").fadeOut("slow", function () {
                    // Fade out animation completed
                    // Show actual cards
                    AOS.init({
                        once: true
                    });
                });
            },
            error: function (error) { }
        });
    }
}
