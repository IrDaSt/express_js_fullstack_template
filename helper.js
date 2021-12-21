const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const fse = require("fs-extra");
const config = require("./config");
const tokenSecret = config.secret_token;

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

const generateSalt = () => crypto.randomBytes(12).toString("hex");

const encryptWithSalt = (text, salt) =>
  crypto.createHmac("sha256", salt).update(text).digest("hex");

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

const generateUUIDV4 = () => uuid.v4();

const generateToken = (data) => {
  const token = jwt.sign(data, tokenSecret, { expiresIn: "24h" });
  let tokenize =
    token.substring(0, 40) + generateUUIDV4().slice(-15) + token.substring(40);
  return tokenize;
};

const getDataFromJwt = (req) => {
  const bearerString = req.headers.authorization;
  const token = bearerString.split(" ")[1];
  var data = null;
  jwt.verify(
    token.substring(0, 40) + token.substring(40 + 15),
    config.secret_token,
    (err, value) => {
      data = value;
    }
  );
  return data;
};

const responseCustom = ({
  status_code = 200,
  status_message = "success",
  data = null,
  error = null,
}) => {
  const response = new Object();
  response.status_code = status_code;
  response.status_message = status_message;
  if (data) response.data = data;
  if (error) response.error = error;
  return response;
};

const deleteAllTempUpload = () => {
  // Delete all temp uploaded file
  fse.emptyDirSync("./public/data/uploads/temp");
};

const helper = {
  emptyOrRows,
  generateSalt,
  encryptWithSalt,
  ecryptSHA256,
  encryptMD5,
  formatDate,
  formatDateISOReverseSlash,
  getDateDiff,
  formatTimeISO12HR,
  generateOTP,
  generateUUIDV4,
  pad,
  generateToken,
  getDataFromJwt,
  responseCustom,
  deleteAllTempUpload,
};

module.exports = helper;
