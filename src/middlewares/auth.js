const jwt = require("jsonwebtoken")
const config = require("../constants/config")
const cryptoUtils = require("../utilities/crypto.utils")
const responses = require("../utilities/responses.utils")

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization)
    responses.Unauthorized(res, {
      message: "Please provide a bearer token authorization",
    })
  else {
    const token = authorization.split(" ")[1]
    const decrypt_token = cryptoUtils.decryptWithSecretKey(
      token,
      config.secret_token,
    )
    jwt.verify(decrypt_token, config.secret_token, (err, value) => {
      if (err)
        return responses.InternalServerError(res, {
          message: "Failed to authenticate token",
          err,
        })
      req.user = value
      next()
    })
  }
}

const authMiddleware = {
  verifyToken,
}

module.exports = authMiddleware
