const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authServices = require("../../services/api/auth.services");
const upload = require("../../services/multer");
const helper = require("../../helper");

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
      return res.status(400).json(
        helper.responseCustom({
          status_message: "error",
          error: errors.array(),
        })
      );
    }

    const { email, password } = req.body;
    try {
      const result_check_email = await authServices.checkEmail(email);
      if (result_check_email.length === 0) {
        res.status(500).json(
          helper.responseCustom({
            status_code: 500,
            status_message: "error",
            error: {
              message: "login failed",
            },
          })
        );
        return;
      }

      const [encrypted_password, salt] = result_check_email[0].password.split(
        ":"
      );

      if (encrypted_password === helper.encryptWithSalt(password, salt)) {
        const token = helper.generateToken({
          id_user: result_login[0].id_user,
        });
        res.status(200).json(
          helper.responseCustom({
            data: {
              message: "login success",
              token,
            },
          })
        );
      } else {
        res.status(500).json(
          helper.responseCustom({
            status_code: 500,
            status_message: "error",
            error: {
              message: "login failed",
            },
          })
        );
      }
    } catch (error) {
      res.status(500).json(
        helper.responseCustom({
          status_message: "error",
          status_code: 500,
          error: error,
        })
      );
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
      return res.status(400).json(
        helper.responseCustom({
          status_message: "error",
          error: errors.array(),
        })
      );
    }

    const { email, password, name } = req.body;
    try {
      const result_check_email = await authServices.checkEmail(email);
      if (result_check_email.length > 0) {
        res.status(500).json(
          helper.responseCustom({
            status_code: 500,
            status_message: "error",
            error: {
              message: "email already used",
            },
          })
        );
        return;
      }
      const salt = helper.generateSalt();
      const result_register = await authServices.register({
        id_user: helper.generateUUIDV4(),
        email,
        hashed_password: `${helper.encryptWithSalt(password, salt)}:${salt}`,
        name,
      });
      if (!result_register.affectedRows) {
        res.status(500).json(
          helper.responseCustom({
            status_code: 500,
            status_message: "error",
            error: {
              message: "database error",
            },
          })
        );
        return;
      }
      const token = helper.generateToken({
        id_user: result_register.insertId,
      });
      res.status(200).json(
        helper.responseCustom({
          data: {
            message: "register success",
            token,
          },
        })
      );
    } catch (error) {
      res.status(500).json(
        helper.responseCustom({
          status_message: "error",
          status_code: 500,
          error: error,
        })
      );
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
