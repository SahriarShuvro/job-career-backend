{
  let companyFormID = document.getElementById("companyformID");
  let companyFormInput = companyFormID.querySelectorAll(".formInput");
  let companySubmitBTN = document.getElementById("companySubmitBTN");
  let companyCardBody = document.querySelector("#companyCardBody");

  function displayCompanyData() {
    companyCardBody.innerHTML = "";
    data.forEach((value) => {
      companyCardBody.innerHTML += `
       <div
                class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative m-2 cardsAll">
                <!-- Acive/Inactive BAGED -->
                <div class="absolute top-3 left-3">
                  <p
                    class="cardStatusActive  rounded-full bg-green-500 px-2 py-1 text-center text-xs hidden activeCard ">
                    Active
                  </p>
                  <p class="cardStatusInactive  rounded-full bg-red-500 px-2 py-1 text-center text-xs hidden ">
                    Inactive
                  </p>
                </div>

                <!-- Delete Edit Buttons -->
                <div class="absolute top-3 right-3">
                  <label for="editCompany"
                    class="editButton  btn btn-success rounded-full w-12 focus:outline-none border-none bg-green-500 px-2 py-1 text-center text-xs   ">
                    <ion-icon class="text-[18px] text-white font-semibold" name="create-outline"></ion-icon>
                  </label>
                  <label
                    class="deleteButton btn btn-error  rounded-full w-12 focus:outline-none border-none bg-red-500 px-2 py-1 text-center text-xs  ">
                    <ion-icon class="text-[18px] text-white font-semibold" name="trash-outline"></ion-icon>
                  </label>
                </div>

                <div class="flex justify-end px-4 pt-4"></div>
                <div class="flex flex-col items-center pb-10">
                  <img src="${value.imageLink}"
                    class="w-24 h-24 mb-3 rounded-full  dark:ring-gray-400 shadow-lg object-cover bg-cover bg-center" />
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    ${value.companyName}</h5>
                  <span class="flex justify-center items-center text-xs text-gray-500 text-center  dark:text-gray-400"><ion-icon
                      class="mr-1" name="call-outline"></ion-icon>${value.companyPhone}</span>
                  <span class="flex justify-center items-center text-xs text-gray-500 text-center  dark:text-gray-400"><ion-icon
                      class="mr-1" name="mail-outline"></ion-icon>${value.companyEmail}</span>
                  <span class="flex justify-center items-center text-xs text-gray-500 text-center flex-wrap dark:text-gray-400"><ion-icon
                      class="mr-1" name="location-outline"></ion-icon>${value.companyAddress}</span>
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

  function fetchCompanyData() {
    data = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = JSON.parse(localStorage.getItem(key));
      data.push(value);
    }
    displayCompanyData();
  }

  function saveCompanyData(formData) {
    let allInputsFilled = true;
    companyFormInput.forEach((inputValue) => {
      let name = inputValue.name;
      let value = inputValue.value;
      formData[name] = value;
      if (!value) {
        allInputsFilled = false;
      }
    });
    let companyAddModal = document.querySelector(".companyAddModal");
    if (allInputsFilled) {
      let key = Date.now().toString();
      localStorage.setItem(key, JSON.stringify(formData));
      fetchCompanyData();
      let forSuccessAlart = companyAddModal.querySelector(
        ".successAlartSection"
      );
      forSuccessAlart.classList.add("alertActive");

      setTimeout(function () {
        forSuccessAlart.classList.remove("alertActive");
      }, 2500);
      companyFormInput.forEach((inputValue) => {
        inputValue.value = "";
      });
    } else {
      let forErrAlart = companyAddModal.querySelector(".errAlartSection");
      forErrAlart.classList.add("alertActive");

      setTimeout(function () {
        forErrAlart.classList.remove("alertActive");
      }, 2500);
    }
  }

  fetchCompanyData();

  companySubmitBTN.addEventListener("click", function (e) {
    e.preventDefault();
    let formData = {};
    saveCompanyData(formData);
  });
}
