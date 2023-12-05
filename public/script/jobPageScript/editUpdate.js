import { fetchJobData, updateUI } from "./jobAdd.js";

let currentPage = 1;
const itemsPerPage = 10;

export async function fetchDataAndUpdateUI(page) {
  fetchJobData(page, itemsPerPage)
    .then((response) => {
      updateUI(
        response.results.results,
        response.totalItems,
        response.totalActiveItems,
        response.totalInactiveItems
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

// Get details in edit input
const getEditDetails = async (jobId) => {
  try {
    const response = await $.ajax({
      url: `/api/admin/job/${jobId}`,
      method: "GET",
      dataType: "json",
    });

    console.log(response);

    if (response) {
      const jobPostData = response;

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

      $("#edit_job_title").val(job_title);
      $("#edit_start_date").val(formatted_s_date);
      $("#edit_end_date").val(formatted_e_date);
      $("#edit_company").val(company);
      $("#edit_job_location").val(job_location);
      $("#edit_qualification_drop").val(qualification);
      $("#edit_employment_status_drop").val(employment_status);
      $("#edit_offerd_salary").val(offerd_salary);
      $("#edit_category_drop").val(category);
      $("#edit_vacancy").val(vacancy);
      $("#edit_industry_drop").val(industry);
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

// Fetch categories, qualification, employment, industry function
async function populateDropdown(url, dropdownId, placeholder) {
  try {
    const response = await $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
    });

    if (response) {
      const dropdown = $(dropdownId);
      dropdown.empty();

      const optionS = $("<option>");
      optionS.val("");
      optionS.text(placeholder);
      dropdown.append(optionS);

      $.each(response.results, function (index, item) {
        const option = $("<option>");
        if (item.active_status === true) {
          option.val(item.title);
          option.text(item.title);
          dropdown.append(option);
        }
      });
    } else {
      console.log(`Failed to fetch data from ${url}!`);
    }
  } catch (error) {
    console.log(`Can't fetch data from ${url}: ${error}`);
  }
}

// Client-side form validation function
function validateForm() {
  // Check if required fields are filled
  if (
    $("#edit_job_title").val() === "" ||
    $("#edit_start_date").val() === "" ||
    $("#edit_end_date").val() === "" ||
    $("#edit_company").val() === "" ||
    $("#edit_job_location").val() === "" ||
    $("#edit_qualification_drop").val() === "" ||
    $("#edit_employment_status_drop").val() === "" ||
    $("#edit_offerd_salary").val() === "" ||
    $("#edit_category_drop").val() === "" ||
    $("#edit_vacancy").val() === "" ||
    $("#edit_industry_drop").val() === "" ||
    $("#edit_experience").val() === "" ||
    $("#edit_gender").val() === "" ||
    $("#edit_job_details").val() === "" ||
    $("#edit_skills_required").val() === ""
  ) {
    alert("Please fill in all required fields.");
    return false;
  }

  // Validate date format for start_date and end_date
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (
    !dateFormatRegex.test($("#edit_start_date").val()) ||
    !dateFormatRegex.test($("#edit_end_date").val())
  ) {
    alert("Invalid date format. Please use YYYY-MM-DD.");
    return false;
  }

  // Validate numeric fields
  const numericRegex = /^\d+$/;
  const salary = $("#edit_offerd_salary").val();
  const vacancy = $("#edit_vacancy").val();

  if (!numericRegex.test(salary) || !numericRegex.test(vacancy)) {
    alert("Salary and vacancy must be numeric values.");
    return false;
  }

  return true;
}

// Edit
$(document).on("click", "#edit-button", async function () {
  const jobId = $(this).data("id");
  console.log(jobId);

  await populateDropdown(
    `/api/admin/job-categories`,
    "#edit_category_drop",
    "--Select Category--"
  );
  await populateDropdown(
    `/api/admin/job-qualification`,
    "#edit_qualification_drop",
    "--Select Qualification--"
  );
  await populateDropdown(
    `/api/admin/job-employment-status`,
    "#edit_employment_status_drop",
    "--Select Employment--"
  );
  await populateDropdown(
    `/api/admin/job-industry`,
    "#edit_industry_drop",
    "--Select Industry--"
  );
  getEditDetails(jobId);

  // Event delegation for form submission
  $(document)
    .off("submit")
    .on("submit", "#edit-job-form", async function (event) {
      event.preventDefault();

      // Client-side form validation
      if (!validateForm()) {
        return;
      }

      const updatedData = {
        job_title: $("#edit_job_title").val(),
        start_date: $("#edit_start_date").val(),
        end_date: $("#edit_end_date").val(),
        company: $("#edit_company").val(),
        job_location: $("#edit_job_location").val(),
        qualification: $("#edit_qualification_drop").val(),
        employment_status: $("#edit_employment_status_drop").val(),
        offered_salary: parseInt($("#edit_offerd_salary").val(), 10),
        category: $("#edit_category_drop").val(),
        vacancy: parseInt($("#edit_vacancy").val(), 10),
        industry: $("#edit_industry_drop").val(),
        experience: $("#edit_experience").val(),
        gender: $("#edit_gender").val(),
        job_details: $("#edit_job_details").val(),
        skills_required: $("#edit_skills_required").val(),

        salary_negotiable: $("#edit_salary_negotiable_yes").is(":checked")
          ? "yes"
          : "no",
      };
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

          fetchDataAndUpdateUI(currentPage);
        } else {
          console.error("Failed to update job data");
        }
      } catch (error) {
        if (error.responseJSON && error.responseJSON.errors) {
          console.log(error.responseJSON);
          const errors = error.responseJSON.errors;
          const errorMessage = errors.map((error) => error.msg).join("<br>");

          $(".errAlartSection").addClass("alertActive");
          $(".errAlartSection").html(errorMessage);

          setTimeout(function () {
            $(".errAlartSection").removeClass("alertActive");
          }, 3000);
        } else {
          console.error(`Could catch error ${error.message}`);
        }
      }
    });
});

// Active/inactive job post
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
      fetchDataAndUpdateUI(currentPage);
    } else {
      console.error("Failed to toggle category status.");
    }
  } catch (error) {
    console.error("Error while toggling category status:", error);
  }
});

