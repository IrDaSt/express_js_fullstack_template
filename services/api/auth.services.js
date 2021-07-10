const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");
const nodemailer = require("../nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ejs = require("ejs");
const secretToken = config.secret_token;

const login = async (req) => {
  const password = helper.encryptMD5(req.body.password);
  const rows = await db.query(
    "select * from akun where email=? and password=?",
    [req.body.email, password]
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

const register = async (req) => {
  const checkEmail = await db.query(`select * from akun where email=?`, [
    req.body.email,
  ]);
  if (checkEmail.length) {
    return {
      message: "Email already taken",
    };
  }
  const password = helper.ecryptSHA256(req.body.password);
  const resultInsert = await db.query(
    `insert into akun(username, email, password, name, gender) values (?,?,?,?,?)`,
    [req.body.email, req.body.email, password, req.body.name, req.body.gender]
  );
  if (!resultInsert.affectedRows) {
    return {
      message: "Register failed",
    };
  }
  const rows = await db.query(
    "select * from akun where email=? and password=?",
    [req.body.email, password]
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

const generateToken = (user) => {
  return jwt.sign({ data: user }, secretToken, { expiresIn: "24h" });
};

module.exports = {
  login,
  register,
  userData,
  requestVerification,
};
