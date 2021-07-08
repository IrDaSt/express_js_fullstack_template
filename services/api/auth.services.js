const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretToken = config.secret_token;

const login = async (request) => {
  const password = helper.encryptMD5(request.password);
  const rows = await db.query(
    "select * from akun where email=? and password=?",
    [request.email, password]
  );
  if (rows) {
    const token = generateToken(rows);
    return {
      message: "Login success",
      token,
    };
  }
  return {
    message: "Login failed",
  };
};

const register = async (request) => {
  const checkEmail = await db.query(`select * from akun where email=?`, [
    request.email,
  ]);
  if (checkEmail.length) {
    return {
      message: "Email already taken",
    };
  }
  const password = helper.ecryptSHA256(request.password);
  const resultInsert = await db.query(
    `insert into akun(username, email, password, name, gender) values (?,?,?,?,?)`,
    [request.email, request.email, password, request.name, request.gender]
  );
  if (!resultInsert.affectedRows) {
    return {
      message: "Register failed",
    };
  }
  const rows = await db.query(
    "select * from akun where email=? and password=?",
    [request.email, password]
  );
  const token = generateToken(rows);
  return {
    message: "Register success",
    token,
  };
};

const userData = (req) => {
  const bearerString = req.headers.authorization;
  const token = bearerString.split(" ")[1];
  var data = null;
  jwt.verify(token, config.secret_token, (err, value) => {
    console.log(data);
    data = value.data[0];
  });
  data = {
    username: data.username,
    email: data.email,
    nama: data.nama,
    gender: data.gander,
    telp: data.telp,
    perusahaan: data.perusahaan,
    instansi: data.instansi,
    level: data.lavel,
    resetP: data.resetP,
    tgl_lahir: data.tgl_lahir,
    foto: data.foto,
    ktp: data.ktp,
    verifikasi: data.verifikasi,
    foto_ktp: data.foto_ktp,
  };
  return {
    data,
  };
};

const generateToken = (user) => {
  return jwt.sign({ data: user }, secretToken, { expiresIn: "24h" });
};

module.exports = {
  login,
  register,
  userData,
};
