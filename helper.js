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

const formatDate = (date) => {
  var date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + dt;
};

module.exports = {
  emptyOrRows,
  ecryptSHA256,
  encryptMD5,
  formatDate,
};
