const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const akun = require("../../services/api/akun.services");
const middleware = require("../../services/middleware");

router.get("/", middleware.verifyToken, async (req, res, next) => {
  return res.json(await akun.userData(req));
});

router.put("/user", middleware.verifyToken, async (req, res, next) => {
  return res.json(await akun.editUser(req.body));
});

module.exports = router;
