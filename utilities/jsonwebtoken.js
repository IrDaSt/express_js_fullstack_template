const jwt = require("jsonwebtoken");
const config = require("../constants/config");
const idGeneratorUtils = require("./id-generator");

const generateToken = (data) => {
  const token = jwt.sign(data, config.secret_token, { expiresIn: "24h" });
  const tokenize =
    token.substring(0, 40) +
    idGeneratorUtils.generateUUIDV4().slice(-15) +
    token.substring(40);
  return tokenize;
};

const jwtUtils = {
  generateToken,
};

module.exports = jwtUtils;
