const mysql = require("mysql2/promise");
const config = require("../constants/config");

const query = async (sql, values) => {
  const conn = await mysql.createConnection({
    ...config.database.one,
    connectTimeout: 10000,
    connectionLimit: 5,
  });
  const [result] = await conn.query(sql, values);
  return result;
};

const mysqlconn = {
  query,
};

module.exports = mysqlconn;
