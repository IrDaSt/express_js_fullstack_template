const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const akunServices = require("../../services/api/akun.services");
const middleware = require("../../services/middleware");
const upload = require("../../services/multer");

router.get("/", middleware.verifyToken, (req, res, next) => {
  return res.json(akunServices.userData(req));
});

router.put(
  "/user",
  upload.array(),
  middleware.verifyToken,
  async (req, res, next) => {
    return res.json(await akunServices.editUser(req.body));
  }
);

module.exports = router;
