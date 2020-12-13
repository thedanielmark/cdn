<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Changelog | xStack</title>
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
    <link rel="stylesheet"
        href="css/simple-line-icons.css">
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
                                                Changelog
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end of row -->
                        <div class="container col-xl-8 mt-md-4 p-0">
                            <h3 class="font-weight-bold mt-4 d-flex justify-content-center">
                                <i class="icon-layers text-primary font-weight-bold"></i>
                                <span class="ml-3 align-self-center">xStack v2.0.0 Changelog</span>
                            </h3>
                            <p class="custom-para mt-5 mb-5 text-center">
                                You are currently on version 2.0.0 of xStack. The following table gives you a detailed
                                list of upgrades and changes we have made from version 1.7.4 of xStack. If you've
                                encountered bugs, please report them <a href="contact-page.php">here.</a>
                            </p>
                            <div class="table mt-5 text-center">
                                The changelog will be available from version 3.0.0 onwards after the actual deployment.
                                <!-- <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th><span class="text-dark font-weight-bold">CATEGORY</span></th>
                                            <th><span class="text-dark font-weight-bold">SERVICE</span></th>
                                            <th><span class="text-dark font-weight-bold">DETAILS</span></th>
                                        </tr>
                                    </thead>
                                     authentication 
                                    <thead class="thead-light">
                                        <tr>
                                            <th><span class="text-dark">Authentication</span></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>Login Web</td>
                                            <td>Online</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>Login Android</td>
                                            <td>Online</td>

                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>Login iOS</td>
                                            <td>Online</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>Login API</td>
                                            <td>Online</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>Forgot Password Web</td>
                                            <td>
                                                Online
                                            </td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>Forgot Password API</td>
                                            <td>Online</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>Passwordless Sign In</td>
                                            <td>Online</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>Passwordless Sign In API</td>
                                            <td>Online</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>Login Web</td>
                                            <td>Online</td>

                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td>User Database</td>
                                            <td>Online</td>
                                        </tr>
                                    </tbody>
                                     end of authentication 
                                </table> -->
                            </div>
                            <!-- end of table div -->
                        </div>
                        <!-- end of container -->
                    </div>
                    <!-- end of content wrapper -->

                    <?php include "footer.php"; ?>
                </div>
                <!-- end of main-panel -->

            </div>
            <!-- page-body-wrapper ends -->
        </div>
        <!-- container-scroller -->
    </div>

    <!-- base:js -->
    <script src="js/vendor.bundle.base.js"></script>
    <!-- endinject -->
    <!-- inject:js -->
    <script src="js/off-canvas.js"></script>
    <script src="js/hoverable-collapse.js"></script>
    <script src="js/template.js"></script>
    <script src="js/todolist.js"></script>
    <!-- endinject -->
    <!-- plugin js for this page -->
    <script src="js/chart.min.js"></script>
    <!-- End plugin js for this page -->
    <!-- Custom js for this page-->
    <script src="js/dashboard.js"></script>
    <!-- End custom js for this page-->
    <script src="js/logout.js"></script>
    <script src="js/page-builder.js"></script>
</body>

</html>