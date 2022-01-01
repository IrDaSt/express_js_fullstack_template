const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const akunServices = require("../../services/api/akun.services");
const authMiddleware = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

router.get("/", authMiddleware.verifyToken, (req, res, next) => {
  return res.json(akunServices.userData(req));
});

router.put(
  "/user",
  upload.array(),
  authMiddleware.verifyToken,
  async (req, res, next) => {
    return res.json(await akunServices.editUser(req.body));
  }
);

module.exports = router;
