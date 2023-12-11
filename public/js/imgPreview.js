{
  const selectImage = document.querySelector(".select-image");
  const inputFile = document.querySelector("#avatar");
  const imgArea = document.querySelector(".img-area");

  selectImage.addEventListener("click", function () {
    inputFile.click();
  });

  inputFile.addEventListener("change", function () {
    const image = this.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      // Remove existing images in imgArea
      const allImg = imgArea.querySelectorAll("img");
      allImg.forEach((item) => item.remove());

      const imgUrl = reader.result;
      const img = document.createElement("img");
      img.src = imgUrl;
      imgArea.appendChild(img);

      imgArea.classList.add("active");
      imgArea.dataset.img = image.name;
    };

    reader.readAsDataURL(image);
  });
}
{
  const editForm = document.querySelector("#edit-company-form");
  const selectImage = editForm.querySelector(".select-image");
  const inputFile = editForm.querySelector("#edit_avatar");
  const imgArea = editForm.querySelector(".img-area");

  selectImage.addEventListener("click", function () {
    inputFile.click();
  });

  inputFile.addEventListener("change", function () {
    const image = this.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      // Remove existing images in imgArea
      const allImg = imgArea.querySelectorAll("img");
      allImg.forEach((item) => item.remove());

      const imgUrl = reader.result;
      const img = document.createElement("img");
      img.src = imgUrl;
      imgArea.appendChild(img);

      imgArea.classList.add("active");
      imgArea.dataset.img = image.name;
    };

    reader.readAsDataURL(image);
  });
}
