import { updateJobEmploymentStatus } from "./employmentStatusAdd.js";

const getSingleEmploymentStatus = async (employmentStatusId) => {
  try {
    const response = await $.ajax({
      url: `/api/admin/job-employment-status/${employmentStatusId}`,
      method: "GET",
      dataType: "json",
    });

    if (response) {
      const employmentStatusData = response;
      const { title, color_code } = employmentStatusData;

      $("#edit_employmentStatus_title").val(title);
      $("#edit_employmentStatus_color_code").val(color_code);
    } else {
      console.error("Failed to fetch job post data");
    }
  } catch (error) {
    console.log(`Error while fetching data: ${error}`);
  }
};

// Update

$(document).on("click", "#editEmploymentStatusButton", function () {
  const employmentStatusId = $(this).data("id");

  $("#employmentStatusEditForm")
    .off("submit")
    .on("submit", async function (event) {
      event.preventDefault();

      const updateEmploymentStatusData = {
        title: $("#edit_employmentStatus_title").val(),
        color_code: $("#edit_employmentStatus_color_code").val(),
      };

      try {
        const response = await $.ajax({
          url: `/api/admin/job-employment-status/${employmentStatusId}`,
          method: "PATCH",
          data: updateEmploymentStatusData,
          dataType: "json",
        });

        if (response) {
          $(".updateSuccessAlart").addClass("alertActive");
          setTimeout(function () {
            $(".updateSuccessAlart").removeClass("alertActive");
          }, 3000);

          updateJobEmploymentStatus();
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        if (error.responseJSON || error.responseJSON.errors) {
          console.log(error.responseJSON);
          const errors = error.responseJSON.errors;
          const errorMessage = errors.map((errors) => errors.msg).join("<br>");

          $(".errAlartSection").addClass("alertActive");
          $(".errAlartSection").html(errorMessage);

          setTimeout(function () {
            $(".errAlartSection").removeClass("alertActive");
          }, 3000);
        } else {
          console.log(`Could catch error ${error}`);
        }
      }
    });

  getSingleEmploymentStatus(employmentStatusId);
});

// Function to handle the click event for the Active button
async function activateEmploymentStatus(employmentStatusId, activeStatus) {
  if (!activeStatus) {
    alert("This employmentStatus is already active!");
    return;
  }

  const confirmActivate = confirm(
    "Are you sure you want to activate this employmentStatus?"
  );
  if (!confirmActivate) {
    return;
  }

  const statusUpdate = { active_status: true };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-employment-status/${employmentStatusId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      console.log("Employment Status activated successfully");
      updateJobEmploymentStatus();
    } else {
      console.error("Failed to activate Employment Status.");
    }
  } catch (error) {
    console.error("Error while activating Employment Status:", error);
  }
}

// Function to handle the click event for the Inactive button
async function inactivateEmploymentStatus(employmentStatusId, activeStatus) {
  if (!activeStatus) {
    alert("This Employment Status is already inactive!");
    return;
  }

  const confirmInactivate = confirm(
    "Are you sure you want to inactivate this Employment Status?"
  );
  if (!confirmInactivate) {
    return;
  }

  const statusUpdate = { active_status: false };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-employment-status/${employmentStatusId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      console.log("Employment Status inactivated successfully");
      updateJobEmploymentStatus();
    } else {
      console.error("Failed to inactivate Employment Status.");
    }
  } catch (error) {
    console.error("Error while inactivating Employment Status:", error);
  }
}

// Event listener for the Active button
$(document).on("click", "#EactiveButton", function () {
  const employmentStatusId = $(this).data("id");
  const activeStatus = $(this).prop("id") === "EactiveButton"; // Adjust based on your actual implementation
  activateEmploymentStatus(employmentStatusId, activeStatus);
});

// Event listener for the Inactive button
$(document).on("click", "#EinactiveButton", function () {
  const employmentStatusId = $(this).data("id");
  const activeStatus = $(this).prop("id") === "EinactiveButton"; // Adjust based on your actual implementation
  inactivateEmploymentStatus(employmentStatusId, activeStatus);
});

// Delete

$(document).on("click", "#deleteEmploymentStatusButton", async function () {
  const employmentStatusId = $(this).data("id");
  // return console.log(EmploymentStatusId);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Employment Status?"
  );

  if (confirmDelete) {
    try {
      // Send an AJAX request to delete the Employment Status
      const response = await $.ajax({
        url: `/api/admin/job-employment-status/${employmentStatusId}`,
        method: "DELETE",
      });
      if (response) {
        $(this).closest(".cardsAll").remove();

        updateJobEmploymentStatus();
      }
    } catch (error) {
      console.error("Failed to delete Employment Status:", error);
    }
  }
});
