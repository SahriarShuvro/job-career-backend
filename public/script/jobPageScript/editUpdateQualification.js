import { updateJobQualification } from "./qualificationAdd.js";

const getSingleQualification = async (qualificationId) => {
  try {
    const response = await $.ajax({
      url: `/api/admin/job-qualification/${qualificationId}`,
      method: "GET",
      dataType: "json",
    });

    if (response) {
      const qualificationData = response;
      const { title, color_code } = qualificationData;

      $("#edit_qualification_title").val(title);
      $("#edit_qualification_color_code").val(color_code);
    } else {
      console.error("Failed to fetch job post data");
    }
  } catch (error) {
    console.log(`Error while fetching data: ${error}`);
  }
};

// Update

$(document).on("click", "#editQualificationButton", function () {
  const qualificationId = $(this).data("id");

  $("#qualificationEditForm")
    .off("submit")
    .on("submit", async function (event) {
      event.preventDefault();

      const updateQualificationData = {
        title: $("#edit_qualification_title").val(),
        color_code: $("#edit_qualification_color_code").val(),
      };

      try {
        const response = await $.ajax({
          url: `/api/admin/job-qualification/${qualificationId}`,
          method: "PATCH",
          data: updateQualificationData,
          dataType: "json",
        });

        if (response) {
          $(".updateSuccessAlart").addClass("alertActive");
          setTimeout(function () {
            $(".updateSuccessAlart").removeClass("alertActive");
          }, 3000);

          updateJobQualification();
        } else {
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
  getSingleQualification(qualificationId);
});

// Function to handle the click event for the Active button
async function activateQualification(qualificationId, activeStatus) {
  if (!activeStatus) {
    alert("This qualification is already active!");
    return;
  }

  const confirmActivate = confirm(
    "Are you sure you want to activate this qualification?"
  );
  if (!confirmActivate) {
    return;
  }

  const statusUpdate = { active_status: true };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-qualification/${qualificationId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      console.log("qualification activated successfully");
      updateJobQualification();
    } else {
      console.error("Failed to activate qualification.");
    }
  } catch (error) {
    console.error("Error while activating qualification:", error);
  }
}

// Function to handle the click event for the Inactive button
async function inactivateQualification(qualificationId, activeStatus) {
  if (!activeStatus) {
    alert("This qualification is already inactive!");
    return;
  }

  const confirmInactivate = confirm(
    "Are you sure you want to inactivate this qualification?"
  );
  if (!confirmInactivate) {
    return;
  }

  const statusUpdate = { active_status: false };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-qualification/${qualificationId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      console.log("qualification inactivated successfully");
      updateJobQualification();
    } else {
      console.error("Failed to inactivate qualification.");
    }
  } catch (error) {
    console.error("Error while inactivating qualification:", error);
  }
}

// Event listener for the Active button
$(document).on("click", "#QactiveButton", function () {
  const qualificationId = $(this).data("id");
  const activeStatus = $(this).prop("id") === "QactiveButton"; // Adjust based on your actual implementation
  activateQualification(qualificationId, activeStatus);
});

// Event listener for the Inactive button
$(document).on("click", "#QinactiveButton", function () {
  const qualificationId = $(this).data("id");
  const activeStatus = $(this).prop("id") === "QinactiveButton"; // Adjust based on your actual implementation
  inactivateQualification(qualificationId, activeStatus);
});

// Delete

$(document).on("click", "#deleteQualificationButton", async function () {
  const qualificationId = $(this).data("id");
  // return console.log(qualificationId);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this qualification?"
  );

  if (confirmDelete) {
    try {
      // Send an AJAX request to delete the qualification
      const response = await $.ajax({
        url: `/api/admin/job-qualification/${qualificationId}`,
        method: "DELETE",
      });
      if (response) {
        $(this).closest(".cardsAll").remove();

        updateJobQualification();
      }
    } catch (error) {
      console.error("Failed to delete qualification:", error);
    }
  }
});
