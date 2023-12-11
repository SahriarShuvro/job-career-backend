export function fetchAllCompanyData() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: `/api/admin/companies`,
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

// Fetch Company data from the server
export function fetchCompanyData(page, limit) {
  return $.ajax({
    type: "GET",
    url: `/api/admin/companies?page=${page}&limit=${limit}`,
    dataType: "json",
  });
}

// Example usage
let currentPage = 1;
const itemsPerPage = 9;

export async function updateUI(
  data,
  total_item,
  active_item,
  inactive_item,
  total_pages,
  page
) {
  $("#total_company").text(total_item);
  $("#total_active_company").text(active_item);
  $("#total_inactive_company").text(inactive_item);

  // Render Company list
  const companyCards = $("#companyCardBody");
  companyCards.empty();

  $.each(data, function (index, eachCompanyCard) {
    const { _id, avatar, title, phone, email, address, active_status } =
      eachCompanyCard;

    const card = $("<div>").addClass(
      "w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative m-2 cardsAll"
    );

    card.html(`
              <!-- Acive/Inactive BAGED -->
              <div class="absolute top-3 left-3">
                <p
                  class="cardStatusActive rounded-full bg-green-500 px-2 py-1 text-center text-xs hidden activeCard ${
                    active_status ? "bg-green-500" : "bg-red-600"
                  } "
                >
                ${active_status ? "Active" : "Inactive"}
                </p>
              </div>

              <!-- Delete Edit Buttons -->
              <div class="absolute top-3 right-3">
                <label
                  for="editCompany"
                  data-id="${_id}"
                  id="edit-compnay"
                  class="editButton btn btn-success rounded-full w-12 focus:outline-none border-none bg-green-500 px-2 py-1 text-center text-xs"
                >
                  <ion-icon
                    class="text-[18px] text-white font-semibold"
                    name="create-outline"
                  ></ion-icon>
                </label>
                <label
                data-id="${_id}"
                id="delete-compnay"
                for="deleteCompany"
                  class="delete-company-button btn btn-error rounded-full w-12 focus:outline-none border-none bg-red-500 px-2 py-1 text-center text-xs"
                >
                  <ion-icon
                    class="text-[18px] text-white font-semibold"
                    name="trash-outline"
                  ></ion-icon>
                </label>
              </div>

              <div class="flex justify-end px-4 pt-4"></div>
              <div class="flex flex-col items-center pb-10">
                <img
                  src="${avatar}"
                  class="w-24 h-24 mb-3 rounded-full dark:ring-gray-400 shadow-lg object-cover bg-cover bg-center"
                />
                <h5
                  class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
                >
                  ${title}
                </h5>
                <span
                  class="flex justify-center items-center text-center text-xs text-gray-500 dark:text-gray-400"
                  ><ion-icon class="mr-1" name="call-outline"></ion-icon
                  > ${phone}</span
                >
                <span
                  class="flex justify-center items-center text-center text-xs text-gray-500 dark:text-gray-400"
                  ><ion-icon class="mr-1" name="mail-outline"></ion-icon
                  > ${email}</span
                >
                <span
                  class="flex justify-center items-center text-center flex-wrap text-xs text-gray-500 dark:text-gray-400"
                  ><ion-icon class="mr-1" name="location-outline"></ion-icon
                  > ${address}</span
                >
                <div class="flex mt-4 space-x-3 md:mt-6">
                  <a
                    href="#"
                    id="active-inactive-button"
                    data-id="${_id}"
                    class=" ${
                      active_status === false
                        ? "activeButton inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none foc  us:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        : "inactiveButton inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-red-600 border border-red-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-200 text-white dark:border-red-600 hover:bg-red-800 dark:hover:border-red-700 dark:focus:ring-red-500"
                    }"
                    >${active_status === false ? "Active" : "Inactive"}</a
                  >
                </div>
              </div>
              `);

    companyCards.append(card);
  });

  // Render Page numbers *** *** ***
  const paginationUI = $("#_pagination");
  paginationUI.empty();

  //Render Prev button***
  const liPrev = $("<li>");
  liPrev.html(`
    <a
      href="#"
      id="prevButton"
      class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      <span class="sr-only">Previous</span>
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
  `);

  // Prev Button action
  liPrev.find("#prevButton").on("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage -= 1;
      fetchDataAndUpdateUI(currentPage);
    }
  });
  paginationUI.append(liPrev);

  // Render Page Numbers***
  for (let i = 1; i <= total_pages; i++) {
    const pageNumber = $("<li>");
    pageNumber.html(`
      <a
        href="#"
        class=" px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
          i === page
            ? "bg-blue-50 text-blue-600-s dark:text-white-s dark:bg-gray-700"
            : "dark:bg-gray-800 dark:text-gray-400"
        }"
      >${i}</a
      >
    `);

    // Attach click event listener to each page number
    pageNumber.find("a").on("click", function () {
      // Handle page number click event
      console.log(`Clicked on page ${i}`);
      // You may want to load data for the clicked page here
    });

    paginationUI.append(pageNumber);
  }

  //Render Next button***
  const liNext = $("<li>");
  liNext.html(`
    <a
      href="#"
      id="nextButton"
      class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      <span class="sr-only">Next</span>
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
  `);

  // Next Button action
  liNext.find("#nextButton").on("click", function (e) {
    e.preventDefault();
    currentPage += 1;
    if (currentPage === total_pages + 1) {
      currentPage = 1;
    }
    fetchDataAndUpdateUI(currentPage);
  });

  paginationUI.append(liNext);
}

