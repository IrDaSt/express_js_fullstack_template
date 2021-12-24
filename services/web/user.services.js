const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");

const getAllUsers = async () => {
  const rowsUsers = await db.query("select * from users");
  return rowsUsers;
};

const userServices = {
  getAllUsers,
};

module.exports = userServices;
