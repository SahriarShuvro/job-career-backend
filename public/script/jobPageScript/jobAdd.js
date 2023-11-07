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
        "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      );

      row.html(`
                  <td class="w-4 p-2">
                  <div class="relative">
                      <img class="w-10 h-10 rounded-full" src="${eachJobList.avatar}" alt="" />
                      <span data-tip="Active" class="tooltip top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
                  </td>
                  <th scope="row" data-tip="${formattedDate} | ${formattedTime}" class="text-left px-6 w-full py-4 tooltip font-medium text-gray-900 whitespace-nowrap dark:text-white">${eachJobList.company}</th>
                  <td class="px-6 py-4">${eachJobList.job_title}</td>
                  <td class="px-6 py-4">${eachJobList.industry}</td>
                  <td class="px-6 py-4">${eachJobList.qualification}</td>
                  <td class="px-6 py-4">
                      <!-- Add data-id attribute to the "Edit" icon -->
                      <label for="job-edit-modal" data-id="${eachJobList._id}" class="edit-button cursor-pointer font-medium text-green-600 dark:text-green-500 hover:underline">
                          <ion-icon class="text-xl text-green-600 tooltip" data-tip="Edit" name="create-outline"></ion-icon>
                      </label>
                      <label for="job-preview-modal" data-id="${eachJobList._id}"  href="#" class="preview-button cursor-pointer font-medium text-green-600 dark:text-green-500 hover:underline">
                          <ion-icon class="text-xl text-green-600" name="eye-outline"></ion-icon>
                      </label>
                  </td>                    
              `);

      jobList.append(row);
    });
  } catch (error) {
    console.error("Error fetching or updating data:", error);
  }
}

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
      console.error("Error while adding a new job:", error);
    }
  });
});
