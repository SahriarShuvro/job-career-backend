let tabMultipleButton = document.querySelectorAll(".tabButton");

tabMultipleButton.forEach((tabSingleButton) => {
  let tergetTabButton = tabSingleButton.getAttribute("data-target");
  let theTabButton = document.getElementById(tergetTabButton);

  tabSingleButton.addEventListener("click", () => {
    tabMultipleButton.forEach((element) => {
      let tergetTabButton2 = element.getAttribute("data-target");
      let theTabButton2 = document.getElementById(tergetTabButton2);
      element.classList.remove("tab-active");
      theTabButton2.classList.remove("tab-section-active");
    });
    theTabButton.classList.add("tab-section-active");
    tabSingleButton.classList.add("tab-active");
  });
});
