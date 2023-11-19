// Total Job
export function totalJob() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "/api/admin/job",
      dataType: "json",
      success: function (response) {
        resolve(response.length);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
}

// update List after add job
export async function updateJobList() {
  try {
    const totalJobs = await totalJob();
    $("#total_job").text(totalJobs);

    const allJobData = await $.ajax({
      url: "/api/admin/job",
      method: "GET",
      dataType: "json",
    });

    const jobList = $("#all-job-list");
    jobList.empty();

    $.each(allJobData, function (index, eachJobList) {
      const originalDate = eachJobList.createdAt;
      const formattedDate = new Date(originalDate).toLocaleDateString();
      const formattedTime = new Date(originalDate).toLocaleTimeString();

      const row = $("<tr>").addClass(
        "tr-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      );

      row.html(`
                  <td class="w-4 p-2">
                  <div class="relative">
                      <img class="w-10 h-10 rounded-full" src="${
                        eachJobList.avatar
                      }" alt="" />
                      <span data-tip="${
                        eachJobList.active_status ? "Active" : "Inactive"
                      }" class="tooltip top-0 left-7 absolute w-3.5 h-3.5 ${eachJobList.active_status ? "bg-green-400" : "bg-red-500"}  border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
                  </td>
                  <th scope="row" data-tip="${formattedDate} | ${formattedTime}" class="text-left px-6 w-full py-4 tooltip font-medium text-gray-900 whitespace-nowrap dark:text-white">${eachJobList.company}</th>
                  <td class="px-6 py-4">${eachJobList.job_title}</td>
                  <td class="px-6 py-4">${eachJobList.industry}</td>
                  <td class="px-6 py-4">${eachJobList.qualification}</td>
                  <td class="px-6 py-4">
                      <!-- Add data-id attribute to the "Edit" icon -->
                      <label for="job-edit-modal" data-id="${
                        eachJobList._id
                      }" data-tip="Edit" class="tooltip edit-button cursor-pointer font-medium text-green-600 dark:text-green-500 ">
                          <ion-icon class="text-xl text-green-600 tooltip" data-tip="Edit" name="create-outline"></ion-icon>
                      </label>
                      <label for="job-preview-modal" data-id="${
                        eachJobList._id
                      }"  href="#" data-tip="Preview" class="tooltip preview-button cursor-pointer font-medium text-green-600 dark:text-green-500 ">
                          <ion-icon class="text-xl text-green-600" name="eye-outline"></ion-icon>
                      </label>
                      
                      
                      <label for="activeInactive" data-id="${
                        eachJobList._id
                      }"  href="#" data-tip="${eachJobList.active_status ? "Active" : "Inactive"}" class="tooltip active-inactive-button cursor-pointer font-medium text-green-600 dark:text-green-500 ">
                      <ion-icon name="toggle-outline" class="text-xl  ${
                        eachJobList.active_status
                          ? "text-green-500"
                          : "text-red-500"
                      }"></ion-icon>
                      </label>
                      <label for="delete" data-id="${
                        eachJobList._id
                      }"  href="#" data-tip="Delete" class="tooltip delete-job-button cursor-pointer font-medium text-green-600 dark:text-green-500 ">
                      <ion-icon name="trash-outline" class="text-xl text-red-500"></ion-icon>
                      </label>
                  </td>                    
                  `);

      jobList.append(row);
    });
  } catch (error) {
    console.error("Error fetching or updating data:", error);
  }
}

// add job
$(document).ready(function () {
  updateJobList();

  $("#jobAddForm").submit(async function (event) {
    event.preventDefault();

    let formData = $(this).serialize();

    try {
      await $.ajax({
        url: "/api/admin/job",
        type: "POST",
        data: formData,
      });

      // Clear the form fields after submission
      $("#jobAddForm")[0].reset();

      $(".successAlartSection").addClass("alertActive");
      setTimeout(function () {
        $(".successAlartSection").removeClass("alertActive");
      }, 3000);

      // Update the job list with the new data
      updateJobList();
    } catch (error) {
      if (error.responseJSON && error.responseJSON.errors) {
        const errors = error.responseJSON.errors;
        const errorMessage = errors.map((error) => error.msg).join("<br>");

        $(".errAlartSection").addClass("alertActive");
        $(".errAlartSection").text(errorMessage, error.msg);

        setTimeout(function () {
          $(".errAlartSection").removeClass("alertActive");
        }, 5000);
      } else {
        console.log(`Could not fetch ${error}`);
      }
    }
  });
});

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

      $.each(response, function (index, item) {
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

// Call categories, qualification, employment, industry function
$(document).on("click", "#jobAddBTN", async function () {
  await populateDropdown(
    `/api/admin/job-categories`,
    "#add_category_drop",
    "--Select Category--"
  );
  await populateDropdown(
    `/api/admin/job-qualification`,
    "#add_qualification_drop",
    "--Select Qualification--"
  );
  await populateDropdown(
    `/api/admin/job-employment-status`,
    "#add_employment_status_drop",
    "--Select Employment--"
  );
  await populateDropdown(
    `/api/admin/job-industry`,
    "#add_industry_drop",
    "--Select Industry--"
  );
});
