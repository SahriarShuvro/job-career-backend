// Code For Job add 

{
  let formID = document.getElementById("formID");
  let formInput = formID.querySelectorAll(".formInput");
  let submitBTN = document.getElementById("submitBTN");
  let tableBody = document.querySelector(".tableBody");
  let formData = {};

  let allEditBTN = document.querySelectorAll(".editBTN");


  function displayData() {
    tableBody.innerHTML = "";
    data.forEach((value) => {
      tableBody.innerHTML += `
       <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
         <td class="w-4 p-2">
           <div class="relative">
             <img class="w-10 h-10 rounded-full" src="https://foodshahibd.com/foodshahi_ci/assets/media/restaurants/logo/1552416111_logo.png" alt="">
             <span data-tip="Active" class="tooltip top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
           </div>
         </td>
         <th scope="row" data-tip="Post Date: 02 Sep, 2022 | View: 0.9k" class="px-6 py-4 tooltip font-medium text-gray-900 whitespace-nowrap dark:text-white">${value.company}</th>
         <td class="px-6 py-4">${value.jobTitle}</td>
         <td class="px-6 py-4">${value.industry}</td>
         <td class="px-6 py-4">${value.qualification}</td>
         <td class="px-6 py-4">
           <label for="my-modal-edit" href="#"
                      class="cursor-pointer font-medium text-green-600 dark:text-green-500 tooltip" data-tip="Edit"><ion-icon
                        class="text-xl text-green-600 toolCreate" name="create-outline"></ion-icon>
            </label>
           <label for="my-modal-view" href="#" class="cursor-pointer font-medium text-green-600 dark:text-green-500 hover:underline">
             <ion-icon class="text-xl text-green-600 md hydrated" name="eye-outline" role="img" aria-label="eye outline"></ion-icon>
           </label>
         </td>
       </tr>`;
    });
  }

  function fetchData() {
    data = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = JSON.parse(localStorage.getItem(key));
      data.push(value);
    }
    displayData();
  }

  function saveData(formData) {
    let allInputsFilled = true;
    formInput.forEach((inputValue) => {
      let name = inputValue.name;
      let value = inputValue.value;
      formData[name] = value;
      if (!value) {
        allInputsFilled = false;
      }
    });
    if (allInputsFilled) {
      let key = Date.now().toString();
      localStorage.setItem(key, JSON.stringify(formData));
      fetchData();
      let forSuccessAlart = document.querySelector(".successAlartSection");
      forSuccessAlart.classList.add("alertActive");

      setTimeout(function () {
        forSuccessAlart.classList.remove("alertActive");
      }, 2500);
      formInput.forEach((inputValue) => {
        inputValue.value = "";
      });
    } else {
      let forErrAlart = document.querySelector(".errAlartSection");
      forErrAlart.classList.add("alertActive");

      setTimeout(function () {
        forErrAlart.classList.remove("alertActive");
      }, 2500);
    }
  }

  fetchData();

  submitBTN.addEventListener("click", function (e) {
    e.preventDefault();
    let formData = {};
    saveData(formData);
  });
}

// Code For Categories add 
{
  let categoryformID = document.getElementById('categoryformID')
  let categoryFormInput = categoryformID.querySelectorAll(".formInput");
  let categorySubmitBTN = document.getElementById("categorySubmitBTN");
  let categoryCardBody = document.querySelector("#categoryCardBody");

  function displayCategoryData() {
    categoryCardBody.innerHTML = "";
    data.forEach((value) => {
      categoryCardBody.innerHTML += `
       <div
                class="w-full max-w-sm bg-white border border-gray-200 border-[#{value.colorCode}] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative m-2 cardsAll" style="border: 1px solid ${value.colorCode};">
                <div class="absolute top-3 left-3">
                <!-- Active/Inactive Buttons -->
                  <p
                    class="cardStatusActive text-white  rounded-full bg-green-500 px-2 py-1 text-center text-xs hidden activeCard ">
                    Active
                  </p>
                  <p class="cardStatusInactive text-white  rounded-full bg-red-500 px-2 py-1 text-center text-xs hidden ">
                    Inactive
                  </p>

                  </div>
                  <!-- Delete Edit Buttons -->
                <div class="absolute top-3 right-3">
                  <label for="editCategories"
                    class="editButton  btn btn-success rounded-full w-12 focus:outline-none border-none bg-green-500 px-2 py-1 text-center text-xs   ">
                    <ion-icon class="text-[18px] text-white font-semibold" name="create-outline"></ion-icon>
                  </label>
                  <label
                    class="deleteButton btn btn-error  rounded-full w-12 focus:outline-none border-none bg-red-500 px-2 py-1 text-center text-xs  ">
                    <ion-icon class="text-[18px] text-white font-semibold" name="trash-outline"></ion-icon>
                  </label>
                </div>
                <div class="flex justify-end px-4 pt-4">
                  
                </div>
                <div class="flex flex-col items-center pb-10">
                  <ion-icon name="bag-handle-outline"
                    class="w-24 h-24 mb-3 rounded-md  dark:ring-gray-400 shadow-lg"></ion-icon>
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white" style="color:${value.colorCode};">
                    ${value.categoriesTitle}</h5>
                  <span class="text-xs text-gray-500 dark:text-gray-400">Total Job (198)</span>
                  <div class="flex mt-4 space-x-3 md:mt-6">
                    <a href="#"
                      class="activeButton inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Active</a>
                    <a href="#"
                      class="inactiveButton inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-red-600 border border-red-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-200  text-white dark:border-red-600 hover:bg-red-800 dark:hover:border-red-700 dark:focus:ring-red-500">Inactive</a>
                  </div>
                </div>
              </div>`;
    });
  }

  function fetchCategoryData() {
    data = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = JSON.parse(localStorage.getItem(key));
      data.push(value);
    }
    displayCategoryData();
  }

  function saveCategoryData(formData) {
    let allInputsFilled = true;
    categoryFormInput.forEach((inputValue) => {
      let name = inputValue.name;
      let value = inputValue.value;
      formData[name] = value;
      if (!value) {
        allInputsFilled = false;
      }
    });
    let categoriesAddModal = document.querySelector('.categoriesAddModal')
    if (allInputsFilled) {
      let key = Date.now().toString();
      localStorage.setItem(key, JSON.stringify(formData));
      fetchCategoryData();
      let forSuccessAlart = categoriesAddModal.querySelector(".successAlartSection");
      forSuccessAlart.classList.add("alertActive");

      setTimeout(function () {
        forSuccessAlart.classList.remove("alertActive");
      }, 2500);
      categoryFormInput.forEach((inputValue) => {
        inputValue.value = "";
      });
    } else {
      let forErrAlart = categoriesAddModal.querySelector(".errAlartSection");
      forErrAlart.classList.add("alertActive");

      setTimeout(function () {
        forErrAlart.classList.remove("alertActive");
      }, 2500);
    }
  }

  fetchCategoryData();

  categorySubmitBTN.addEventListener("click", function (e) {
    e.preventDefault();
    let formData = {};
    saveCategoryData(formData);
  });

}

