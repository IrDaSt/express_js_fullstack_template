const crypto = require("crypto")

const bufferEncryption = "utf8"
const encryptionType = "aes-256-cbc"
const encryptionEncoding = "base64"

const generateSalt = () => crypto.randomBytes(12).toString("hex")

const encryptWithSalt = (text, salt) =>
  crypto.createHmac("sha256", salt).update(text).digest("hex")

const ecryptSHA256 = (text) =>
  crypto.createHash("sha256").update(text).digest("hex")

const ecryptMD5 = (text) => crypto.createHash("md5").update(text).digest("hex")

const encryptWithSecretKey = (text, secret_key) => {
  const val = text
  const key = Buffer.from(secret_key, bufferEncryption)
  const iv = Buffer.from(
    secret_key.slice(0, secret_key.length / 2),
    bufferEncryption,
  )
  const cipher = crypto.createCipheriv(encryptionType, key, iv)
  let encrypted = cipher.update(val, bufferEncryption, encryptionEncoding)
  encrypted += cipher.final(encryptionEncoding)
  return encrypted
}

const decryptWithSecretKey = (text, secret_key) => {
  const buff = Buffer.from(text, encryptionEncoding)
  const key = Buffer.from(secret_key, bufferEncryption)
  const iv = Buffer.from(
    secret_key.slice(0, secret_key.length / 2),
    bufferEncryption,
  )
  const decipher = crypto.createDecipheriv(encryptionType, key, iv)
  const deciphered =
    decipher.update(buff).toString() + decipher.final().toString()
  return deciphered
}

const cryptoUtils = {
  generateSalt,
  encryptWithSalt,
  ecryptSHA256,
  ecryptMD5,
  encryptWithSecretKey,
  decryptWithSecretKey,
}

module.exports = cryptoUtils
