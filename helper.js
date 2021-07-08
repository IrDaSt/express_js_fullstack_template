const crypto = require("crypto");

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

const ecryptSHA256 = (text) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

const encryptMD5 = (text) => {
  return crypto.createHash("md5").update(text).digest("hex");
};

module.exports = {
  emptyOrRows,
  ecryptSHA256,
  encryptMD5,
};
