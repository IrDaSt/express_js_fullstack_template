const mysql = require("mysql2/promise");
const config = require("../constants/config");

class MysqlConnection {
  constructor() {
    this.initConnection();
  }

  async initConnection() {
    const conn = await mysql.createConnection({
      ...config.database.one,
    });
    this.conn = conn;
  }

  async query(sql, values) {
    try {
      await this.conn?.connect();
    } catch (error) {
      if (error.code === "ECONNRESET") {
        await this.initConnection();
      }
    }

    if (this.conn) {
      const [result] = await this.conn.query(sql, values);
      return result;
    } else {
      return this.conn;
    }
  }
}

const mysqlconn = new MysqlConnection();

module.exports = mysqlconn;
