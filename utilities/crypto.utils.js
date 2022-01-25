const crypto = require("crypto");

const generateSalt = () => crypto.randomBytes(12).toString("hex");

const encryptWithSalt = (text, salt) =>
  crypto.createHmac("sha256", salt).update(text).digest("hex");

const ecryptSHA256 = (text) =>
  crypto.createHash("sha256").update(text).digest("hex");

const ecryptMD5 = (text) => crypto.createHash("md5").update(text).digest("hex");

const cryptoUtils = {
  generateSalt,
  encryptWithSalt,
  ecryptSHA256,
  ecryptMD5,
};

module.exports = cryptoUtils;
