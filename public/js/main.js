// Image Preview
{
  let imageUpload = document.querySelectorAll(".imageUpload");

  imageUpload.forEach((eachImageUploader) => {
    let imageInput = eachImageUploader.querySelector(".formInput");
    let imgPreview = eachImageUploader.querySelector(".imgPreview");

    imageInput.addEventListener("change", function () {
      imgPreview.src = URL.createObjectURL(this.files[0]);
    });
  });
}
