const multer = require("multer");
const path = require("path");
const fse = require("fs-extra");

// Handle file upload temporary location
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await fse.ensureDir("./public/data/uploads/temp");
    cb(null, "./public/data/uploads/temp");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
