const typeorm = require("typeorm");
const config = require("../config");
const Posts = require("../entities/Posts.entity");

const connection1 = typeorm.createConnection({
  type: "mariadb",
  name: "conn1",
  host: config.database[1].host,
  port: config.database[1].port,
  username: config.database[1].user,
  password: config.database[1].password,
  database: config.database[1].database,
  synchronize: false,
  entities: [Posts],
});

class TypeOrmConnection {
  constructor() {
    connection1
      .then((conn) => {
        this.connection1 = conn;
      })
      .catch((err) => {
        console.log("database connection error");
        console.log(err);
        return;
      });
  }
}

module.exports = TypeOrmConnection;
