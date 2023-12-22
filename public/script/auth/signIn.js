$(document).ready(function () {
  $("#userSingIn").submit(async function (event) {
    event.preventDefault();

    // Serialize the form data
    let userData = $(this).serialize();

    try {
      // Send an asynchronous POST request to the "/api/auth/signin" endpoint
      await $.ajax({
        url: "/api/auth/signin",
        type: "POST",
        data: userData,
        success: function () {
          // Reset the form after successful sign-in
          $("#userSingIn")[0].reset();
          // Redirect to "/admin/dashboard" after successful sign-in
          window.location.href = "/admin/dashboard";
        },
      });
    } catch (error) {
      // Log an error message if the request fails
      console.log(`Could not fetch ${error}`);
    }
  });
});
