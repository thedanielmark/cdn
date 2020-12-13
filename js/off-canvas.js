$(document).ready(function () {
  $(function () {
    $('[data-toggle="offcanvas"]').on("click", function () {
      $('.sidebar-offcanvas').toggleClass('active')
    });
  });
});

// $(document).ready(function () {
//   var rightSidebar = document.getElementById("right-sidebar");
//   // Left-sidebar toggle
//   $('[data-toggle="offcanvas"]').on("click", function () {
//     rightSidebar.classList.toggle("open");
//   });
// });