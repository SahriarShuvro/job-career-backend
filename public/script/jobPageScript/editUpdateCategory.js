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
