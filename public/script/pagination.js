// // frontend-script.js
// $(document).ready(() => {
//   let currentPage = 1;
//   const limit = 10; // Set your desired limit

//   // Function to fetch and display data
//   const fetchData = (page) => {
//     $.ajax({
//       url: `/api/admin/job?page=${page}&limit=${limit}`,
//       type: "GET",
//       dataType: "json",
//       success: (data) => {
//         // Handle the received data, e.g., update the UI
//         console.log(data);
//       },
//       error: (err) => {
//         console.error("Error fetching data:", err);
//       },
//     });
//   };

//   // Initial data fetch
//   fetchData(currentPage);

//   // Event listener for pagination buttons (assuming you have next and previous buttons)
//   $("#nextButton").on("click", () => {
//     if (currentPage < data.next.page) {
//       currentPage += 1;
//       fetchData(currentPage);
//     }
//   });

//   $("#prevButton").on("click", () => {
//     if (currentPage > data.previous.page) {
//       currentPage -= 1;
//       fetchData(currentPage);
//     }
//   });
// });