export async function fetchDataAndUpdateUI(page) {
  fetchCompanyData(page, itemsPerPage)
    .then((response) => {
      updateUI(
        response.allPost,
        response.totalItems,
        response.totalActiveItems,
        response.totalInactiveItems,
        response.totalPages,
        response.page
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

// Initial data fetch and UI update
fetchDataAndUpdateUI(currentPage);

// Add Company
$(document).ready(function () {
  fetchDataAndUpdateUI(currentPage);

  $("#companyAddForm").submit(async function (event) {
    event.preventDefault();

    try {
      // Create a FormData object to handle both form fields and files
      const formData = new FormData(this);

      await $.ajax({
        url: "/api/admin/companies",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
          // Clear the form fields after submission
          $("#companyAddForm")[0].reset();

          $(".successAlartSection")
            .addClass("alertActive")
            .text("Company added successfully!");

          setTimeout(function () {
            $(".successAlartSection").removeClass("alertActive");
          }, 3000);

          // Update the job list with the new data
          fetchDataAndUpdateUI(currentPage);
        },
        error: function (error) {
          if (error.responseJSON && error.responseJSON.errors) {
            const errors = error.responseJSON.errors;
            const errorMessage = errors.map((error) => error.msg).join("<br>");

            $(".errAlartSection").addClass("alertActive").html(errorMessage);

            setTimeout(function () {
              $(".errAlartSection").removeClass("alertActive");
            }, 5000);
          } else {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  });
});

// Get Details for edit
const getEditDetails = async (companyId) => {
  try {
    const response = await $.ajax({
      url: `/api/admin/companies/${companyId}`,
      method: "GET",
      dataType: "json",
    });

    if (response) {
      const companyPostData = response;
      const { avatar, title, phone, email, address } = companyPostData;

      const img = document.createElement("img");
      img.id = "img-p";
      img.src = avatar;
      // const fileName = avatar.split(`uploads`)[1].split(`default`)[1];
      // const match = fileName.match(/\\([^\\]+)$/);

      // if (match) {
      //   const fileName = match[1];
      //   // Fetch the blob data
      //   const blob = await fetch(avatar).then((response) => response.blob());

      //   // Create a new File object
      //   const file = new File([blob], fileName);

      //   // Create a new FileList
      //   const fileList = new DataTransfer();
      //   fileList.items.add(file);

      //   // Set the files property of the input element
      //   $("#edit_avatar")[0].files = fileList.files;
      //   // Trigger a change event on the file input
      //   $("#edit_avatar").trigger("change");
      //   console.log($("#edit_avatar")[0].files);
      // } else {
      //   console.error("Failed to extract filename");
      // }

      $("#edit_name").val(title);
      $("#edit_phone").val(phone);
      $("#edit_email").val(email);
      $("#edit_address").val(address);
      $(".img-area").append(img);
    } else {
      console.error("Failed to fetch company post data");
    }
  } catch (error) {
    console.error("Error while fetching company post data:", error);
  }
};

// Client-side form validation function
function validateForm() {
  // Check if required fields are filled
  if (
    // $("#edit_avatar").val() === "" ||
    $("#edit_name").val() === "" ||
    $("#edit_phone").val() === "" ||
    $("#edit_email").val() === "" ||
    $("#edit_address").val() === ""
  ) {
    alert("Please fill in all required fields.");
    return false;
  }

  return true;
}

// Edit
$(document).on("click", "#edit-compnay", async function () {
  const companyId = $(this).data("id");

  getEditDetails(companyId);

  // Event delegation for form submission
  $(document)
    .off("submit")
    .on("submit", "#edit-company-form", async function (event) {
      event.preventDefault();

      // Client-side form validation
      if (!validateForm()) {
        return;
      }

      try {
        const formData = new FormData();
        formData.append("avatar", $("#edit_avatar")[0].files[0]);
        formData.append("title", $("#edit_name").val());
        formData.append("phone", $("#edit_phone").val());
        formData.append("email", $("#edit_email").val());
        formData.append("address", $("#edit_address").val());

        await $.ajax({
          url: `/api/admin/companies/${companyId}`,
          method: "PATCH",
          data: formData,
          dataType: "json",
          contentType: false,
          processData: false,
          success: function (response) {
            if (response) {
              $(".editSuccessAlartSection").addClass("alertActive");
              setTimeout(function () {
                $(".editSuccessAlartSection").removeClass("alertActive");
              }, 2000);
              fetchDataAndUpdateUI(currentPage);

              $("#edit-company-form")[0].reset();
              $("#img-p").remove();
              let isClicked = false;

              $("#cancelButton").on("click", function () {
                isClicked = true;
              });

              setTimeout(function () {
                if (!isClicked) {
                  $("#cancelButton").click();
                }
              }, 2000);
            } else {
              console.error("Failed to update company data");
            }
          },
        });
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
$(document).on("click", "#active-inactive-button", async function (e) {
  e.preventDefault();
  const companyId = $(this).data("id");
  const confirmToggle = confirm(
    "Are you sure you want to toggle the active status of this POST?"
  );
  if (!confirmToggle) {
    return;
  }

  try {
    // Fetch the current status
    const currentStatusResponse = await $.ajax({
      url: `/api/admin/companies/${companyId}`,
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
      url: `/api/admin/companies/${companyId}`,
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
      console.log("Company status toggled successfully");
      fetchDataAndUpdateUI(currentPage);
    } else {
      console.error("Failed to toggle Company status.");
    }
  } catch (error) {
    console.error("Error while toggling Company status:", error);
  }
});

// Delete Details
$(document).on("click", "#delete-compnay", async function () {
  const companyId = $(this).data("id");
  console.log(companyId);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Company?"
  );

  if (confirmDelete) {
    try {
      // Show loading spinner while waiting for the response
      $(this).closest(".tr-row").addClass("deleting");

      // Send an AJAX request to delete the company
      const response = await $.ajax({
        url: `/api/admin/companies/${companyId}`,
        method: "DELETE",
      });

      if (response) {
        // Remove the company row from the UI
        $(this).closest(".tr-row").remove();

        // Update UI or perform other actions
        fetchDataAndUpdateUI(currentPage);
      }
    } catch (error) {
      console.error("Failed to delete company:", error);
    } finally {
      // Remove the loading spinner regardless of success or failure
      $(this).closest(".tr-row").removeClass("deleting");
    }
  }
});

// Preview Details

$(document).on("click", ".preview-button", async function () {
  const companyId = $(this).data("id");
  console.log(companyId);

  try {
    // Send an AJAX request to fetch job post data
    const response = await $.ajax({
      url: `/api/admin/job/${companyId}`,
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
