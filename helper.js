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

const pad = (num) => {
  return (num > 9 ? "" : "0") + num;
};

const formatDate = (date) => {
  var date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  return year + "-" + pad(month) + "-" + pad(dt);
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports = {
  emptyOrRows,
  ecryptSHA256,
  encryptMD5,
  formatDate,
  generateOTP,
  pad,
};
