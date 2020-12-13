<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>User Settings | xStack</title>
    <!-- base:css -->
    <link rel="stylesheet" href="css/materialdesignicons.min.css">
    <link rel="stylesheet" href="css/flag-icon.min.css">
    <link rel="stylesheet" href="css/vendor.bundle.base.css">
    <!-- endinject -->
    <!-- plugin css for this page -->
    <link rel="stylesheet" href="css/flag-icon.min.css" />
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/simple-line-icons.css">
    <!-- endinject -->
    <link rel="shortcut icon" href="images/favicon.png" />
</head>

<body>
    <div id="wrapper">
        <div class="container-scroller">
            <!-- topnav -->
            <?php
                include "topnav.php";
            ?>
            <!-- partial -->
            <div class="container-fluid page-body-wrapper">
                <!-- right sidebar -->
                <?php
                    include "right-sidebar.php";
                ?>
                <!-- left-sidebar -->
                <?php
                    include "left-sidebar.php";
                ?>

                <!-- main content -->
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin">
                                <div class="d-flex justify-content-between flex-wrap">
                                    <div class="d-flex align-items-center dashboard-header flex-wrap mb-3 mb-sm-0">
                                        <h5 class="mr-4 mb-0 font-weight-bold">xStack</h5>
                                        <div class="d-flex align-items-baseline dashboard-breadcrumb">
                                            <p class="text-muted mb-0 mr-1 hover-cursor">App</p>
                                            <i class="mdi mdi-chevron-right mr-1 text-muted"></i>
                                            <p class="text-muted mb-0 mr-1 hover-cursor">
                                                xStack
                                            </p>
                                            <i class="mdi mdi-chevron-right mr-1 text-muted"></i>
                                            <p class="text-muted mb-0 hover-cursor">
                                                User Settings
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end of row -->
                        <div class="container mt-md-4 px-0">
                            <div class="card">
                                <div class="card-body py-5">
                                    <h6 class="font-weight-bold">
                                        Change your password
                                    </h6>
                                    <form id="changePasswordForm" class="forms-sample mt-3">
                                        <div class="form-group">
                                            <label for="exampleSelectGender" class="font-weight-bold">Old
                                                Password</label>
                                            <input type="password" class="form-control" id="oldPassword"
                                                placeholder="Old password" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleSelectGender" class="font-weight-bold">New
                                                Password</label>
                                            <input type="password" class="form-control" id="newPassword"
                                                placeholder="New password" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleSelectGender" class="font-weight-bold">Confirm
                                                Password</label>
                                            <input type="password" class="form-control" id="confirmPassword"
                                                placeholder="Confirm password" required>
                                        </div>
                                        <small class="text-danger font-weight-bold" id="passwordError">Passwords do not
                                            match.</small>

                                        <div class="form-group mt-5 d-flex justify-content-end">
                                            <div id="formLoader">
                                                <div class="d-flex align-items-end jumping-dots-loader mr-3">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary font-weight-bold"
                                                id="changePasswordButton">
                                                Change Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="card mt-4" id="semester-card">
                                <div class="card-body py-5">
                                    <h6 class="font-weight-bold">
                                        Change the current semester on the xStack Platform.
                                    </h6>
                                    <form id="SemesterPasswordForm" class="forms-sample mt-3">
                                        <div class="form-group row px-4">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input type="radio" class="form-check-input" name="semester"
                                                        id="odd" value="odd" checked="">
                                                    Odd (1/3/5/7)
                                                    <i class="input-helper"></i></label>
                                            </div>
                                            <div class="form-check ml-3">
                                                <label class="form-check-label">
                                                    <input type="radio" class="form-check-input" name="semester"
                                                        id="even" value="even">
                                                    Even (2/4/6/8)
                                                    <i class="input-helper"></i></label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleSelectGender" class="font-weight-bold">
                                                Please confirm your password to change the current semester. This is a
                                                major change and will take a few minutes to reflect across the xStack
                                                Platform.
                                            </label>
                                            <input type="password" class="form-control mb-3" id="adminPassword"
                                                placeholder="Administrator Password" required>
                                            <small class="text-success font-weight-bold d-none" id="semesterSuccess">
                                                You have successfully updated the current semester.
                                            </small>
                                            <small class="text-danger font-weight-bold d-none" id="semesterFailed">
                                                There was an error while updating the semester. Please try again.
                                            </small>
                                        </div>
                                        <small class="text-danger font-weight-bold"
                                            id="semesterChangePasswordError">Incorrect password.</small>

                                        <div class="form-group mt-5 d-flex justify-content-end">
                                            <div id="semesterLoader">
                                                <div class="d-flex align-items-end jumping-dots-loader mr-3">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary font-weight-bold"
                                                id="changeSemesterButton">
                                                Change Semester
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end of content wrapper -->
                    <?php include "footer.php"; ?>
                </div>
            </div>
            <!-- end of main-panel -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    </div>

    <!-- base:js -->
    <script src="js/vendor.bundle.base.js"></script>
    <!-- inject:js -->
    <script src="js/off-canvas.js"></script>
    <script src="js/hoverable-collapse.js"></script>
    <script src="js/template.js"></script>
    <script src="js/admin-settings.js"></script>
    <script src="js/todolist.js"></script>
    <!-- endinject -->
    <script src="js/dashboard.js"></script>
    <!-- End custom js for this page-->
    <script src="js/logout.js"></script>
    <script src="js/page-builder.js"></script>
    <!-- <script src="js/change-password.js"></script> -->
</body>

</html>