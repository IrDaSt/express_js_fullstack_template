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

const formatDateISOReverseSlash = (_date) => {
  var date = new Date(_date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  return pad(dt) + "/" + pad(month) + "/" + year;
};

const getDateDiff = (_date1, _date2) => {
  const date1 = new Date(_date2);
  const date2 = new Date(_date1);
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days;
};

const formatTimeISO12HR = (_date) => {
  const time = new Date(_date).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: true,
  });
  return time;
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateUUID = () => {
  return uuid.v4() + Date.now();
};

const generateToken = (data) => {
  return jwt.sign({ data }, tokenSecret, { expiresIn: "24h" });
};

const getDataFromJwt = (token) => {
  // console.log(token);
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
  formatDateISOReverseSlash,
  getDateDiff,
  formatTimeISO12HR,
  generateOTP,
  generateUUID,
  pad,
  generateToken,
  getDataFromJwt,
};
