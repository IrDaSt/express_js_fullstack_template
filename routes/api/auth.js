const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authServices = require("../../services/api/auth.services");
const upload = require("../../middlewares/multer");
const helper = require("../../helper");
const authMiddleware = require("../../middlewares/auth");
const responses = require("../../responses");

// This is an example on how to implement authentication
// This example uses mysql query to interact with database
// You can use another tools to interact with database eg. typeorm, mongoose, mysql2, and more.

// Get User Information
router.get("/info", authMiddleware.verifyToken, async (req, res, next) => {
  try {
    // Get Jwt Data
    // You can use either using helper.getDataFromJwt or from req.user
    // Example with using req.user
    const jwtData = req.user;
    // Example with using helper.getDataFromJwt
    // const jwtData = helper.getDataFromJwt(req);

    // Get user info with id_user from jwt data
    const result_user_info = await authServices.getByIdUser(jwtData.id_user);

    responses.Success(res, result_user_info[0]);
  } catch (error) {
    return responses.InternalServerError(res, error);
  }
});

router.post(
  "/login",
  upload.array(),
  body("email")
    .notEmpty()
    .withMessage("email field required")
    .isEmail()
    .withMessage("email field must be an email"),
  body("password").notEmpty().withMessage("password field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array());
    }

    const { email, password } = req.body;
    try {
      const result_check_email = await authServices.checkEmail(email);
      if (result_check_email.length === 0) {
        return responses.InternalServerError(res, {
          message: "login failed",
        });
      }

      const [encrypted_password, salt] =
        result_check_email[0].password.split(":");

      if (encrypted_password === helper.encryptWithSalt(password, salt)) {
        const token = helper.generateToken({
          id_user: result_login[0].id_user,
        });
        responses.Success(res, {
          message: "login success",
          token,
        });
      } else {
        return responses.InternalServerError(res, {
          message: "login failed",
        });
      }
    } catch (error) {
      return responses.InternalServerError(res, error);
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
      return responses.BadRequest(res, errors.array());
    }

    const { email, password, name } = req.body;
    try {
      const result_check_email = await authServices.checkEmail(email);
      if (result_check_email.length > 0) {
        return responses.InternalServerError(res, {
          message: "email already used",
        });
      }
      const salt = helper.generateSalt();
      const result_register = await authServices.register({
        id_user: helper.generateUUIDV4(),
        email,
        hashed_password: `${helper.encryptWithSalt(password, salt)}:${salt}`,
        name,
      });
      if (!result_register.affectedRows) {
        return responses.InternalServerError(res, {
          message: "database error",
        });
      }
      const token = helper.generateToken({
        id_user: result_register.insertId,
      });
      responses.Success(res, {
        message: "register success",
        token,
      });
    } catch (error) {
      return responses.InternalServerError(res, error);
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
      return responses.BadRequest(res, errors.array());
    }
    try {
      res.json(await auth.requestVerification(req));
    } catch (error) {
      return responses.InternalServerError(res, error);
    }
  }
);

module.exports = router;
