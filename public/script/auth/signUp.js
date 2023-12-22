$(document).ready(function () {
  $("#user").submit(async function (event) {
    event.preventDefault();

    let userData = $(this).serialize();

    try {
      // Send an asynchronous POST request to the "/api/auth/signup" endpoint
      await $.ajax({
        url: "/api/auth/signup",
        type: "POST",
        data: userData,
        success: function () {
          // Redirect to "/auth/signin" after successful signup
          window.location.href = "/auth/signin";
        },
      });
    } catch (error) {
      // Log an error message if the request fails
      console.log(`Could not fetch ${error}`);
    }
  });
});
