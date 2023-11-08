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
      const { category_title, category_color_code } = categoryData;

      $("#edit_category_title").val(category_title);
      $("#edit_category_color_code").val(category_color_code);
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

  getSingleCategory(categoryId);

  $("#categoryEditForm").on("submit", async function (event) {
    event.preventDefault();

    const updateCategoryData = {
      category_title: $("#edit_category_title").val(),
      category_color_code: $("#edit_category_color_code").val(),
    };

    try {
      const response = await $.ajax({
        url: `/api/admin/job-categories/${categoryId}`,
        method: "PATCH",
        data: updateCategoryData,
        dataType: "json",
      });

      if (response) {
        $(".updateSuccessAlart").addClass("alertActive");
        setTimeout(function () {
          $(".updateSuccessAlart").removeClass("alertActive");
        }, 3000);

        updateJobCategories();
      } else {
      }
    } catch (error) {
      console.error("Error while updating job data:", error);
    }
  });
});

// Active ajax requste function
async function activeFectch(categoryId) {
  const statusUpdate = { active_status: true };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-categories/${categoryId}`,
      method: "PATCH",
      data: statusUpdate,
      dataType: "json",
    });

    if (response) {
      updateJobCategories();
    } else {
      console.error("Failed to inactivate category.");
    }
  } catch (error) {
    // Handle errors that occur during the AJAX request
    console.error("Error while inactivating category:", error);
  }
}

// Active ajax requste function
async function inactiveFectch(categoryId) {
  const statusUpdate = { active_status: false };
  try {
    const response = await $.ajax({
      url: `/api/admin/job-categories/${categoryId}`,
      method: "PATCH",
      data: statusUpdate,
      dataType: "json",
    });

    if (response) {
      updateJobCategories();
    } else {
      console.error("Failed to inactivate category.");
    }
  } catch (error) {
    // Handle errors that occur during the AJAX request
    console.error("Error while inactivating category:", error);
  }
}

// Geting active_status

async function getActiveStatus(categoryId) {
  try {
    const activeStatusResponse = $.ajax({
      url: `/api/admin/job-categories/${categoryId}`,
      method: "GET",
      dataType: "json",
    });
    if (activeStatusResponse) {
      return activeStatusResponse;
    } else {
      console.error(error);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Inactive category
$(document).on("click", "#inactiveButton", async function () {
  const categoryId = $(this).data("id");

  const category_status = await getActiveStatus(categoryId);

  const { active_status } = category_status;

  if (active_status === false) {
    return window.alert("Alrady inactive this category!");
  }

  const confirmInactive = window.confirm(
    "Are you sure you want to INACTIVE this category?"
  );

  if (confirmInactive) {
    inactiveFectch(categoryId);
  }
});

// Active category
$(document).on("click", "#activeButton", async function () {
  const categoryId = $(this).data("id");

  const category_status = await getActiveStatus(categoryId);

  const { active_status } = category_status;

  if (active_status === true) {
    return window.alert("Alrady active this category!");
  }

  const confirmInactive = window.confirm(
    "Are you sure you want to ACTIVE this category?"
  );

  if (confirmInactive) {
    activeFectch(categoryId);
  }
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
