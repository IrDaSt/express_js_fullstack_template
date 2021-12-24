const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");
const jwt = require("jsonwebtoken");

const userData = (req) => {
  var data = helper.getDataFromJwt(req);
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

const akunServices = {
  userData,
  editUser,
};

module.exports = akunServices;
