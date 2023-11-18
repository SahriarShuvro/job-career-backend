import { updateJobIndustry } from "./industryAdd.js";

const getSingleIndustry = async (industryId) => {
  try {
    const response = await $.ajax({
      url: `/api/admin/job-industry/${industryId}`,
      method: "GET",
      dataType: "json",
    });

    if (response) {
      const industryData = response;
      const { title, color_code } = industryData;

      $("#edit_industry_title").val(title);
      $("#edit_industry_color_code").val(color_code);
    } else {
      console.error("Failed to fetch job post data");
    }
  } catch (error) {
    console.log(`Error while fetching data: ${error}`);
  }
};

// Update

$(document).on("click", "#editIndustryButton", function () {
  const industryId = $(this).data("id");

  $("#industryEditForm")
    .off("submit")
    .on("submit", async function (event) {
      event.preventDefault();

      const updateIndustryData = {
        title: $("#edit_industry_title").val(),
        color_code: $("#edit_industry_color_code").val(),
      };

      try {
        const response = await $.ajax({
          url: `/api/admin/job-industry/${industryId}`,
          method: "PATCH",
          data: updateIndustryData,
          dataType: "json",
        });

        if (response) {
          $(".updateSuccessAlart").addClass("alertActive");
          setTimeout(function () {
            $(".updateSuccessAlart").removeClass("alertActive");
          }, 3000);

          updateJobIndustry();
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
  getSingleIndustry(industryId);
});

// Function to handle the click event for the Active button
async function activateIndustry(industryId, activeStatus) {
  if (!activeStatus) {
    alert("This Industry is already active!");
    return;
  }

  const confirmActivate = confirm(
    "Are you sure you want to activate this Industry?"
  );
  if (!confirmActivate) {
    return;
  }

  const statusUpdate = { active_status: true };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-industry/${industryId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      console.log("Industry activated successfully");
      updateJobIndustry();
    } else {
      console.error("Failed to activate Industry.");
    }
  } catch (error) {
    console.error("Error while activating Industry:", error);
  }
}

// Function to handle the click event for the Inactive button
async function inactivateIndustry(industryId, activeStatus) {
  if (!activeStatus) {
    alert("This Industry is already inactive!");
    return;
  }

  const confirmInactivate = confirm(
    "Are you sure you want to inactivate this Industry?"
  );
  if (!confirmInactivate) {
    return;
  }

  const statusUpdate = { active_status: false };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-industry/${industryId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      console.log("Industry inactivated successfully");
      updateJobIndustry();
    } else {
      console.error("Failed to inactivate Industry.");
    }
  } catch (error) {
    console.error("Error while inactivating Industry:", error);
  }
}

// Event listener for the Active button
$(document).on("click", "#IactiveButton", function () {
  const industryId = $(this).data("id");
  const activeStatus = $(this).prop("id") === "IactiveButton"; // Adjust based on your actual implementation
  activateIndustry(industryId, activeStatus);
});

// Event listener for the Inactive button
$(document).on("click", "#IinactiveButton", function () {
  const industryId = $(this).data("id");
  const activeStatus = $(this).prop("id") === "IinactiveButton"; // Adjust based on your actual implementation
  inactivateIndustry(industryId, activeStatus);
});

// Delete

$(document).on("click", "#deleteIndustryButton", async function () {
  const industryId = $(this).data("id");
  // return console.log(industryId);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Industry?"
  );

  if (confirmDelete) {
    try {
      // Send an AJAX request to delete the Industry
      const response = await $.ajax({
        url: `/api/admin/job-industry/${industryId}`,
        method: "DELETE",
      });
      if (response) {
        $(this).closest(".cardsAll").remove();

        updateJobIndustry();
      }
    } catch (error) {
      console.error("Failed to delete Industry:", error);
    }
  }
});
