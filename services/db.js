const mysql = require("mysql2/promise");
const config = require("../constants/config");

// Traditional Query Database
const query = async (sql, params) => {
  const connection = await mysql.createConnection({
    ...config.db,
    connectTimeout: 10000,
    connectionLimit: 5,
  });
  const [results] = await connection.execute(sql, params);
  return results;
};

module.exports = {
  query,
};
