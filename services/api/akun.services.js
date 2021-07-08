const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");
const jwt = require("jsonwebtoken");

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

const editUser = async (reqBody) => {
  const result = await db.query(
    `update akun set 
    username=?,
    email=?,
    nama=?,
    gander=?,
    telp=?,
    perusahaan=?,
    instansi=?,
    lavel=?,
    resetP=?,
    tgl_lahir=?,
    foto=?,
    ktp=?,
    verifikasi=?,
    foto_ktp=?`,
    [
      reqBody.username,
      reqBody.email,
      reqBody.nama,
      reqBody.gender,
      reqBody.telp,
      reqBody.perusahaan,
      reqBody.instansi,
      reqBody.level,
      reqBody.resetP,
      reqBody.tgl_lahir,
      reqBody.foto,
      reqBody.ktp,
      reqBody.verifikasi,
      reqBody.foto_ktp,
    ]
  );
  if (!result.affectedRows) {
    return {
      message: "Edit user error",
    };
  }
  return {
    message: "Edit user success",
  };
};

module.exports = {
  userData,
  editUser,
};
