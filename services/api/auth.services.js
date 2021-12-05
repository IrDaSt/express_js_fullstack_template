const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");
const nodemailer = require("../nodemailer");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");

const login = async ({ email, hashed_password }) => {
  const rows = await db.query(
    "select * from user where email=? and password=?",
    [email, hashed_password]
  );
  return rows;
};

const register = async ({ id_user, email, hashed_password, name }) => {
  const resultInsert = await db.query(
    `insert into akun(id_user, email, password, name) values (?,?,?,?)`,
    [id_user, email, hashed_password, name]
  );
  return resultInsert;
};

const checkEmail = async (email) => {
  const checkEmail = await db.query(`select * from akun where email=?`, [
    email,
  ]);
  return checkEmail;
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

const requestVerification = async (req) => {
  const checkEmail = await db.query(`select * from akun where email=?`, [
    req.body.email,
  ]);
  if (!checkEmail.length) {
    return {
      message: "Email not found",
      status: 404,
    };
  }
  // Send email and Create otp
  const kode_verif = helper.generateOTP();
  const data = await ejs.renderFile(
    process.cwd() + "/views/emails/email_verifikasi.email.ejs",
    {
      nama: checkEmail[0].nama,
      kode_verif: kode_verif,
    }
  );

  const mainOptions = {
    from: `Email from ${config.mail.MAIL_FROM_NAME}`,
    to: checkEmail[0].email,
    subject: "Kode Verifikasi",
    html: data,
  };

  try {
    const resultSentEmail = await nodemailer.transporter.sendMail(mainOptions);
    console.log("Message sent: " + resultSentEmail.response);
    return {
      data: {
        verification_code: kode_verif,
      },
      status: 200,
      message: "Request verification success",
    };
  } catch (error) {
    next(error);
    return {
      status: 500,
      message: "Request verification error, server error, plase try again",
    };
  }
};

module.exports = {
  login,
  register,
  checkEmail,
  userData,
  requestVerification,
};
