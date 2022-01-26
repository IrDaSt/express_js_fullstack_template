const config = require("../../constants/config");
const nodemailerUtils = require("../../utilities/nodemailer.utils");
const ejs = require("ejs");
const otpGeneratorUtils = require("../../utilities/otp-generator.utils");
const mysqlconn = require("../../utilities/mysql.utils");

const getByIdUser = async (id_user) => {
  const rows = await mysqlconn.query(`select * from user where id_user=?`, [
    id_user,
  ]);
  return rows;
};

const login = async ({ email, hashed_password }) => {
  const rows = await mysqlconn.query(
    "select * from user where email=? and password=?",
    [email, hashed_password]
  );
  return rows;
};

const register = async ({ id_user, email, hashed_password, name }) => {
  const resultInsert = await mysqlconn.query(
    `insert into akun(id_user, email, password, name) values (?,?,?,?)`,
    [id_user, email, hashed_password, name]
  );
  return resultInsert;
};

const checkEmail = async (email) => {
  const checkEmail = await mysqlconn.query(`select * from akun where email=?`, [
    email,
  ]);
  return checkEmail;
};

const requestVerification = async (req) => {
  const checkEmail = await mysqlconn.query(`select * from akun where email=?`, [
    req.body.email,
  ]);
  if (!checkEmail.length) {
    return {
      message: "Email not found",
      status: 404,
    };
  }
  // Send email and Create otp
  const kode_verif = otpGeneratorUtils.generateOTP();
  const data = await ejs.renderFile(
    "./views/emails/email_verifikasi.email.ejs",
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
    const resultSentEmail = await nodemailerUtils.transporter.sendMail(
      mainOptions
    );
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

const userServicesApi = {
  getByIdUser,
  login,
  register,
  checkEmail,
  requestVerification,
};

module.exports = userServicesApi;
