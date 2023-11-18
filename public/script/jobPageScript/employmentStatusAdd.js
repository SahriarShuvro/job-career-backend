export async function updateJobEmploymentStatus() {
  try {
    const allEmploymentStatus = await $.ajax({
      url: "/api/admin/job-employment-status",
      method: "GET",
      dataType: "JSON",
    });

    if (allEmploymentStatus) {
      const employmentStatusCardBody = $("#employmentStatusCardBody");
      employmentStatusCardBody.empty();

      $.each(allEmploymentStatus, function (index, employmentStatusCard) {
        const div = $("<div>")
          .addClass(
            "w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative m-2 cardsAll"
          )
          .css("border-color", employmentStatusCard.color_code);
        div.html(`
            <!-- Acive/Inactive BAGED -->
            <div class="absolute top-3 left-3">
              <p
                id=""
                data-id="${employmentStatusCard._id}"
                class="activeInactiveBAGD cardStatusActive rounded-full ${
                  employmentStatusCard.active_status
                    ? "bg-green-500"
                    : "bg-red-600"
                } px-2 py-1 text-center text-xs hidden activeCard"
              >
                ${employmentStatusCard.active_status ? "Active" : "Inactive"}
              </p>
            </div>
  
            <!-- Delete Edit Buttons -->
            <div class="absolute top-3 right-3">
              <label
                for="editEmploymentStatus"
                id="editEmploymentStatusButton"
                data-id="${employmentStatusCard._id}"
                class="editButton btn btn-success rounded-full w-12 focus:outline-none border-none bg-green-500 px-2 py-1 text-center text-xs"
              >
                <ion-icon
                  class="text-[18px] text-white font-semibold"
                  name="create-outline"
                ></ion-icon>
              </label>
              <label
                id="deleteEmploymentStatusButton"
                data-id="${employmentStatusCard._id}"
                class="deleteButton btn btn-error rounded-full w-12 focus:outline-none border-none bg-red-500 px-2 py-1 text-center text-xs"
                for=""
              >
                <ion-icon
                  class="text-[18px] text-white font-semibold"
                  name="trash-outline"
                ></ion-icon>
              </label>
            </div>
  
            <div class="flex justify-end px-4 pt-4"></div>
            <div class="flex flex-col items-center pb-10">
              <ion-icon
                name="bag-handle-outline"
                class="w-24 h-24 mb-3 rounded-md dark:ring-gray-400 shadow-lg"
              ></ion-icon>
              <h5
                class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
              >
              </h5>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                ${employmentStatusCard.title}
              </span>
              <div class="flex mt-4 space-x-3 md:mt-6">
                <a
                  href="#"
                  id="EactiveButton"
                  data-id="${employmentStatusCard._id}"
                  class="activeButton inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >Active</a
                >
                <a
                  href="#"
                  id="EinactiveButton"
                  data-id="${employmentStatusCard._id}"
                  class="inactiveButton inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-red-600 border border-red-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-200 text-white dark:border-red-600 hover:bg-red-800 dark:hover:border-red-700 dark:focus:ring-red-500"
                >Inactive</a
                >
              </div>
            </div>
          `);
        employmentStatusCardBody.append(div);
      });
    } else {
      console.log(`Failed to fetch data!`);
    }
  } catch (error) {
    console.log(error);
  }
}

$(document).on("click", "#employment-status-button", async function () {
  updateJobEmploymentStatus();
});

$(document).ready(function () {
  updateJobEmploymentStatus();

  $("#employmentStatusAddForm").submit(async function (event) {
    event.preventDefault();

    let employmentStatusFormData = $(this).serialize();

    try {
      await $.ajax({
        url: "/api/admin/job-employment-status",
        type: "POST",
        data: employmentStatusFormData,
      });

      $("#employmentStatusAddForm")[0].reset();

      $(".employmentStatusSuccessAlart").addClass("alertActive");
      setTimeout(function () {
        $(".employmentStatusSuccessAlart").removeClass("alertActive");
      }, 3000);

      updateJobEmploymentStatus();
    } catch (error) {
      if (error.responseJSON && error.responseJSON.errors) {
        // If there are validation errors, display them in a toast or alert
        const errors = error.responseJSON.errors;
        const errorMessage = errors.map((error) => error.msg).join("<br>");

        // Show an error toast or alert
        $(".errAlartSection").addClass("alertActive");
        $(".errAlartSection").text(errorMessage, error.msg);
        // $(".employmentStatusErrorAlert .toast-body").html(errorMessage);

        setTimeout(function () {
          $(".errAlartSection").removeClass("alertActive");
        }, 5000);
      } else {
        console.log(`Could not fetch ${error}`);
      }
    }
  });
});
