const jwt = require("jsonwebtoken")
const config = require("../constants/config")
const cryptoUtils = require("./crypto.utils")
const idGeneratorUtils = require("./id-generator.utils")

const generateToken = (data) => {
  const token = jwt.sign(data, config.secret_token, { expiresIn: "24h" })
  const encrypt_token = cryptoUtils.encryptWithSecretKey(
    token,
    config.secret_token,
  )
  return encrypt_token
}

const jwtUtils = {
  generateToken,
}

module.exports = jwtUtils
