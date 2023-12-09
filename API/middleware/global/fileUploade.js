const multer = require("multer");
const path = require("path");

const generateUploadsFolder = (subfolder) => {
  return `./public/uploads/${subfolder}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subfolder = req.body.subfolder || "default" || subfolder; // Use a default if not provided
    const uploadsFolder = generateUploadsFolder(subfolder);
    cb(null, uploadsFolder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "_" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 512000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .png, or .jpeg format allowed!"));
    }
  },
});

module.exports = {
  upload: upload,
  generateUploadsFolder: generateUploadsFolder,
};
