const typeorm = require("typeorm");
const config = require("../constants/config");
const { PostsEntity } = require("../models/entities/Posts.entity");
const { UserEntity } = require("../models/entities/User.entity");
const { loggerConsole } = require("./winston.utils");

const connection1 = typeorm.createConnection({
  type: "mariadb",
  name: "conn1",
  host: config.database.one.host,
  port: config.database.one.port,
  username: config.database.one.user,
  password: config.database.one.password,
  database: config.database.one.database,
  synchronize: false,
  entities: [PostsEntity, UserEntity],
});

class TypeOrmConnection {
  constructor() {
    connection1
      .then((conn) => {
        this.connection1 = conn;
      })
      .catch((err) => {
        loggerConsole.error("database connection error");
        loggerConsole.error(err);
        return;
      });
  }
}

const typeormconn = new TypeOrmConnection();

module.exports = typeormconn;
