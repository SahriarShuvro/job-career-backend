$(document).on("click", ".preview-button", async function () {
  const jobId = $(this).data("id");

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
