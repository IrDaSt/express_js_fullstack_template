const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const akun = require("../../services/api/akun.services");
const middleware = require("../../services/middleware");
const upload = require("../../services/multer");

router.get("/", middleware.verifyToken, async (req, res, next) => {
  return res.json(await akun.userData(req));
});

router.put(
  "/user",
  upload.array(),
  middleware.verifyToken,
  async (req, res, next) => {
    return res.json(await akun.editUser(req.body));
  }
);

module.exports = router;
