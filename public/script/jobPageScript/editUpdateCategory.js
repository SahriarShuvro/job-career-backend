import { updateJobCategories } from "./categoriesAdd.js";

const getSingleCategory = async (categoryId) => {
  try {
    const response = await $.ajax({
      url: `/api/admin/job-categories/${categoryId}`,
      method: "GET",
      dataType: "json",
    });

    if (response) {
      const categoryData = response;
      const { title, color_code } = categoryData;

      $("#edit_category_title").val(title);
      $("#edit_category_color_code").val(color_code);
    } else {
      console.error("Failed to fetch job post data");
    }
  } catch (error) {
    console.log(`Error while fetching data: ${error}`);
  }
};

// Update

$(document).on("click", "#editCategorieButton", function () {
  const categoryId = $(this).data("id");

  $("#categoryEditForm")
    .off("submit")
    .on("submit", async function (event) {
      event.preventDefault();

      const updateCategorieData = {
        title: $("#edit_category_title").val(),
        color_code: $("#edit_category_color_code").val(),
      };

      try {
        const response = await $.ajax({
          url: `/api/admin/job-categories/${categoryId}`,
          method: "PATCH",
          data: updateCategorieData,
          dataType: "json",
        });

        if (response) {
          $(".updateSuccessAlart").addClass("alertActive");
          setTimeout(function () {
            $(".updateSuccessAlart").removeClass("alertActive");
          }, 3000);

          updateJobCategories();
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        if (error.responseJSON && error.responseJSON.errors) {
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

  getSingleCategory(categoryId);
});

// Function to handle the click event for the Active button
async function activateCategory(categoryId, activeStatus) {
  if (!activeStatus) {
    alert("This category is already active!");
    return;
  }

  const confirmActivate = confirm(
    "Are you sure you want to activate this category?"
  );
  if (!confirmActivate) {
    return;
  }

  const statusUpdate = { active_status: true };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-categories/${categoryId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      console.log("Category activated successfully");
      updateJobCategories();
    } else {
      console.error("Failed to activate category.");
    }
  } catch (error) {
    console.error("Error while activating category:", error);
  }
}

// Function to handle the click event for the Inactive button
async function inactivateCategory(categoryId, activeStatus) {
  if (!activeStatus) {
    alert("This category is already inactive!");
    return;
  }

  const confirmInactivate = confirm(
    "Are you sure you want to inactivate this category?"
  );
  if (!confirmInactivate) {
    return;
  }

  const statusUpdate = { active_status: false };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-categories/${categoryId}`,
      method: "PUT",
      data: statusUpdate,
      dataType: "json",
    });

    if (response && response.success) {
      console.log("Category inactivated successfully");
      updateJobCategories();
    } else {
      console.error("Failed to inactivate category.");
    }
  } catch (error) {
    console.error("Error while inactivating category:", error);
  }
}

// Event listener for the Active button
$(document).on("click", "#CactiveButton", function () {
  const categoryId = $(this).data("id");
  const activeStatus = $(this).prop("id") === "CactiveButton"; // Adjust based on your actual implementation
  activateCategory(categoryId, activeStatus);
});

// Event listener for the Inactive button
$(document).on("click", "#CinactiveButton", function () {
  const categoryId = $(this).data("id");
  const activeStatus = $(this).prop("id") === "CinactiveButton"; // Adjust based on your actual implementation
  inactivateCategory(categoryId, activeStatus);
});

// Delete

$(document).on("click", "#deleteCategoryButton", async function () {
  const categoryId = $(this).data("id");
  // return console.log(categoryId);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (confirmDelete) {
    try {
      // Send an AJAX request to delete the category
      const response = await $.ajax({
        url: `/api/admin/job-categories/${categoryId}`,
        method: "DELETE",
      });
      if (response) {
        $(this).closest(".cardsAll").remove();

        updateJobCategories();
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  }
});
