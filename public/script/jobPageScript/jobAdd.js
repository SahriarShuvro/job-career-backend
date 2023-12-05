export function fetchAllJobData() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: `/api/admin/job`,
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
}

// Fetch job data from the server
export function fetchJobData(page, limit) {
  return $.ajax({
    type: "GET",
    url: `/api/admin/job?page=${page}&limit=${limit}`,
    dataType: "json",
  });
}

// Example usage
let currentPage = 1;
const itemsPerPage = 10;

export async function updateUI(data, total_item, active_item, inactive_item) {
  $("#total_job").text(total_item);

  $("#total_active_job").text(active_item);

  $("#total_inactive_job").text(inactive_item);

  const jobList = $("#all-job-list");
  jobList.empty();

  $.each(data, function (index, eachJobList) {
    const {
      _id,
      avatar,
      active_status,
      createdAt,
      company,
      job_title,
      industry,
      qualification,
    } = eachJobList;

    const formattedDate = new Date(createdAt).toLocaleDateString();
    const formattedTime = new Date(createdAt).toLocaleTimeString();

    const row = $("<tr>").addClass(
      "tr-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    );

    row.html(`
                <td class="w-4 p-2">
                  <div class="relative">
                    <img class="w-10 h-10 rounded-full" src="${avatar}" alt="" />
                    <span data-tip="${
                      active_status ? "Active" : "Inactive"
                    }" class="tooltip top-0 left-7 absolute w-3.5 h-3.5 ${active_status ? "bg-green-400" : "bg-red-500"} border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
                </td>
                <th scope="row" data-tip="Job added: ${formattedDate} | ${formattedTime}" class="text-left px-6 w-full py-4 tooltip font-medium text-gray-900 whitespace-nowrap dark:text-white">${company}</th>
                <td class="px-6 py-4">${job_title}</td>
                <td class="px-6 py-4">${industry}</td>
                <td class="px-6 py-4">${qualification}</td>
                <td class="px-6 py-4">
                  <label for="job-edit-modal" id="edit-button" data-id="${_id}" data-tip="Edit" class="tooltip cursor-pointer font-medium text-green-600 dark:text-green-500 ">
                    <ion-icon class="text-xl text-green-600 tooltip" data-tip="Edit" name="create-outline"></ion-icon>
                  </label>
                  <label for="job-preview-modal" data-id="${_id}" data-tip="Preview" class="tooltip preview-button cursor-pointer font-medium text-green-600 dark:text-green-500 ">
                    <ion-icon class="text-xl text-green-600" name="eye-outline"></ion-icon>
                  </label>
                  <label for="activeInactive" data-id="${_id}" data-tip="${active_status ? "Active" : "Inactive"}" class="tooltip active-inactive-button cursor-pointer font-medium text-green-600 dark:text-green-500 ">
                    <ion-icon name="toggle-outline" class="text-xl ${
                      active_status ? "text-green-500" : "text-red-500"
                    }"></ion-icon>
                  </label>
                  <label for="delete" data-id="${_id}" data-tip="Delete" class="tooltip delete-job-button cursor-pointer font-medium text-green-600 dark:text-green-500 ">
                    <ion-icon name="trash-outline" class="text-xl text-red-500"></ion-icon>
                  </label>
                </td>
              `);

    jobList.append(row);
  });
}

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

// Initial data fetch and UI update
fetchDataAndUpdateUI(currentPage);

// Event listener for next button
$("#nextButton").on("click", (e) => {
  e.preventDefault();

  currentPage += 1;
  fetchDataAndUpdateUI(currentPage);
});

// Event listener for previous button
$("#prevButton").on("click", (e) => {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage -= 1;
    fetchDataAndUpdateUI(currentPage);
  }
});

$(document).ready(function () {
  fetchDataAndUpdateUI(currentPage);

  $("#jobAddForm").submit(async function (event) {
    event.preventDefault();

    let formData = $(this).serialize();

    try {
      await $.ajax({
        url: "/api/admin/job",
        type: "POST",
        data: formData,
      });
      console.log(formData);

      // Clear the form fields after submission
      $("#jobAddForm")[0].reset();

      $(".successAlartSection").addClass("alertActive");
      setTimeout(function () {
        $(".successAlartSection").removeClass("alertActive");
      }, 3000);

      // Update the job list with the new data
      fetchDataAndUpdateUI(currentPage);
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
