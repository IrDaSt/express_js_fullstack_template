const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const config = require("./config");
const tokenSecret = config.secret_token;

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

const generateUUID = () => {
  return uuid.v4() + Date.now();
};

const getDataFromJwt = (token) => {
  console.log(token);
  var data = null;
  jwt.verify(token, tokenSecret, (err, value) => {
    data = value.data;
  });
  return data;
};

module.exports = {
  emptyOrRows,
  ecryptSHA256,
  encryptMD5,
  formatDate,
  generateOTP,
  generateUUID,
  pad,
  getDataFromJwt,
};
