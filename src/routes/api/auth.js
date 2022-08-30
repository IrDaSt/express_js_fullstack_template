const express = require("express")
const { body, validationResult } = require("express-validator")
const userServicesApi = require("../../services/api/user.services")
const upload = require("../../middlewares/multer")
const authMiddleware = require("../../middlewares/auth")
const cryptoUtils = require("../../utilities/crypto.utils")
const jwtUtils = require("../../utilities/jsonwebtoken.utils")
const responses = require("../../utilities/responses.utils")
const idGeneratorUtils = require("../../utilities/id-generator.utils")

const authRouterApi = express.Router()

// This is an example on how to implement authentication
// This example uses mysql query to interact with database
// You can use another tools to interact with database eg. typeorm, mongoose, mysql2, and more.

// Get User Information
authRouterApi.get(
  "/info",
  authMiddleware.verifyToken,
  async (req, res, next) => {
    try {
      // Get Jwt Data
      const jwtData = req.user

      // Get user info with id_user from jwt data
      const result_user_info = await userServicesApi.getByIdUser(
        jwtData.id_user,
      )

      responses.Success(res, result_user_info[0])
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

authRouterApi.post(
  "/login",
  upload.fields([]),
  body("email")
    .notEmpty()
    .withMessage("email field required")
    .isEmail()
    .withMessage("email field must be an email"),
  body("password").notEmpty().withMessage("password field required"),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { email, password } = req.body
    try {
      const result_check_email = await userServicesApi.checkEmail(email)
      if (result_check_email.length === 0) {
        return responses.InternalServerError(res, {
          message: "login failed",
        })
      }

      const [encrypted_password, salt] =
        result_check_email[0].password.split(":")

      if (encrypted_password === cryptoUtils.encryptWithSalt(password, salt)) {
        const token = jwtUtils.generateToken({
          id_user: result_login[0].id_user,
        })
        responses.Success(res, {
          message: "login success",
          token,
        })
      } else {
        return responses.InternalServerError(res, {
          message: "login failed",
        })
      }
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

authRouterApi.post(
  "/register",
  upload.fields([]),
  body("email")
    .notEmpty()
    .withMessage("email field required")
    .isEmail()
    .withMessage("email field must be and email"),
  body("password").notEmpty().withMessage("password field required"),
  body("name").notEmpty().withMessage("name field required"),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { email, password, name } = req.body
    try {
      const result_check_email = await userServicesApi.checkEmail(email)
      if (result_check_email.length > 0) {
        return responses.InternalServerError(res, {
          message: "email already used",
        })
      }
      const salt = cryptoUtils.generateSalt()
      const result_register = await userServicesApi.register({
        id_user: idGeneratorUtils.generateUUIDV4(),
        email,
        hashed_password: `${cryptoUtils.encryptWithSalt(
          password,
          salt,
        )}:${salt}`,
        name,
      })
      if (!result_register.affectedRows) {
        return responses.InternalServerError(res, {
          message: "database error",
        })
      }
      const token = jwtUtils.generateToken({
        id_user: result_register.insertId,
      })
      return responses.Success(res, {
        message: "register success",
        token,
      })
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

authRouterApi.post(
  "/request_email_verification",
  upload.array(),
  body("email")
    .notEmpty()
    .withMessage("Email field required")
    .isEmail()
    .withMessage("Email field must be an email"),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }
    try {
      res.json(await auth.requestVerification(req))
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

authRouterApi.delete(
  "/delete",
  authMiddleware.verifyToken,
  async (req, res) => {
    const jwtData = req.user
    try {
      if (!jwtData) return
      await userServicesApi.remove({
        id_user: jwtData.id_user,
      })
      return responses.Success(res, {
        message: "Delete success",
      })
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

module.exports = authRouterApi
