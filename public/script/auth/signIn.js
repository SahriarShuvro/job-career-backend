$(document).ready(function () {
  $("#userSignIn").submit(async function (event) {
    event.preventDefault();

    // Disable the form to prevent multiple submissions
    $(this).prop("disabled", true);

    // Serialize the form data
    let userData = $(this).serialize();

    try {
      // Send an asynchronous POST request to the "/auth/signin" endpoint
      const response = await $.ajax({
        url: "/auth/signin",
        type: "POST",
        data: userData,
        success: function (data, textStatus, xhr) {
          // Assuming the server returns a token in the response
          const authToken = xhr.getResponseHeader("Authorization");

          // Check if an authorization token is present
          if (authToken) {
            // Optionally, you can store the token in a secure manner (e.g., localStorage)
            localStorage.setItem("authToken", authToken);

            // Reset the form after successful sign-in
            $("#userSignIn")[0].reset();

            // Redirect to "/admin/dashboard" after successful sign-in
            window.location.href = "/admin";
          } else {
            // Handle the case where the token is not present in the response
            console.error("Authentication token not received");
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          // Handle errors in the Ajax request
          console.error(
            `Could not fetch. Status: ${xhr.status}, Error: ${errorThrown}`
          );
        },
        complete: function () {
          // Enable the form regardless of success or failure
          $("#userSignIn").prop("disabled", false);
        },
      });
    } catch (error) {
      // Log an error message if the request fails
      console.error(`Could not fetch ${error}`);
      // Enable the form in case of an error
      $("#userSignIn").prop("disabled", false);
    }
  });
});
