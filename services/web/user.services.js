const mysqlconn = require("../../utilities/mysql.utils");

const getAllUsers = async () => {
  const rowsUsers = await mysqlconn.query("select * from users");
  return rowsUsers;
};

const userServices = {
  getAllUsers,
};

module.exports = userServices;
