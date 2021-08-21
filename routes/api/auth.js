const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../services/api/auth.services");
const upload = require("../../services/multer");

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("email field required")
    .isEmail()
    .withMessage("email field must be and email"),
  body("password").notEmpty().withMessage("password field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      res.json(await auth.login(req));
    } catch (error) {
      console.error(`Error logging in `, error.message);
      next(error);
    }
  }
);

router.post(
  "/register",
  upload.array(),
  body("email")
    .notEmpty()
    .withMessage("email field required")
    .isEmail()
    .withMessage("email field must be and email"),
  body("password").notEmpty().withMessage("password field required"),
  body("name").notEmpty().withMessage("name field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      res.json(await auth.register(req));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/request_email_verification",
  upload.array(),
  body("email")
    .notEmpty()
    .withMessage("Email field required")
    .isEmail()
    .withMessage("Email field must be an email"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      res.json(await auth.requestVerification(req));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
