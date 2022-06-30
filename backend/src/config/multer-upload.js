const multer = require("multer");
const { cloudinary } = require("./cloudinary");
const { CLOUD_FOLDER } = require("../environment");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: CLOUD_FOLDER,
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