// Delete Details
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

        fetchDataAndUpdateUI(currentPage);
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  }
});

// Preview Details

$(document).on("click", ".preview-button", async function () {
  const jobId = $(this).data("id");
  console.log(jobId);

  try {
    // Send an AJAX request to fetch job post data
    const response = await $.ajax({
      url: `/api/admin/job/${jobId}`,
      method: "GET",
      dataType: "json",
    });

    if (response) {
      const jobPostData = response;
      const original_s_d = jobPostData.start_date;
      const formatted_s_date = new Date(original_s_d)
        .toISOString()
        .split("T")[0];
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
        active_status,
      } = jobPostData;

      $("#p_job_title").text(job_title);
      $("#p_start_date").text(formatted_s_date);
      $("#p_end_date").text(formatted_e_date);
      $("#p_company").text(company);
      $("#p_job_location").text(job_location);
      $("#p_qualification").text(qualification);
      $("#p_employment_status").text(employment_status);
      $("#p_offerd_salary").text(offerd_salary);
      $("#p_salary_negotiable").text(salary_negotiable);
      $("#p_category").text(category);
      $("#p_vacancy").text(vacancy);
      $("#p_industry").text(industry);
      $("#p_experience").text(experience);
      $("#p_gender").text(gender);
      $("#p_job_details").text(job_details);
      $("#p_skills_required").text(skills_required);
    } else {
      console.error("Failed to fetch job post data");
    }
  } catch (error) {
    console.error("Error while fetching job post data:", error);
  }
});
