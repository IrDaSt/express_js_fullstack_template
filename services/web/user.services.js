const db = require("../db");
const helper = require("../../helper");
const config = require("../../config");

const getAllUsers = async () => {
  const rowsUsers = await db.query("select * from users");
  return rowsUsers;
};

module.exports = { getAllUsers };
