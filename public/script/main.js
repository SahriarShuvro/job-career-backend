export async function totalJob() {
  try {
    const response = await $.ajax({
      type: "GET",
      url: "/api/admin/job",
      dataType: "json",
    });

    if (response) {
      $("#total_job").text(response.length);
    } else {
      console.log("Error: Failed to fetch data");
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

$(document).ready(function () {
  totalJob();
});
