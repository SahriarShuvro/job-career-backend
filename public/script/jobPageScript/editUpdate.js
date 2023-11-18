import { updateJobList } from "./jobAdd.js";

// Get details in edit input
const getEditDetails = async (jobId) => {
  try {
    const response = await $.ajax({
      url: `/api/admin/job/${jobId}`,
      method: "GET",
      dataType: "json",
    });

    if (response) {
      const jobPostData = response;
      //   start date
      const original_s_d = jobPostData.start_date;
      const formatted_s_date = new Date(original_s_d)
        .toISOString()
        .split("T")[0];

      // end date
      const original_e_d = jobPostData.end_date;
      const formatted_e_date = new Date(original_e_d)
        .toISOString()
        .split("T")[0];

      const {
        job_title,
        start_date,
        end_date,
        company,
        job_location,
        qualification,
        employment_status,
        offerd_salary,
        salary_negotiable,
        category,
        vacancy,
        industry,
        experience,
        gender,
        job_details,
        skills_required,
      } = jobPostData;

      // Now you have variables for each property, and you can set the values as needed
      $("#edit_job_title").val(job_title);
      $("#edit_start_date").val(formatted_s_date);
      $("#edit_end_date").val(formatted_e_date);
      $("#edit_company").val(company);
      $("#edit_job_location").val(job_location);
      $("#edit_qualification").val(qualification);
      $("#edit_employment_status").val(employment_status);
      $("#edit_offerd_salary").val(offerd_salary);
      $("#edit_category").val(category);
      $("#edit_vacancy").val(vacancy);
      $("#edit_industry").val(industry);
      $("#edit_experience").val(experience);
      $("#edit_gender").val(gender);
      $("#edit_job_details").val(job_details);
      $("#edit_skills_required").val(skills_required);

      // Handle the salary_negotiable radio inputs
      if (salary_negotiable === "yes") {
        $("#edit_salary_negotiable_yes").prop("checked", true);
      } else {
        $("#edit_salary_negotiable_no").prop("checked", true);
      }
    } else {
      console.error("Failed to fetch job post data");
    }
  } catch (error) {
    console.error("Error while fetching job post data:", error);
  }
};

// edit details
$(document).on("click", ".edit-button", function () {
  const jobId = $(this).data("id");
  getEditDetails(jobId);

  $("#edit-job-form").on("submit", async function (event) {
    event.preventDefault();

    // Create an object to hold the updated data
    const updatedData = {
      job_title: $("#edit_job_title").val(),
      start_date: $("#edit_start_date").val(),
      end_date: $("#edit_end_date").val(),
      company: $("#edit_company").val(),
      job_location: $("#edit_job_location").val(),
      qualification: $("#edit_qualification").val(),
      employment_status: $("#edit_employment_status").val(),
      offered_salary: $("#edit_offered_salary").val(),
      category: $("#edit_category").val(),
      vacancy: $("#edit_vacancy").val(),
      industry: $("#edit_industry").val(),
      experience: $("#edit_experience").val(),
      gender: $("#edit_gender").val(),
      job_details: $("#edit_job_details").val(),
      skills_required: $("#edit_skills_required").val(),
      employment_status: $("#edit_employment_status").val(),
    };

    // Determine whether "Yes" or "No" is selected for salary_negotiable and update the property
    updatedData.salary_negotiable = $("#edit_salary_negotiable_yes").is(
      ":checked"
    )
      ? "yes"
      : "no";

    try {
      const response = await $.ajax({
        url: `/api/admin/job/${jobId}`,
        method: "PATCH",
        data: updatedData,
        dataType: "json",
      });

      if (response) {
        $(".editSuccessAlartSection").addClass("alertActive");
        setTimeout(function () {
          $(".editSuccessAlartSection").removeClass("alertActive");
        }, 3000);

        updateJobList(); // Assuming updateJobList exists and works correctly
      } else {
        console.error("Failed to update job data");
      }
    } catch (error) {
      console.error("Error while updating job data:", error);
    }
  });
});

// active/inactive job post
$(document).on("click", ".active-inactive-button", async function () {
  const jobId = $(this).data("id");
  const confirmToggle = confirm(
    "Are you sure you want to toggle the active status of this POST?"
  );
  if (!confirmToggle) {
    return;
  }

  try {
    // Fetch the current status
    const currentStatusResponse = await $.ajax({
      url: `/api/admin/job/${jobId}`,
      method: "GET",
      dataType: "json",
    });

    if (!currentStatusResponse) {
      console.error("Failed to fetch current status.");
      return;
    }

    const currentStatus = currentStatusResponse.active_status;

    // Toggle the status
    const statusUpdate = { active_status: !currentStatus };

    // Update the status
    const response = await $.ajax({
      url: `/api/admin/job/${jobId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      if (currentStatus === true) {
        $(".post-alert").addClass("alertActive");
        $(".main-alert").text("Inactivate").addClass(" text-white bg-red-500");
        setTimeout(function () {
          $(".post-alert").removeClass("alertActive");
        }, 3000);
      } else if (currentStatus === false) {
        $(".post-alert").addClass("alertActive ");
        $(".main-alert").removeClass("bg-red-500 text-white");
        $(".main-alert")
          .text(" Activate")
          .addClass("bg-green-400 text-gray-900");
        setTimeout(function () {
          $(".post-alert").removeClass("alertActive");
        }, 3000);
      }
      console.log("Category status toggled successfully");
      updateJobList();
    } else {
      console.error("Failed to toggle category status.");
    }
  } catch (error) {
    console.error("Error while toggling category status:", error);
  }
});

// delete details
$(document).on("click", ".delete-job-button", async function () {
  const jobId = $(this).data("id");
  // return console.log(jobId);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Job?"
  );

  if (confirmDelete) {
    try {
      // Send an AJAX request to delete the job
      const response = await $.ajax({
        url: `/api/admin/job/${jobId}`,
        method: "DELETE",
      });
      if (response) {
        $(this).closest(".tr-row").remove();

        updateJobList();
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  }
});
